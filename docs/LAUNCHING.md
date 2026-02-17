# Launch Checklist

## GitHub Repo Setup (one-time)

1. Create a new **public** GitHub repo: `waseemsadiq/booking-mcp-docs` (or org equivalent)
2. Add remote and push:
   ```bash
   git remote add origin git@github.com:waseemsadiq/booking-mcp-docs.git
   git push -u origin master
   ```
3. In repo Settings → Pages:
   - Source: **GitHub Actions**
   - Custom domain: `booking-docs.wellfoundation.org.uk`
   - Enforce HTTPS: ✓
4. In Cloudflare DNS: add CNAME `booking-docs` → `waseemsadiq.github.io`
5. Verify: `https://booking-docs.wellfoundation.org.uk/` loads the login page

---

## Pre-Launch (1–2 days before)

- [ ] All items in TESTING.md passing locally
- [ ] All 4 role paths tested with test accounts
- [ ] Prompts reviewed against latest `sample-mcp-prompts.md`
- [ ] Claude agent URL/project finalised and tested
- [ ] Demo to Waseem and admin team

---

## Launch Day

- [ ] Push all code to main/master branch
- [ ] Verify GitHub Actions deploy completes (Actions tab → green tick)
- [ ] Test login at `https://booking-docs.wellfoundation.org.uk/`
- [ ] Test all 4 role paths with real accounts
- [ ] Announce to users: "Your Claude agent is ready — visit [URL] to get started"

---

## Post-Launch

- [ ] Monitor console errors in first week (ask users to report issues)
- [ ] Collect feedback: which prompts are most useful? What's missing?
- [ ] Update `assets/prompts-data.js` with any new prompts — deploy automatically on push
- [ ] Review usage after 2 weeks

---

## Updating Prompts

All prompts are in `assets/prompts-data.js`. To add or update:

1. Edit the relevant category array
2. Commit and push — GitHub Pages deploys automatically
3. No restart or rebuild needed (it's a static site)
