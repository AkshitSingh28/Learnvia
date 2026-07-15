# Learnvia

**A student-first AI-upskilling platform** — practical, guided AI courses for students, plus an AI-assisted toolkit for trainers. _(Formerly Aarohan / Growvia.)_

Built on **Next.js** and **Firebase**, with **Google Gemini** powering the in-app AI features.

---

## Overview

Learnvia serves two audiences from one platform:

- **Students** — structured, hands-on AI courses (prompt writing, AI tools, content creation, safe & responsible AI) delivered through a guided learning dashboard.
- **Trainers** — AI-assisted teaching tools (lesson architect, concept crusher, assessment engine) delivered as copy-paste prompt workflows.

Gemini powers the AI assistance, with usage limits and Firebase App Check protecting the backend from abuse.

## Features

- Student learning dashboard — courses, cohorts and progress tracking
- Trainer portal with AI teaching tools
- Gemini-powered AI assistance (rate-limited, App Check enforced)
- Role-based access (students / trainers / staff), invites and notifications
- Localisation (i18n) support

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- **Firebase** — Auth, Firestore, Storage, Hosting, Cloud Functions
- **Google Gemini** — via Vertex AI / Firebase AI Logic

## Project structure

```
src/app/     # App Router routes (students, trainers, dashboard)
src/lib/     # Firebase, data layer (db/), AI (ai/), auth, i18n, seed data
functions/   # Firebase Cloud Functions
public/      # Static assets
scripts/     # Dev & seed utilities
```

## Status

Full site and dashboard built and deployed on Firebase.

> **Note** — This is a public showcase repository. Credentials, Firebase wiring and the AI integration module are intentionally omitted, so the project is **not intended to be built or run as-is** from this repo.

## Author

Built by **Akshit Singh**.
