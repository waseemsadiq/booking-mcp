# WFCS Booking — Claude Agent Onboarding

A role-aware onboarding site for The Well Foundation's Claude agent. Users log in with their existing WFCS Booking account, get redirected to their role-specific page, and see curated prompts they can copy directly into Claude.

Live at: **[booking-docs.wellfoundation.org.uk](https://booking-docs.wellfoundation.org.uk/)**

---

## What it does

- Users log in with their WFCS Booking credentials (same email/password as the main app)
- The site detects their role (customer, instructor, admin, super admin) and redirects accordingly
- Each role sees a Quick Start page with their 5–7 most useful prompts
- A full prompt library page has 30–70+ prompts per role, searchable and filterable by category
- No backend of its own — authentication is handled by the WFCS Booking API

---

## Local development

Requires Galvani running from the git root:

```bash
# From /Users/waseem/Sites/www/
./galvani

# Site available at:
http://localhost:8080/booking/mcp/booking-mcp-docs/index.html?nocache=1

# Note: always use ?nocache=1 when testing after JS changes
# to bypass browser caching of index.html
```

Test credentials (all use `password123`):

| Email | Role |
|---|---|
| `customer@booking.local` | Customer |
| `instructor@booking.local` | Instructor |
| `admin@booking.local` | Super Admin |

---

## Structure

```
booking-mcp-docs/
├── index.html              # Login page
├── customer/
│   ├── index.html          # Quick Start (5 prompts)
│   └── prompts.html        # Full library (search + filter)
├── instructor/
│   ├── index.html
│   └── prompts.html
├── admin/
│   ├── index.html
│   └── prompts.html
├── super-admin/
│   ├── index.html
│   └── prompts.html
├── assets/
│   ├── styles.css          # All styles — no inline CSS anywhere
│   ├── app.js              # Auth, theme toggle, CSRF, prompt rendering
│   └── prompts-data.js     # All prompts keyed by role and category
├── docs/
│   ├── TESTING.md          # Manual testing checklist
│   └── LAUNCHING.md        # Launch and deployment checklist
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages deploy on push to master
└── CNAME                   # booking-docs.wellfoundation.org.uk
```

---

## Updating prompts

All prompts live in `assets/prompts-data.js`. The structure is:

```javascript
var promptsDatabase = {
    customer: {
        activities: [ { text: '...', difficulty: 'easy' }, ... ],
        bookings:   [ ... ],
        // ...
    },
    instructor: { ... },
    admin: { ... },
    'super-admin': { ... }
};
```

To add or edit prompts:

1. Edit `assets/prompts-data.js`
2. Commit and push to `master`
3. GitHub Pages deploys automatically — no rebuild needed

Difficulty values: `easy` | `intermediate` | `advanced`

---

## Deployment

Hosted on GitHub Pages with a custom domain via Cloudflare.

- Push to `master` → GitHub Actions deploys automatically (see `.github/workflows/deploy.yml`)
- Custom domain: `booking-docs.wellfoundation.org.uk` (Cloudflare CNAME → `waseemsadiq.github.io`)
- HTTPS enforced via GitHub Pages settings

**Required repository secret:**

The live booking API URL is not hardcoded in the repo. Before deploying, add it in:

> GitHub repo → Settings → Secrets and variables → Actions → New repository secret

| Secret name | Value |
|---|---|
| `BOOKING_API_URL` | `https://booking.wellfoundation.org.uk` |

The deploy workflow substitutes this into `app.js` at build time. The git repo only ever contains the placeholder `__BOOKING_API_URL__`.

See [docs/LAUNCHING.md](docs/LAUNCHING.md) for the full launch checklist.

---

## How authentication works

1. The login page fetches the `csrf_token` cookie from the booking app (same origin)
2. It POSTs credentials to `/api/auth/login` with the CSRF token in the `X-CSRF-Token` header
3. On success, the JWT is stored in `localStorage`
4. `GET /api/auth/verify-token` returns the user's role, which drives the redirect
5. All role pages call `requireAuth()` on load — invalid/missing tokens redirect to login

CSRF note: the token is sent as both `X-CSRF-Token` header and `_csrf_token` in the JSON body. The server checks the header first.
