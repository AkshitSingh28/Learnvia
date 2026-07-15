/**
 * Content repository — the shared, same-for-everyone catalog (modules, tracks, portals,
 * projects, badge definitions) stored in Firestore. Read by every student; written only by
 * the admin CMS / the one-time seeder. Per-user state (progress, portfolio, applications)
 * lives separately in `studentData.ts`.
 */
import { collection, doc, getDocs, setDoc, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  modules as seedModules,
  tracks as seedTracks,
  portals as seedPortals,
  projects as seedProjects,
  badges as seedBadges,
} from "@/lib/seed/data";
import type { Module, Track, Portal, Project, Badge } from "@/lib/types";

export interface ContentBundle {
  modules: Module[];
  tracks: Track[];
  portals: Portal[];
  projects: Project[];
  badges: Badge[];
}

async function readCollection<T>(name: string): Promise<T[]> {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map((d) => d.data() as T);
}

/**
 * Load all content. Any collection that is still empty in Firestore falls back to the
 * bundled seed, so the app renders fully even before an admin runs the seeder.
 */
export async function loadContent(): Promise<{ content: ContentBundle; seeded: boolean }> {
  const [modules, tracks, portals, projects, badges] = await Promise.all([
    readCollection<Module>("modules"),
    readCollection<Track>("tracks"),
    readCollection<Portal>("portals"),
    readCollection<Project>("projects"),
    readCollection<Badge>("badges"),
  ]);

  const seeded = modules.length > 0;

  return {
    seeded,
    content: {
      modules: modules.length ? modules.sort((a, b) => a.order - b.order) : seedModules,
      tracks: tracks.length ? tracks : seedTracks,
      portals: portals.length ? portals : seedPortals,
      projects: projects.length ? projects : seedProjects,
      badges: badges.length ? badges : seedBadges,
    },
  };
}

/** Write the bundled seed content into Firestore. Idempotent (uses deterministic ids). */
export async function seedContent(): Promise<void> {
  const batch = writeBatch(db);
  seedModules.forEach((m) => batch.set(doc(db, "modules", m.id), m));
  seedTracks.forEach((t) => batch.set(doc(db, "tracks", t.id), t));
  seedPortals.forEach((p) => batch.set(doc(db, "portals", p.id), p));
  seedProjects.forEach((p) => batch.set(doc(db, "projects", p.id), p));
  seedBadges.forEach((b) => batch.set(doc(db, "badges", b.id), b));
  await batch.commit();
}

/** Upsert a single content document (used by the admin CMS). */
export async function saveContentDoc<T extends { id: string }>(
  collectionName: "modules" | "tracks" | "portals" | "projects" | "badges",
  data: T,
): Promise<void> {
  await setDoc(doc(db, collectionName, data.id), data);
}
