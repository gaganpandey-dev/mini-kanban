# Mini Kanban Board

SvelteKit + TypeScript + PostgreSQL + Docker. Full CRUD Kanban with drag & drop.

## Features
- 3 columns: Todo, Doing, Done
- Create/Edit/Delete cards
- Drag cards between columns
- TypeScript end-to-end
- Dockerized Postgres

## Quick Start
```bash
git clone <repo> mini-kanban
cd mini-kanban
cp .env.example .env

# Option 1: Docker (Recommended)
docker compose up -d

# Option 2: Local
npm install
npx prisma migrate dev --name init
npm run dev
