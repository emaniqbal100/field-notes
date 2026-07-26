# Field Notes — Full CRUD Blog (Next.js + Prisma + PostgreSQL)

A blog with posts and comments. Ledger-style UI built with Tailwind CSS.

## Features

- Create, read, update, delete posts
- Comments on each post
- Server Components for data fetching (no unnecessary client fetches on read)
- Client Components only where interactivity is needed (forms, delete confirm)

## Ye poora, ready-to-run Next.js project hai

Koi alag se `create-next-app` chalane ki zaroorat nahi — sab kuch (package.json,
configs, app code) is folder mein already maujood hai.

## Setup Steps

1. **Is folder mein terminal open karein** aur dependencies install karein:
   ```bash
   npm install
   ```
   (Ye Next.js, React, Prisma, Tailwind — sab install kar dega. `postinstall`
   script khud `prisma generate` bhi chala dega.)

2. **`.env.example` ko copy karke `.env` banayein:**
   ```bash
   cp .env.example .env
   ```
   Phir `.env` mein apna real PostgreSQL connection string dalein:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DBNAME?schema=public"
   ```

3. **Migration chalayein** (Post + Comment tables PostgreSQL mein banega):
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Dev server chalayein:**
   ```bash
   npm run dev
   ```

5. Browser mein `http://localhost:3000` kholein.

## Routes

| Route                    | Kaam                              |
|---------------------------|------------------------------------|
| `/`                        | Saare posts ki list (ledger view) |
| `/posts/new`               | Naya post likhna                  |
| `/posts/[id]`              | Post detail + comments            |
| `/posts/[id]/edit`         | Post edit karna                   |
| `POST /api/posts`          | Post create                       |
| `GET /api/posts`           | Saare posts fetch                 |
| `GET /api/posts/[id]`      | Ek post fetch                     |
| `PATCH /api/posts/[id]`    | Post update                       |
| `DELETE /api/posts/[id]`   | Post delete (comments bhi cascade se) |
| `POST /api/posts/[id]/comments` | Comment add                  |

## Design notes

- Fonts: Fraunces (headings), Inter (body), IBM Plex Mono (timestamps/labels) —
  loaded via `next/font/google`, no extra setup needed.
- Colors are defined in `tailwind.config.js` under `paper`, `ink`, `teal`,
  `mustard`, `line`, `muted` — change these to re-theme the whole app.
- Entry numbering on the homepage is intentional (posts are literally a
  timeline), not decorative.

## Aage badhane ke liye ideas

- Pagination jab posts zyada ho jayen
- Authentication (NextAuth) taake sirf login users post/comment kar sakein
- Image upload for posts
- Search/filter by title
