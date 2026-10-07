# Kalvio Desk, step 1 (foundation and reception) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A clinic can log in (doctor or receptionist), run its day from the Today list (walk-ins, tokens, statuses, website requests, reminders, review requests), look up patients, and manage its receptionist logins; website booking forms feed Desk; a demo clinic and nightly backups exist.

**Architecture:** New repo `karthikkushi/kalvio-desk` (local `~/Desktop/kalvio-desk`): a Vite + React PWA on Cloudflare Pages talking directly to a new Supabase project through supabase-js. All rules (clinic isolation, roles, tokens, phone matching, the public booking function) live in Postgres (RLS + SQL functions) and are tested with pgTAP against a local Supabase. One Edge Function manages staff logins (needs the service role). Kalvio-build's Booking section posts to Desk's public `desk_book` function.

**Tech Stack:** Vite 8, React 19, React Router 8, TypeScript 6, Tailwind 4, lucide-react, @supabase/supabase-js 2, Vitest, playwright-core (system Chrome), Supabase CLI via `npx supabase` (local stack needs Docker Desktop running), pgTAP, GitHub Actions, Wrangler.

**Spec:** `docs/superpowers/specs/2026-10-07-kalvio-desk-design.md` (kalvio-build repo). This plan covers build-order step 1 (spec §8.1) only. Billing, products, dashboard, records, the admin page and plan-renewal notices are later plans.

## Global Constraints

- Free plans only: Supabase free (new project `kalvio-desk`, region `ap-south-1` Mumbai), Cloudflare Pages free, GitHub Actions, Cloudflare R2 free. No SMS, no WhatsApp Business API, no paid APIs.
- All WhatsApp actions are `https://wa.me/<digits>?text=<encoded>` links opened by a person. Nothing is sent automatically.
- Every table has `clinic_id` and row-level security. Rules are enforced in the database, never only in screens.
- Roles: `doctor` sees and changes everything in its clinic; `reception` cannot read or change `clinics` settings or `members` other than itself (later steps add notes, prescriptions, dashboard to the doctor-only list).
- Phones are stored in E.164 (`+919845012345`). Indian input forms accepted: 10 digits, `0` + 10, `91` + 10, `+91` + 10, with spaces or dashes.
- "Today" is the date in `Asia/Kolkata`, computed by the server (`private.today_ist()`), never from the device clock.
- Logins: Supabase Auth email + password, sign-ups disabled, email confirmations off. Doctors use their email. Receptionists use a username; their internal email is `<username>@staff.kalvio-desk.pages.dev`.
- Only the publishable key ships to browsers. The service role key lives only in the Edge Function's environment, GitHub secrets and the gitignored `.env` on Karthik's Mac.
- English only. Simple words. No prices anywhere in step 1.
- WhatsApp texts (exact, `<…>` filled in; day format `Thursday 9 Oct`, time `11:30 AM`, en-IN):
  - Confirm: `Your appointment at <clinic> is confirmed for <day> <time>.`
  - Decline: `Hi <name>, sorry, we can't give you an appointment at <clinic> on <day>. Please call us on <clinic phone> to find another time.`
  - Reminder: `Hi <name>, a reminder of your appointment at <clinic> tomorrow at <time>.`
  - Review: `Thank you for visiting <clinic>! If you're happy with your visit, a Google review would help us a lot: <link>`
