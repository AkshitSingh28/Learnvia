"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile, createUserProfile, updateUserProfile as updateUserDoc } from "@/lib/db/users";
import type { Role, UserProfile } from "@/lib/types";

export function homeForRole(role: Role): string {
  if (role === "admin") return "/admin";
  if (role === "mentor" || role === "ngo") return "/staff";
  if (role === "trainer") return "/trainers";
  return "/app";
}

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<UserProfile>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<UserProfile>;
  signInWithGoogle: () => Promise<{ profile: UserProfile; isNewUser: boolean }>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  /** Re-read the user's Firestore profile and refresh the ID token (e.g. after a role/cohort change). */
  reloadProfile: () => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const googleProvider = new GoogleAuthProvider();
// Always let the user pick which Google account (avoids silent re-use of a stale session).
googleProvider.setCustomParameters({ prompt: "select_account" });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signInWithEmail(email: string, password: string): Promise<UserProfile> {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const profile = await getUserProfile(cred.user.uid);
    if (!profile) throw new Error("Account not found. Please sign up.");
    setUser(profile);
    return profile;
  }

  async function signUpWithEmail(email: string, password: string, displayName: string): Promise<UserProfile> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    const profile: UserProfile = {
      uid: cred.user.uid,
      role: "student",
      displayName,
      email,
      createdAt: new Date().toISOString(),
    };
    await createUserProfile(profile);
    setUser(profile);
    return profile;
  }

  async function signInWithGoogle(): Promise<{ profile: UserProfile; isNewUser: boolean }> {
    const cred = await signInWithPopup(auth, googleProvider);
    const existing = await getUserProfile(cred.user.uid);
    if (existing) {
      setUser(existing);
      return { profile: existing, isNewUser: false };
    }
    const profile: UserProfile = {
      uid: cred.user.uid,
      role: "student",
      displayName: cred.user.displayName ?? "User",
      email: cred.user.email ?? "",
      photoURL: cred.user.photoURL ?? undefined,
      createdAt: new Date().toISOString(),
    };
    await createUserProfile(profile);
    setUser(profile);
    return { profile, isNewUser: true };
  }

  async function sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  async function updateUserProfile(data: Partial<UserProfile>): Promise<void> {
    if (!user) return;
    await updateUserDoc(user.uid, data);
    setUser({ ...user, ...data });
  }

  async function reloadProfile(): Promise<UserProfile | null> {
    const current = auth.currentUser;
    if (!current) return null;
    await current.getIdToken(true); // pick up any new custom claims
    const profile = await getUserProfile(current.uid);
    setUser(profile);
    return profile;
  }

  async function signOut(): Promise<void> {
    await firebaseSignOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, sendPasswordReset, updateUserProfile, reloadProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
