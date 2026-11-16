# AGILE-PMIS — Zamfara State

Standalone programme management information system for AGILE programme administration in Zamfara State.

## Current scaffold

- Next.js web application foundation
- API health endpoint: `/api/health`
- PostgreSQL / Neon Prisma schema
- Seed script for the 14 Zamfara LGAs
- Initial dashboard interface
- Netlify build configuration
- Mobile application implementation notes

This is a development scaffold, not a production-ready system. Authentication, authorization, validation, audit enforcement, privacy controls, backups, safeguarding workflows and formal acceptance testing must be implemented before real programme or beneficiary data is entered.

## Requirements

- Node.js 22 LTS
- npm
- Neon PostgreSQL account
- GitHub account
- Netlify account

## 1. Install dependencies

```bash
npm install
```

## 2. Configure Neon

Create a Neon project and copy:
- Pooled connection string into `DATABASE_URL`
- Direct connection string into `DIRECT_URL`

Copy `.env.example` to `.env` and replace the placeholders. Never commit `.env`.

## 3. Generate Prisma client and create database tables

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

## 4. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

Check API health at `http://localhost:3000/api/health`.

## 5. Push to GitHub

Create a new private repository named `agile-pmis-zamfara`. Upload the project files, excluding `.env` and `node_modules`.

## 6. Deploy to Netlify

Import the GitHub repository in Netlify. Netlify should detect Next.js.

Build command: `npm run build`

Add `DATABASE_URL`, `DIRECT_URL` and `AUTH_SECRET` in Netlify environment variables. Keep secrets server-side; do not prefix them with `NEXT_PUBLIC_`.

Deploy, then check `/api/health`.

## Database connection note

Use Neon pooled connection string for application runtime and direct connection string for schema migrations. Review current Neon and Prisma guidance before production migration.

## Next milestones

1. Authentication, roles and permission matrix.
2. Geography, school and beneficiary registers.
3. Programme workplans, projects and financial records.
4. Monitoring, field evidence and reporting.
5. GRM and restricted safeguarding workflows.
6. Expo mobile app and offline synchronization.
7. Security review, testing, backups and operational acceptance.
