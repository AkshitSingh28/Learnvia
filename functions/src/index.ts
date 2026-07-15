/**
 * Provaris Cloud Functions (project aarohan-2701b).
 *
 * Responsibilities — the things the static client genuinely can't / shouldn't do:
 *  - mirror the editable `users/{uid}.role` into a secure custom claim (rules trust the claim);
 *  - redeem invite codes atomically (assign cohort + role, bump counters);
 *  - maintain the `stats/summary` platform counters via increments;
 *  - fan out a notification to the student when their submission is reviewed.
 */
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { onCall, HttpsError } from "firebase-functions/v2/https";

initializeApp();
const db = getFirestore();
const STATS = db.doc("stats/summary");

/** users/{uid}: keep the role custom claim in sync + maintain the student counter. */
export const onUserWrite = onDocumentWritten("users/{uid}", async (event) => {
  const before = event.data?.before.data();
  const after = event.data?.after.data();
  const uid = event.params.uid;

  const beforeRole = before?.role as string | undefined;
  const afterRole = after?.role as string | undefined;

  if (after && afterRole && afterRole !== beforeRole) {
    await getAuth().setCustomUserClaims(uid, { role: afterRole });
  }

  const wasStudent = beforeRole === "student";
  const isStudent = afterRole === "student";
  if (isStudent && !wasStudent) await STATS.set({ totalStudents: FieldValue.increment(1) }, { merge: true });
  if (!isStudent && wasStudent) await STATS.set({ totalStudents: FieldValue.increment(-1) }, { merge: true });
});

/** submissions/{id}: maintain counters and notify the student when reviewed. */
export const onSubmissionWrite = onDocumentWritten("submissions/{id}", async (event) => {
  const before = event.data?.before.data();
  const after = event.data?.after.data();

  // Created
  if (!before && after) {
    await STATS.set(
      {
        totalSubmissions: FieldValue.increment(1),
        pendingReviews: FieldValue.increment(after.status === "Pending" ? 1 : 0),
      },
      { merge: true },
    );
    return;
  }

  // Deleted
  if (before && !after) {
    await STATS.set(
      {
        totalSubmissions: FieldValue.increment(-1),
        pendingReviews: FieldValue.increment(before.status === "Pending" ? -1 : 0),
      },
      { merge: true },
    );
    return;
  }

  // Updated
  if (before && after && before.status !== after.status) {
    const delta = (after.status === "Pending" ? 1 : 0) - (before.status === "Pending" ? 1 : 0);
    if (delta !== 0) await STATS.set({ pendingReviews: FieldValue.increment(delta) }, { merge: true });

    if (before.status === "Pending" && after.status !== "Pending") {
      await db.collection("notifications").add({
        userId: after.studentId,
        title: after.status === "Approved" ? "Submission approved 🎉" : "Submission needs work",
        body: `Your "${after.refTitle}" was reviewed.${after.feedback ? ` Feedback: ${after.feedback}` : ""}`,
        href: "/app/submissions",
        read: false,
        createdAt: FieldValue.serverTimestamp(),
      });
    }
  }
});

/** Callable: redeem an invite code → assign the caller a cohort + role, atomically. */
export const redeemInvite = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) throw new HttpsError("unauthenticated", "Please sign in first.");

  const code = String(request.data?.code ?? "").trim().toUpperCase();
  if (!code) throw new HttpsError("invalid-argument", "Provide an invite code.");

  const inviteRef = db.doc(`invites/${code}`);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(inviteRef);
    if (!snap.exists) throw new HttpsError("not-found", "That invite code doesn't exist.");
    const invite = snap.data()!;
    if (invite.active === false) throw new HttpsError("failed-precondition", "This invite is no longer active.");

    const cohortId: string | undefined = invite.cohortId;
    const role: string = invite.role ?? "student";

    tx.set(db.doc(`users/${uid}`), { cohortId: cohortId ?? null, role }, { merge: true });
    tx.set(inviteRef, { uses: FieldValue.increment(1) }, { merge: true });
    if (cohortId) tx.set(db.doc(`cohorts/${cohortId}`), { students: FieldValue.increment(1) }, { merge: true });

    return { cohortId: cohortId ?? null, role };
  });
});
