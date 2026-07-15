import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { ContentProvider } from "@/lib/data/DataProvider";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { poppins } from "@/lib/brand";

export const metadata: Metadata = {
  // Brand is "Learnvia" (renamed from Aarohan). NOTE: the Firebase project id
  // stays `aarohan-2701b` (project ids are immutable) — that's backend-only.
  title: "Learnvia — AI Upskilling & Learn-to-Earn for Students",
  description:
    "Learnvia is a beginner-friendly AI upskilling and learn-to-earn platform that helps students learn, build a verified portfolio, and reach real opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <AuthProvider>
            <ContentProvider>{children}</ContentProvider>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
