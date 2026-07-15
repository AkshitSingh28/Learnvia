/**
 * Portal flags. Mentors/NGOs flag a portal that looks unsafe; admins resolve them in moderation.
 * A separate collection (rather than writing the admin-only `portals` doc) so staff can create.
 */
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface PortalFlag {
  id: string;
  portalId: string;
  portalName: string;
  byUid: string;
  byName: string;
  reason?: string;
  resolved: boolean;
  createdAt?: unknown;
}

export async function createFlag(data: Omit<PortalFlag, "id" | "resolved" | "createdAt">): Promise<void> {
  await addDoc(collection(db, "flags"), { ...data, resolved: false, createdAt: new Date().toISOString() });
}

export async function listFlags(): Promise<PortalFlag[]> {
  const snap = await getDocs(query(collection(db, "flags"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PortalFlag, "id">) }));
}

export async function resolveFlag(id: string): Promise<void> {
  await updateDoc(doc(db, "flags", id), { resolved: true });
}