- UI design (Karthik's request): every screen is designed with the installed design skills, not ad hoc. Task 5b sets the design system with `frontend-design` (Anthropic), `design:design-system` and taste-skill (Leonxlnx/taste-skill, installed at `~/.claude/skills/taste-skill/SKILL.md`; read the file directly; use its trust-first dials VARIANCE 3–4, MOTION 2–3, DENSITY 4–5 and its anti-slop rules, since it is written for landing pages, not product UI); each UI task (6–9) builds with `frontend-design`, writes labels and messages with `design:ux-copy`, then runs `design:design-critique` and `design:accessibility-review` on phone and desktop screenshots and fixes what they find before committing. WCAG AA contrast, 44 px touch targets, works one-handed on a phone at the reception desk.
- Visit statuses: `waiting` (website request), `booked`, `arrived`, `with_doctor`, `done`, `no_show`, `declined`. Sources: `website`, `google`, `friend`, `instagram`, `walk_in`, `other`.

## Review Focus

1. Two receptionists tap Arrived at the same moment: each patient must get a different token, numbered 1, 2, 3… without gaps (Task 3, parallel-calls test).
2. A family shares one phone number: walk-in lookup lists every patient on that phone to pick from, and a website request only joins an existing patient when phone *and* name match (ignoring case and spaces); otherwise it's a new patient (Tasks 3, 4).
3. The same phone typed differently (`09845012345`, `+91 98450 12345`, `98450-12345`) finds the same patient, in the app and in `desk_book` (Tasks 3, 5).
4. Between 6:30 PM and midnight UTC the device's date and India's date differ: Today and Tomorrow must follow India's date (Tasks 3, 5).
5. On a clinic's website, when Desk is down or slow, the Book button must still open WhatsApp at once and not be blocked as a pop-up (Task 13).

---

### Task 1: New repo and app shell

**Files:**
- Create: `~/Desktop/kalvio-desk/` with `package.json`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `index.html`, `.gitignore` (includes `.env`, `supabase/.temp`, `dist`), `.env.example`, `.node-version` (`22`), `src/main.tsx`, `src/App.tsx`, `src/styles/app.css`, `public/manifest.webmanifest`, `public/sw.js`, `public/icon-192.png`, `public/icon-512.png`, `.github/workflows/ci.yml`, `README.md`
- Test: `src/App.test.ts`

**Interfaces:**
- Produces: `npm run dev | build | test | lint | typecheck`; env vars `VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`; Tailwind tokens copied from kalvio-build's `kalvio` theme (`src/themes/kalvio.ts`) so Desk looks like the Kalvio brand.

- [ ] **Step 1:** Create the GitHub repo: `gh repo create karthikkushi/kalvio-desk --private --clone` in `~/Desktop`.
- [ ] **Step 2:** Scaffold with the same versions and ESLint/TS settings as kalvio-build (`package.json`, `eslint.config.js`, `tsconfig.json` copied and trimmed). `index.html` has `<meta name="robots" content="noindex">`, theme colour `#14121f`, manifest link. `public/sw.js`: network-first for app files, cache fallback, never caches `supabase.co` requests (pattern of Lead Finder's `web/sw.js`).
- [ ] **Step 3:** Write `src/App.test.ts`: `it('exports the routes', …)` asserting `ROUTES` from `src/App.tsx` equals `['/login', '/', '/patients', '/patients/:id', '/settings']`.
- [ ] **Step 4:** Run `npm test`; expected FAIL (no `ROUTES`). Add `export const ROUTES` and an `App` with placeholder pages; run `npm test && npm run lint && npm run build`; expected all pass.
- [ ] **Step 5:** `ci.yml`: on push, `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- [ ] **Step 6:** Commit `"App shell: Vite, React, Tailwind, PWA files, CI"` and push.

### Task 2: Core schema and row-level security

Docker Desktop must be running (`open -a Docker`, wait until `docker info` succeeds).

**Files:**
- Create: `supabase/config.toml` (`npx supabase init`; set `[auth] enable_signup = false`, `[auth.email] enable_confirmations = false`), `supabase/migrations/20261008000100_core.sql`, `supabase/tests/01_isolation.test.sql`, `supabase/tests/helpers.sql`
- Modify: `package.json` (scripts `db:start` = `supabase start`, `db:reset` = `supabase db reset`, `db:test` = `supabase test db`)

**Interfaces:**
- Produces tables (all `id uuid primary key default gen_random_uuid()`, `created_at timestamptz default now()`):
  - `public.clinics(slug text unique not null check (slug ~ '^[a-z0-9-]{3,40}$'), name text not null, phone text, whatsapp text, address text, area text, city text, google_review_url text, is_demo boolean default false)`
  - `public.members(user_id uuid unique not null references auth.users on delete cascade, clinic_id uuid not null references clinics, role text not null check (role in ('doctor','reception')), name text not null, username text unique, active boolean not null default true)`
  - `public.patients(clinic_id, name text not null check (length(name) between 1 and 80), phone text check (phone ~ '^\+\d{10,15}$'), age int check (age between 0 and 130), gender text check (gender in ('female','male','other')), source text check (source in (…sources…)), first_visit_on date)` + index `(clinic_id, phone)`
  - `public.visits(clinic_id, patient_id uuid not null references patients on delete cascade, day date not null, time time, token int, status text not null check (status in (…statuses…)), source text check (…sources…), patient_message text check (length(patient_message) <= 500), reminded_at timestamptz, created_by uuid)` + unique `(clinic_id, day, token)`
  - `private.my_clinic() returns uuid` and `private.my_role() returns text` (security definer, read `members` where `user_id = auth.uid() and active`; null when switched off)
  - `private.today_ist() returns date` = `(now() at time zone 'Asia/Kolkata')::date`
- RLS: `patients`, `visits`: all operations where `clinic_id = private.my_clinic()`. `clinics`: select own; update only when `private.my_role() = 'doctor'`. `members`: select own clinic's rows; no insert/update/delete from clients (the Edge Function in Task 9 uses the service role). `anon` has no table access.

- [ ] **Step 1:** Write `supabase/tests/helpers.sql`: `tests.make_clinic(slug text) returns uuid`, `tests.make_user(clinic uuid, role text) returns uuid` (inserts into `auth.users` and `members`), `tests.login_as(user_id uuid)` (sets `role authenticated` and `request.jwt.claims` with `sub`).
- [ ] **Step 2:** Write `01_isolation.test.sql` (pgTAP) with two clinics A and B, each with a doctor, a receptionist and one patient + visit:
  - doctor A sees exactly 1 patient and 1 visit; `insert into patients (clinic_id …) values (B …)` throws `42501`
  - receptionist A sees A's patient; `update clinics set name='x'` affects 0 rows; selecting `members` returns only A's members
  - a switched-off receptionist (`active=false`) sees 0 patients
  - `anon` selecting `patients` throws `42501`
- [ ] **Step 3:** `npm run db:start && npm run db:test`; expected FAIL (tables missing).
- [ ] **Step 4:** Write the migration as specified in Interfaces. `private` schema not exposed to the API.
- [ ] **Step 5:** `npm run db:reset && npm run db:test`; expected all pass.
- [ ] **Step 6:** Commit `"Core tables with clinic isolation and roles"`.

### Task 3: Reception functions (phones, tokens, statuses)

**Files:**
- Create: `supabase/migrations/20261008000200_reception.sql`, `supabase/tests/02_reception.test.sql`, `tests/tokens.integration.test.ts` (Vitest, runs against the local stack; skipped unless `DESK_LOCAL=1`)

**Interfaces:**
- Produces (all `security invoker`, so RLS applies; callable by `authenticated`):
  - `private.norm_phone(raw text) returns text`: rules in Global Constraints; returns null when it can't make a valid Indian number.
  - `public.desk_find_patients(p_phone text) returns setof patients`: all patients of my clinic with that normalised phone, newest visit first.
  - `public.desk_walk_in(p_patient_id uuid default null, p_name text default null, p_phone text default null, p_source text default null) returns visits`: uses the patient, or creates one; creates today's visit (`status 'arrived'`, `source` = given or `'walk_in'`) with the next token.
  - `public.desk_arrive(p_visit_id uuid) returns visits`: sets `arrived` and the next token for that clinic and day. Takes `pg_advisory_xact_lock(hashtext(clinic_id::text || day::text))` before `max(token)+1`.
  - `public.desk_set_status(p_visit_id uuid, p_status text) returns visits`: allowed moves: waiting→booked|declined, booked→arrived (via `desk_arrive` only)|no_show, arrived→with_doctor|done|no_show, with_doctor→done; anything else raises `'Not allowed'`.
  - `public.desk_book_confirm(p_visit_id uuid, p_day date, p_time time) returns visits`: waiting → booked with day/time.
  - `public.desk_mark_reminded(p_visit_id uuid) returns void`.
  - `public.desk_day(p_which text) returns json`: `p_which in ('today','tomorrow','requests')`; visits with patient name/phone, ordered: arrived/with_doctor by token, then booked by time, then done/no_show; `requests` = all `waiting` visits of my clinic.

- [ ] **Step 1:** `02_reception.test.sql`:
  - `norm_phone`: `'09845012345'`, `'+91 98450 12345'`, `'98450-12345'`, `'919845012345'` → `'+919845012345'`; `'12345'` → null
  - two walk-ins today get tokens 1 and 2; a booked visit then `desk_arrive` gets 3; tomorrow's first arrival gets 1; another clinic's first arrival gets 1
  - `desk_find_patients('09845012345')` returns both family members (`Asha`, `Ravi`) created with `+919845012345`
  - `desk_set_status(done → arrived)` throws `Not allowed`
  - `desk_day('today')` uses `private.today_ist()`: with a visit dated `today_ist()` it is listed; one dated `today_ist() - 1` is not
- [ ] **Step 2:** `tokens.integration.test.ts`: as one receptionist, create 10 booked visits for today, call `desk_arrive` for all 10 with `Promise.all`; expect tokens sorted to equal `[1..10]`.
- [ ] **Step 3:** Run `npm run db:test` and `DESK_LOCAL=1 npx vitest run tests/tokens.integration.test.ts`; expected FAIL.
- [ ] **Step 4:** Write the migration as in Interfaces.
- [ ] **Step 5:** Run both again; expected PASS.
- [ ] **Step 6:** Commit `"Reception functions: phones, tokens, statuses, day lists"`.

### Task 4: Public website booking function

**Files:**
- Create: `supabase/migrations/20261008000300_desk_book.sql`, `supabase/tests/03_desk_book.test.sql`

**Interfaces:**
- Produces `public.desk_book(p_slug text, p_name text, p_phone text, p_day date default null, p_time_pref text default null, p_message text default null, p_website text default null) returns json` — `security definer`, `set search_path = ''`, granted to `anon`. Returns only `{"ok": true}` or raises.
  - `p_website` is the honeypot: when non-empty, return `{"ok": true}` and store nothing.
  - Unknown slug → raise `'Unknown clinic'`. Bad phone → `'Please check the phone number'`. Name 1–80 chars, message ≤ 500, `p_time_pref` ≤ 40.
  - Rate limits (table `private.desk_book_log(clinic_id, phone, at)`): max 3 per phone per clinic per day, max 60 per clinic per day → raise `'Too many requests, please call the clinic'`.
  - Patient match: same clinic, same normalised phone, and `lower(regexp_replace(name,'\s+','','g'))` equal; else a new patient with `source 'website'`.
  - Creates a visit `status 'waiting'`, `source 'website'`, `day = coalesce(p_day, today_ist())`, `patient_message` = time preference and message joined with `' · '`.

- [ ] **Step 1:** `03_desk_book.test.sql` (as `anon`): success returns `{"ok":true}` and creates 1 waiting visit; same phone + `'ASHA  K'` vs existing `'Asha K'` reuses the patient; same phone + `'Ravi'` creates a second patient; honeypot stores nothing; 4th request from one phone in a day raises; unknown slug raises; the function's result never contains a patient id.
- [ ] **Step 2:** Run `npm run db:test`; expected FAIL.
- [ ] **Step 3:** Write the migration.
- [ ] **Step 4:** Run; expected PASS.
- [ ] **Step 5:** Commit `"desk_book: website booking requests with spam limits"`.

### Task 5: Client libraries (Supabase, auth, phone, time, WhatsApp texts)

**Files:**
- Create: `src/lib/supabase.ts`, `src/lib/auth.tsx`, `src/lib/phone.ts`, `src/lib/time.ts`, `src/lib/wa.ts`, tests `src/lib/phone.test.ts`, `src/lib/time.test.ts`, `src/lib/wa.test.ts`

**Interfaces:**
- Produces:
  - `supabase` (typed client from `VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`)
  - `AuthProvider`, `useAuth(): { session; member: { clinicId: string; role: 'doctor' | 'reception'; name: string } | null; clinic: Clinic | null; signIn(login: string, password: string): Promise<void>; signOut(): Promise<void> }`; `signIn` maps a login without `@` to `<login>@staff.kalvio-desk.pages.dev`
  - `normPhone(raw: string): string | null` (same rules as `private.norm_phone`), `phoneDigits(e164: string): string`, `formatPhone(e164: string): string` → `'+91 98450 12345'`
  - `todayIST(now?: Date): string` (`YYYY-MM-DD`), `tomorrowIST(now?: Date): string`, `dayLabel(iso: string): string` → `'Thursday 9 Oct'`, `timeLabel(hhmm: string): string` → `'11:30 AM'`
  - `waLink(e164: string, text: string): string`, `confirmText`, `declineText`, `reminderText`, `reviewText` building the exact Global Constraints texts
- [ ] **Step 1:** Tests: the four phone inputs from Task 3 → `'+919845012345'`; `todayIST(new Date('2026-10-07T19:00:00Z'))` → `'2026-10-08'` and `tomorrowIST` of the same → `'2026-10-09'`; `dayLabel('2026-10-09')` → `'Friday 9 Oct'`; `timeLabel('15:05')` → `'3:05 PM'`; each text function returns the exact template with sample values; `waLink('+919845012345','Hi & bye')` → `'https://wa.me/919845012345?text=Hi%20%26%20bye'`.
- [ ] **Step 2:** Run `npm test`; expected FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run; expected PASS.
- [ ] **Step 5:** Commit `"Client libraries: auth, phone, India time, WhatsApp texts"`.

### Task 5b: Desk design system

**Files:**
- Create: `docs/DESIGN.md`, `src/styles/tokens.css`, `src/components/ui/` (`Button.tsx`, `Chip.tsx`, `Sheet.tsx`, `Field.tsx`, `ListRow.tsx`, `Tabs.tsx`, `EmptyState.tsx`, `Toast.tsx`), `src/pages/DesignPreview.tsx` (route `/design`, dev builds only), `src/components/ui/ui.test.ts`

**Interfaces:**
- Produces the components above, used by Tasks 6–9; status chip colours for each visit status and source.
- [ ] **Step 1:** Invoke `frontend-design` and `design:design-system`, and read taste-skill's SKILL.md, with the brief: busy clinic reception, glanceable Today list, Kalvio brand (from kalvio-build's `kalvio` theme), calm and trustworthy for a medical setting, light and dark mode, phone first. Record the choices (type scale, colours, spacing, radius, motion, status colours) in `docs/DESIGN.md`.
- [ ] **Step 2:** `ui.test.ts`: every status chip's text/background pair meets 4.5:1 contrast (reuse kalvio-build's `src/lib/contrast.ts`), and every status and source has a chip style.
- [ ] **Step 3:** Run; expected FAIL. Build tokens and components; render them all on `/design`. Run; expected PASS.
- [ ] **Step 4:** Screenshot `/design` at 393 px and 1280 px, light and dark; run `design:design-critique` and `design:accessibility-review`; fix findings.
- [ ] **Step 5:** Commit `"Desk design system and UI components"`.

### Task 6: Login, layout and the end-to-end harness

**Files:**
- Create: `src/pages/Login.tsx`, `src/components/Layout.tsx` (bottom tabs on phone, side bar on wide screens: Today, Patients, Settings — Settings only for doctors), `src/components/RequireAuth.tsx`, `e2e/harness.ts`, `e2e/login.e2e.ts`, `supabase/seed.sql` (local only: clinic `test-clinic`, doctor `doctor@test.local` / `test-pass-1`, receptionist `reception1` / `test-pass-2`)
- Modify: `src/App.tsx`, `package.json` (script `e2e` = `DESK_LOCAL=1 vitest run e2e`)

**Interfaces:**
- Consumes: `useAuth` (Task 5).
- Produces: `e2e/harness.ts` exporting `startApp(): Promise<{ page: Page; close(): Promise<void> }>` (runs Vite on 127.0.0.1:5180 against the local stack, launches system Chrome at 393×852, mobile) and `loginAs(page, 'doctor' | 'reception')`.
- [ ] **Step 1:** `login.e2e.ts`: wrong password shows `'Wrong email/username or password'`; doctor login lands on Today and sees the Settings tab; `reception1` login lands on Today with no Settings tab; visiting `/settings` as reception redirects to `/`; a switched-off receptionist sees `'This login is switched off. Ask the doctor.'` and is signed out.
- [ ] **Step 2:** Run `npm run db:reset && npm run e2e`; expected FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run; expected PASS.
- [ ] **Step 5:** Commit `"Login, roles in the layout, end-to-end harness"`.

### Task 7: Today screen

**Files:**
- Create: `src/pages/Today.tsx`, `src/components/VisitRow.tsx`, `src/components/WalkInSheet.tsx`, `src/components/ConfirmSheet.tsx`, `src/api/reception.ts`, `e2e/today.e2e.ts`

**Interfaces:**
- Consumes: Task 3 functions via `src/api/reception.ts`: `listDay(which: 'today'|'tomorrow'|'requests')`, `findPatients(phone)`, `walkIn(args)`, `arrive(id)`, `setStatus(id, status)`, `confirmRequest(id, day, time)`, `markReminded(id)`; texts and links from Task 5.
- Behaviour: tabs **Today** / **Tomorrow** / **Requests (n)**. Rows show token, name, time, status chip, source chip "Website". Buttons per status: booked → Arrived, No-show; arrived → With doctor, Done, No-show; with_doctor → Done; done → Ask for review (only when the clinic has a review link). Requests → Confirm (pick day, time; then opens WhatsApp with the confirm text) and Decline (opens WhatsApp with the decline text). Tomorrow → Remind (opens WhatsApp, then shows "Reminded"). **+ Walk-in**: phone field; matches listed to pick, plus "New patient" (name, optional "How did you hear about us?" chips). The list refreshes every 30 seconds and on focus.
- [ ] **Step 1:** `today.e2e.ts`: walk-in with a new phone gets token 1 and shows "Arrived"; a second walk-in with `09845012345` when two family members exist shows both names to pick; With doctor → Done shows Ask for review whose href starts `https://wa.me/` and contains the review link; a `desk_book` request (called via RPC as anon) appears under Requests with "Website", Confirm for tomorrow 11:30 produces an href containing `confirmed%20for` and the row moves to Tomorrow; Remind's href contains `a%20reminder` and the row then shows "Reminded"; a request declined disappears from Requests.
- [ ] **Step 2:** Run `npm run e2e`; expected FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run; expected PASS.
- [ ] **Step 5:** Commit `"Today screen: walk-ins, tokens, statuses, requests, reminders, reviews"`.

### Task 8: Patients

**Files:**
- Create: `src/pages/Patients.tsx`, `src/pages/PatientPage.tsx`, `src/api/patients.ts`, `e2e/patients.e2e.ts`

**Interfaces:**
- Produces: `searchPatients(q: string)` (phone digits → phone match; otherwise `name ilike %q%`, limit 30), `getPatient(id)` with visits newest first, `updatePatient(id, { name, phone, age, gender, source })`.
- Behaviour: search box; list rows name, phone, last visit. Patient page: details (editable), first visit, source, visits with date, token, status. Billing and notes sections come in later steps (not shown).
- [ ] **Step 1:** `patients.e2e.ts`: searching `98450` finds both family members; searching `asha` finds Asha; editing the phone to `98450 99999` saves as `+91 98450 99999`; an invalid phone shows `'Please check the phone number'` and doesn't save; the patient page lists the visits from Task 7's flow.
- [ ] **Step 2:** Run; expected FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run; expected PASS.
- [ ] **Step 5:** Commit `"Patients: search and patient page"`.

### Task 9: Settings and receptionist logins

**Files:**
- Create: `src/pages/Settings.tsx`, `supabase/functions/staff/index.ts`, `supabase/functions/staff/handler.test.ts`, `e2e/settings.e2e.ts`

**Interfaces:**
- Produces Edge Function `staff` (POST, user JWT required): body `{ action: 'create', name, username, password } | { action: 'reset', userId, password } | { action: 'switch', userId, active }`. Verifies the caller is an active `doctor`; acts only on `reception` members of the caller's clinic; `username` must match `^[a-z0-9-]{3,30}$` and is stored as `<clinicSlug>-<username>` unless it already starts with the slug; password ≥ 8 chars. Uses the service role from `SUPABASE_SERVICE_ROLE_KEY`. Errors return `{ error: string }` with status 400/403.
- Behaviour: doctor edits clinic name, phone, WhatsApp, address, area, city, Google review link; Staff list with Add receptionist, Reset password, Switch off/on.
- [ ] **Step 1:** `handler.test.ts` (pure handler with a fake admin client): a reception caller gets 403; a doctor can't reset another clinic's member (403); short password → 400; create stores `test-clinic-priya` when given `priya`.
- [ ] **Step 2:** `settings.e2e.ts`: doctor changes the clinic name and the Today screen's confirm text uses the new name; adds receptionist `priya` and can log in as `test-clinic-priya`; switching her off makes her next action show the switched-off message.
- [ ] **Step 3:** Run both; expected FAIL.
- [ ] **Step 4:** Implement (the function runs locally with `npx supabase functions serve`).
- [ ] **Step 5:** Run both; expected PASS.
- [ ] **Step 6:** Commit `"Settings and receptionist logins"`.

### Task 10: Demo clinic and new-clinic script

**Files:**
- Create: `supabase/demo.sql`, `scripts/new-clinic.mjs`, `.github/workflows/demo-reset.yml`, `scripts/demo.test.ts`

**Interfaces:**
- `supabase/demo.sql`: idempotent. Deletes the `demo` clinic's patients and visits and recreates: clinic `slug 'demo'`, `name 'Glow Skin Clinic (demo)'`, `is_demo true`, 30 patients with clearly fictional names and `+91 90000 000xx` phones, today's list (4 done, 2 with tokens arrived, 1 with doctor, 5 booked), 3 website requests, 6 bookings tomorrow. Dates relative to `private.today_ist()`.
- `scripts/new-clinic.mjs --slug avance --name "Avance Derma" --email doctor@… --doctor "Dr …"`: reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `.env`, creates the clinic, the doctor auth user (random 12-char password printed once) and the member row.
- `demo-reset.yml`: daily 01:30 IST (`0 20 * * *`), runs `psql "$SUPABASE_DB_URL" -f supabase/demo.sql`.
- [ ] **Step 1:** `demo.test.ts` (local stack): running `demo.sql` twice leaves exactly 30 demo patients and 3 waiting requests; another clinic's rows are untouched.
- [ ] **Step 2:** Run; expected FAIL. Implement; run; expected PASS.
- [ ] **Step 3:** Commit `"Demo clinic (reset nightly) and new-clinic script"`.

### Task 11: Nightly backups

**Files:**
- Create: `.github/workflows/backup.yml`, `scripts/restore-test.sh`, `docs/BACKUPS.md`

**Interfaces:**
- `backup.yml`: daily 02:30 IST (`0 21 * * *`): install `postgresql-client-17` and `age`; `pg_dump --format=custom "$SUPABASE_DB_URL"` → `age -r "$AGE_RECIPIENT"` → upload to R2 bucket `kalvio-desk-backups` as `desk-YYYY-MM-DD.dump.age` with `aws s3 cp --endpoint-url "$R2_ENDPOINT"`; deletes objects older than 30 days. Secrets: `SUPABASE_DB_URL`, `AGE_RECIPIENT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`.
- `restore-test.sh <file>`: decrypts with the private key at `~/.config/kalvio-desk/backup.key`, restores into the local stack (`pg_restore --clean`), prints row counts per table.
- `docs/BACKUPS.md`: where backups are, the monthly restore check, and that the private key never goes to GitHub.
- [ ] **Step 1:** Run the workflow by hand (`gh workflow run backup.yml`) once production exists (Task 12); expected a new object in R2.
- [ ] **Step 2:** `scripts/restore-test.sh` on that file; expected non-zero counts for `clinics` and `patients`.
- [ ] **Step 3:** Commit `"Nightly encrypted backups to R2, restore check"`.

### Task 12: Production

**Files:**
- Create: `.github/workflows/deploy.yml`, `docs/DEPLOY.md`
- Modify: `README.md`

**Interfaces:**
- Supabase project `kalvio-desk` in `ap-south-1` (Supabase MCP `create_project`, free); migrations pushed with `npx supabase db push`; function `staff` deployed with `npx supabase functions deploy staff`; Auth settings as in Global Constraints; demo clinic created with `new-clinic.mjs` + `demo.sql`.
- Cloudflare Pages project `kalvio-desk` (Direct Upload, `npx wrangler pages project create kalvio-desk --production-branch main`); `deploy.yml` mirrors kalvio-build's (tests, build, `wrangler pages deploy dist`), needing repo secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` and variables `VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY` (publishable).
- [ ] **Step 1:** Create and configure everything above; deploy.
- [ ] **Step 2:** Smoke test on `https://kalvio-desk.pages.dev` with the demo doctor login on a phone-sized browser: Today shows the demo list; a walk-in gets the next token; Confirm on a request opens a `wa.me` link.
- [ ] **Step 3:** Run Supabase security advisors (`get_advisors`); expected no RLS warnings.
- [ ] **Step 4:** Commit `"Deploy: Supabase Mumbai, Cloudflare Pages"`.

### Task 13: Website booking form → Desk (kalvio-build repo)

**Files:**
- Modify: `src/data/types.ts` (booking section gets `deskSlug?: string`), `src/sections/Booking.tsx`, `src/config/site.ts` (`desk: { url: 'https://<project>.supabase.co', key: '<publishable key>' }`)
- Create: `src/lib/desk.ts`, `src/lib/desk.test.ts`

**Interfaces:**
- Produces `sendToDesk(slug: string, b: { name: string; phone: string; day?: string; timePref?: string; message?: string; website?: string }): Promise<boolean>`: POST to `${SITE.desk.url}/rest/v1/rpc/desk_book` with `apikey`, `keepalive: true`, 8-second timeout; never throws; `true` when `{ ok: true }`.
- Booking behaviour when `deskSlug` is set: `window.open(whatsapp)` runs first, synchronously in the submit handler, then `sendToDesk` (not awaited); a hidden `website` input (honeypot, `tabIndex -1`, `autocomplete off`); the note under the button reads "Opens WhatsApp with your details filled in. Your request also goes to the clinic's booking list." and the form shows "By sending, you agree that <clinic> may contact you about your appointment." Without `deskSlug` nothing changes.
- [ ] **Step 1:** `desk.test.ts`: maps form fields to RPC params (`p_slug`, `p_name`, `p_phone`, `p_day`, `p_time_pref`, `p_message`, `p_website`); resolves `false` (no throw) when `fetch` rejects or times out; in a Booking render test with `deskSlug`, `window.open` is called before `fetch`, and is still called when `fetch` rejects.
- [ ] **Step 2:** Run `npx vitest run src/lib/desk.test.ts`; expected FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run `npm test && npm run lint && npm run build`; expected PASS. Manually: a booking on a local demo page with `deskSlug: 'demo'` appears under Requests in the demo clinic.
- [ ] **Step 5:** Commit `"Booking form can send requests to Kalvio Desk"`, push a branch, open a PR.
