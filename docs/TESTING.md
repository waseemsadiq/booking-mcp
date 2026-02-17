# Testing Checklist

## Prerequisites

Galvani must be running:

```bash
# From /Users/waseem/Sites/www/
./galvani
# Site at: http://localhost:8080/booking/mcp/booking-mcp-docs/
```

---

## Login Flow

- [ ] Login page loads at `/booking/mcp/booking-mcp-docs/`
- [ ] `customer@booking.local / password123` → redirects to `/customer/`
- [ ] `instructor@booking.local / password123` → redirects to `/instructor/`
- [ ] `admin@booking.local / password123` → redirects to `/admin/`
- [ ] Invalid credentials → error message shown, form re-enabled
- [ ] Logout from any page → returns to login
- [ ] Refresh after login → stays on same page (token persists in localStorage)

## Role Detection

- [ ] Customer role → `/customer/index.html` (role badge shows "Customer")
- [ ] Instructor role → `/instructor/index.html` (badge shows "Instructor")
- [ ] Admin role → `/admin/index.html` (badge shows "Admin")
- [ ] Super admin role → `/super-admin/index.html` (badge shows "Super Admin")
- [ ] Visiting a role page without a token → redirected to login

## Quick Start Pages

- [ ] 5 quick-start prompts display correctly per role
- [ ] Difficulty badges show correct colours (Easy=green, Intermediate=amber, Advanced=red)
- [ ] Copy button copies prompt text to clipboard
- [ ] Copy button briefly shows "Copied!" then resets
- [ ] "View all prompts" link goes to `prompts.html`

## Prompt Library (prompts.html)

- [ ] All prompts load without errors (check DevTools Console)
- [ ] Search: type "yoga" → filters to matching prompts only
- [ ] Search: type "notification" → shows notification prompts
- [ ] Search: clear → all prompts return
- [ ] Filter: click "Activities" → only activity prompts shown, button turns active
- [ ] Filter: click "All" → all prompts return, "All" button active
- [ ] Combined: filter "Bookings" + search "waitlist" → narrows correctly
- [ ] Empty state: search term with no matches shows helpful message
- [ ] Copy works on dynamically rendered prompt cards

## Admin-specific

- [ ] Notification callout box visible on admin pages
- [ ] "Notifications" filter category visible and working
- [ ] Notification prompts emphasise preview→confirm→send flow

## Super Admin-specific

- [ ] "Payment Settings" filter category visible
- [ ] Payment prompts load (Show Stripe config, Update keys)
- [ ] Role badge shows "Super Admin"

## UI & Styling

- [ ] Dark mode toggle works (switches light ↔ dark, persists on refresh)
- [ ] Brand logo and name show correctly
- [ ] Header layout correct on all pages
- [ ] Role badge visible in header
- [ ] No inline styles (inspect element to verify)
- [ ] No console errors

## Mobile Responsive

- [ ] Test at 375px (iPhone) — login card fits, no horizontal scroll
- [ ] Test at 768px (tablet) — header and content readable
- [ ] Test at 1024px+ (desktop) — full layout
- [ ] Filter tags wrap on narrow screens
- [ ] Prompt cards readable on mobile

## Accessibility

- [ ] Login form has correct autocomplete attributes
- [ ] Error message has `role="alert"`
- [ ] Buttons have descriptive text
- [ ] Theme toggle has `title` attribute
