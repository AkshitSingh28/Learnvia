import type { NextConfig } from "next";

/**
 * Aarohan web — Next.js config.
 *
 * Backend AND hosting both live on the single Firebase project `aarohan-2701b`.
 * We ship a fully static export (`output: "export"`) → the `out/` folder is served
 * by Firebase Hosting, while Auth/Firestore/Storage are called from the browser
 * via the Firebase client SDK. No Node server is involved.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Static export can't use the default (server) image optimizer.
  images: { unoptimized: true },
  // Emit `/route/index.html` so Firebase Hosting serves clean URLs reliably.
  trailingSlash: true,
};

export default nextConfig;
