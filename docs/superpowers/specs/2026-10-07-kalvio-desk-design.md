# Kalvio Desk: design

Status: design for review, 7 Oct 2026. Nothing is built yet.

Kalvio Desk is a simple business app (reception, billing, products, dashboard, patient records) that Kalvio Build
sells alongside the websites it makes. Version 1 is for **clinics**; other sectors (salons, gyms, tuition, shops,
restaurants) come later as add-on packs on the same core.

## 1. Decisions (from Karthik)

| Topic | Decision |
|---|---|
| First sector | Clinics: dentist, skin, eye, physio, vet |
| Version 1 includes | Reception, billing, dashboard, patient records, plus products shown on the clinic's website |
| Product ordering on the website | "Order on WhatsApp" button per product (no cart, no online payment) |
| Logins | Doctor (owner, sees everything) and receptionist (no doctor's notes, prescriptions or income reports) |
| Price | ₹699 a month for Desk alone; ₹1,499 a month for Desk + the website care plan (normally ₹999) |
| Name | Kalvio Desk |
| How it's built | A new app with its own free database (option A); not inside Lead Finder, not existing software |

Assumptions (not stated, correct if wrong): single-location clinics with 1–3 doctors and 1–2 front-desk staff;
English only in version 1; used on a phone or the reception computer; Bengaluru clinics first.

## 2. Users and what each can do

| | Doctor (owner) | Receptionist |
|---|---|---|
| Today list, walk-ins, website bookings, reminders | ✓ | ✓ |
| Bills, payments, receipts, money due | ✓ | ✓ |
| Products and stock | ✓ | ✓ |
| Patient contact details, visit list, bills | ✓ | ✓ |
| Doctor's notes, prescriptions | ✓ | ✗ |
| Dashboard and monthly report | ✓ | ✗ |
| Settings, price list, receptionist logins | ✓ | ✗ |

These limits are enforced by the database (row-level security), not only hidden in the screens.

Kalvio (Karthik) has an admin page: every clinic, its plan renewal date, and when it was last used. Kalvio staff
open a clinic's data only to fix a problem the clinic reported.

## 3. Screens

The app is installable (a PWA, like Lead Finder) and works on a phone and on a computer.

### 3.1 Today (home, reception)

- Today's appointments in time order, then walk-ins; each visit gets a token number for the day (1, 2, 3…).
- Visit status: Booked → Arrived → With doctor → Done, or No-show. Website requests start as Waiting.
- **+ Walk-in**: type a phone number; a known patient's name fills in, otherwise enter the name. Optional one-tap
  "How did you hear about us?": Google, Friend, Instagram, Website, Passing by.
- **Website requests** appear marked "Website – waiting". **Confirm** sets the time and opens WhatsApp with
  "Your appointment at <clinic> is confirmed for <day> <time>." **Decline** opens WhatsApp with a polite note.
- **Tomorrow** tab: each booked visit has **Remind**, which opens WhatsApp with
  "Hi <name>, a reminder of your appointment at <clinic> tomorrow at <time>."
- Follow-ups due today (set by the doctor) appear in the list as "Follow-up".
- After **Done**: **Bill** and **Ask for review** (WhatsApp with the clinic's Google review link).

All WhatsApp actions are `wa.me` links that open the clinic's own WhatsApp with the text typed in. Nothing is sent
automatically and nothing is paid (no WhatsApp Business API).

### 3.2 Bill

- Start from a visit (or a walk-in purchase without a visit).
- Add lines from the clinic's item list: services (consultation, treatments) and products. Each line: quantity,
  price, optional discount in rupees.
- Payment: **UPI** (a QR code for the exact amount made from the clinic's UPI ID, `upi://pay?pa=…&am=…`; the
  receptionist checks their phone and taps Paid), **Cash**, **Card**, or **Pay later** (shown as money due). Part
  payments allowed; a bill is Paid when payments cover the total.
- **Send receipt** opens WhatsApp with a receipt link; **Print** prints the same receipt.
- A bill can be cancelled (with a reason) by the doctor; cancelled bills stay visible, struck through. Bills are
  never deleted.

### 3.3 Products

- Add or edit: photo (phone camera or file, compressed to about 100 KB), name, short description, price, GST rate,
  stock count, "Show on website" switch, "Low stock below" number.
- Selling on a bill lowers stock; cancelling the bill puts it back. A stock adjustment button records new stock
  arriving or corrections, with a note.

### 3.4 Patients

- Search by phone or name. Patient page: phone, name, age or date of birth, gender (optional), first visit,
  source, visits, bills, money due.
- **Doctor only**: visit notes (free text) and a prescription per visit: medicine name, dose, how often, days,
  instructions. Medicine names the clinic has used before are suggested. **Print** or **Send PDF** (made in the
  browser) on the clinic's letterhead: clinic name, address, doctor's name, qualification and medical registration
  number.
- **Follow-up date** on a visit puts the patient on that day's Today list.
- **Download data** (all of one patient's records as a file) and **Delete patient** (doctor only, asks twice) for
  privacy requests. Deleting removes notes and prescriptions; bills keep the amounts but drop the name.

### 3.5 Dashboard (doctor only)

- Today: patients seen, no-shows, money collected (UPI / cash / card), money due.
- This month vs last month: income by week, top 5 treatments, top 5 products, new vs returning patients, where
  patients came from (website, Google, friend, Instagram, walk-in), no-show rate.
- Definitions: income = payments received in the period (not bills raised); a returning patient had a Done visit
  before the period.

### 3.6 Settings (doctor only)

Clinic name, logo, address, phone, WhatsApp number, working hours and days, doctor details for prescriptions,
UPI ID, Google review link, GSTIN (optional), item list (services and products), receptionist logins (add, reset
password, switch off).

## 4. Money rules

- Amounts are stored as whole paise (integers), never floats.
- Prices are entered **including GST**, as clinics quote them. Each item has a GST rate set by the clinic or its
  accountant (a number such as 0, 5 or 18, so new slabs need no code change); Kalvio does not decide rates.
- Per line: amount = price × quantity − discount. GST in the line = amount × rate ÷ (100 + rate), rounded to the
  paisa. The receipt shows taxable value and GST per rate when the clinic has a GSTIN; otherwise it's a plain
  receipt with no tax lines.
- Bill total = sum of line amounts. No rupee round-off in version 1.
- Bill numbers run per clinic and financial year: `2026-27/0001`.

## 5. Website connection

Applies to clinic websites built from the Kalvio sections library (this repo).

- **Products section** (new section in the library): products with "Show on website" on, as photo, name, price,
  and **Order on WhatsApp** ("Hi, I'd like to order <product> (₹<price>). I saw it on your website."). Out of stock
  shows "Ask if available". The Cloudflare edge function writes the products into the HTML at request time (cached
  60 seconds), the same way samples get the shop's name, so the page stays fast and Google sees the products.
- **Booking form**: besides opening WhatsApp as today, it saves the request into Desk through a public database
  function (`desk_book`) with the same protections as `web_enquiry`: honeypot field, per-phone and per-clinic rate
  limits, length limits, and a short consent line on the form.
- Public functions only ever return: product name, description, photo URL, price, in stock yes/no. Never patients,
  stock counts, costs or bills.
- Desk works without a Kalvio website; the website features then stay off.

## 6. Data and security

Supabase free plan, a new project `kalvio-desk` in **Mumbai** (`ap-south-1`); the account has 1 of 2 free active
projects in use (Lead Finder). Cloudflare Pages hosts the app at `kalvio-desk.pages.dev`.

Tables (all with `clinic_id`, all with row-level security):

| Table | Holds |
|---|---|
| `clinics` | Settings, plan renewal date, slug used by the website |
| `members` | Supabase Auth user ↔ clinic, role `doctor` / `reception`, active flag |
| `patients` | Name, phone, age/DOB, gender, source, first visit |
| `visits` | Patient, date and time, token, status, source, follow-up date |
| `items` | Services and products: name, price, GST rate, kind, stock, website flag, photo |
| `bills`, `bill_lines`, `payments` | As in section 4; cancelled flag and reason |
| `stock_moves` | Every stock change with reason (sale, cancel, delivery, correction) |
| `notes`, `prescriptions`, `prescription_lines` | Doctor only |
| `receipt_links` | Random 128-bit token → bill, for the WhatsApp receipt page (`noindex`) |

- Logins: Supabase Auth with email and password (free; no SMS OTP, which costs per message). Receptionists get a
  username and password; internally a generated email address.
- Row-level security: a member reads and writes only their clinic's rows; `notes`, `prescriptions*`, dashboard
  functions and settings require role `doctor`.
- Receipt page shows clinic name, bill number, date, patient first name, lines and payments. No notes.
- Privacy (India's DPDP Act 2023): data stored in India and encrypted at rest; consent line on the website form;
  download and delete per patient (section 3.4); Kalvio access only for support.
- Backups: a nightly GitHub Action runs `pg_dump`, encrypts it (age), and uploads to Cloudflare R2 (free, 10 GB);
  30 days kept; a monthly test restore into a scratch database.
- Limits: 500 MB database and 1 GB file storage on the free plan, enough for roughly 30–50 clinics. Move to the
  paid plan (about ₹2,100 a month, with built-in daily backups) at about 20 paying clinics.
- Offline: the app shell and the last loaded Today list and patients stay viewable with a "No internet" bar. Bills
  and changes need the internet in version 1.

## 7. Selling and setup

- **Demo clinic**: a pretend clinic with sample patients, bills and products that Shreya can show on calls, reset
  every night.
- **Setup by Kalvio** (about 30 minutes per clinic): create the clinic and the doctor's login, enter details and the
  item list with photos, add the receptionist, and import patients from Excel if they have them (a script we run).
- **Plan payment**: a monthly UPI request on WhatsApp, recorded on the admin page; Desk shows the doctor
  "Plan renews on <date>" from 5 days before. After 7 days unpaid it shows a reminder bar; nothing is locked in
  version 1.
- **Pilot**: one friendly clinic uses Desk free for the first month; we're there on day one and check in weekly.

## 8. Build order

Each step is usable on its own and goes to the pilot clinic before the next starts.

1. **Foundation and reception**: project, logins, roles, clinic settings, patients, Today list, walk-ins, website
   bookings, reminders, demo clinic, nightly backup.
2. **Billing and products**: item list, bills, UPI QR, payments, receipts, stock, Products section on the website.
3. **Dashboard**: today and monthly reports.
4. **Patient records**: notes, prescriptions with PDF, follow-ups, download and delete.

## 9. Testing

- Unit tests (Vitest) for money rules: line amounts, GST back-calculation, discounts, part payments, cancellation,
  bill numbering.
- Database tests run against a local Supabase (CLI) with two pretend clinics: neither can read the other's rows;
  a receptionist can't read notes, prescriptions, dashboard functions or settings; public functions return only the
  allowed fields; rate limits hold.
- A Playwright run on a phone-sized screen for the main flows: walk-in → done → bill → UPI paid → receipt.
- Checked on a real Android phone before each step goes to the pilot clinic.

## 10. Not in version 1

Kannada and Hindi, other sectors' packs, more than two roles or custom permissions, several branches, offline
billing, online payments and automatic UPI confirmation, automatic WhatsApp messages (Business API), SMS, a cart on
the website, inventory purchase orders, accounting exports (Tally), lab reports, insurance.
