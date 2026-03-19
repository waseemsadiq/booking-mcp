/* =========================================================
   WFCS Booking — Claude Agent Onboarding
   Shared JS: auth, theme toggle, prompt rendering
   ========================================================= */

// Determine booking API base URL.
// On localhost, Galvani runs at port 8080 under /booking.
// On production, the placeholder below is substituted at deploy time by the
// GitHub Actions workflow using the BOOKING_API_URL repository secret.
const API_BASE = (function () {
  // 1. Check if we are on localhost
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:8080/booking";
  }

  // 2. Check if the placeholder was substituted
  const placeholder = "__BOOKING_API_URL__";
  if (placeholder !== "" && !placeholder.startsWith("__")) {
    return placeholder;
  }

  // 3. Fallback to live URL
  return "https://booking.wfcs.co.uk";
})();

// Role → relative path from site root
const ROLE_MAP = {
  customer: "customer/",
  instructor: "instructor/",
  admin: "admin/",
  super_admin: "super-admin/",
};

/* ── Theme toggle ──────────────────────────────────────── */
(function initTheme() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var lbl = btn.querySelector(".theme-label");

  // Sync label with whatever theme was set by the inline script in <head>
  var initial = document.documentElement.getAttribute("data-theme");
  if (lbl) lbl.textContent = initial === "dark" ? "Light" : "Dark";

  btn.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("wfcs-docs-theme", next);
    } catch (e) {}
    if (lbl) lbl.textContent = next === "dark" ? "Light" : "Dark";
  });
})();

/* ── Token helpers ─────────────────────────────────────── */
function saveToken(token) {
  try {
    localStorage.setItem("wfcs_agent_token", token);
  } catch (e) {}
}

function loadToken() {
  try {
    return localStorage.getItem("wfcs_agent_token");
  } catch (e) {
    return null;
  }
}

function clearToken() {
  try {
    localStorage.removeItem("wfcs_agent_token");
  } catch (e) {}
}

/* ── Logout (callable from all pages) ──────────────────── */
function logout() {
  clearToken();
  // Navigate back to site root (works whether served from root or subfolder)
  var path = window.location.pathname;
  // Find depth: count segments after the first slash
  var segments = path.replace(/\/$/, "").split("/").filter(Boolean);
  // booking-mcp-docs root is the first segment on localhost,
  // and the actual root on GitHub Pages. Go back to index.html.
  var ups = "";
  // Detect how deep we are inside the site
  // e.g. /booking/mcp/booking-mcp-docs/customer/  → need ../../ from customer/index.html
  // We detect depth by looking for known role folders
  var inRole = /\/(customer|instructor|admin|super-admin)\/?/.test(path);
  if (inRole) {
    ups = "../";
  }
  window.location.href = ups + "index.html";
}

/* ── Site-root resolver (relative from current page) ───── */
function siteRoot() {
  var path = window.location.pathname;
  var inRole = /\/(customer|instructor|admin|super-admin)\/?/.test(path);
  return inRole ? "../" : "";
}

/* ── Login form (index.html only) ──────────────────────── */
(function initLoginForm() {
  var form = document.getElementById("login-form");
  if (!form) return;

  // If already logged in, redirect immediately
  var existing = loadToken();
  if (existing) {
    verifyAndRedirect(existing);
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    handleLogin();
  });
})();

/* ── CSRF helper ───────────────────────────────────────── */
function getCsrfToken() {
  var name = "csrf_token=";
  var decodedCookie = decodeURIComponent(document.cookie);
  for (var cookie of decodedCookie.split(";")) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return "";
}

async function ensureCsrfToken() {
  if (!getCsrfToken()) {
    // Fetch the booking app to set the csrf_token cookie (same origin, no CORS issue)
    try {
      await fetch(API_BASE + "/", { credentials: "include" });
    } catch (e) {}
  }
}

async function handleLogin() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var btn = document.getElementById("submit-btn");
  var errEl = document.getElementById("error-message");

  btn.disabled = true;
  btn.textContent = "Logging in…";
  errEl.classList.add("hidden");

  try {
    // Ensure we have a CSRF cookie (set by visiting the booking app)
    await ensureCsrfToken();
    var csrfToken = getCsrfToken();

    var response = await fetch(API_BASE + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
        _csrf_token: csrfToken,
      }),
    });

    var data = await response.json();

    if (!response.ok) {
      // jsonError() returns {error: true, message: "..."} — use message, not error
      throw new Error(data.message || "Invalid email or password");
    }

    saveToken(data.token);
    verifyAndRedirect(data.token);
  } catch (err) {
    errEl.textContent = err.message || "Login failed. Please try again.";
    errEl.classList.remove("hidden");
    btn.disabled = false;
    btn.textContent = "Log in";
  }
}

async function verifyAndRedirect(token) {
  try {
    var response = await fetch(API_BASE + "/api/auth/verify-token", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Token invalid");

    var data = await response.json();
    var role = data.user ? data.user.role : data.role;

    if (!role) throw new Error("No role in token response");

    var target = ROLE_MAP[role] || ROLE_MAP["customer"];
    window.location.href = target;
  } catch (err) {
    clearToken();
    // Re-enable login form if present
    var btn = document.getElementById("submit-btn");
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Log in";
    }
    var errEl = document.getElementById("error-message");
    if (errEl) {
      errEl.textContent = "Session expired. Please log in again.";
      errEl.classList.remove("hidden");
    }
  }
}

/* ── Auth guard (role pages) ───────────────────────────── */
// Call this on each role page to ensure the user is logged in
async function requireAuth(expectedRole) {
  var token = loadToken();
  if (!token) {
    window.location.href = siteRoot() + "index.html";
    return null;
  }

  try {
    var response = await fetch(API_BASE + "/api/auth/verify-token", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (!response.ok) throw new Error("Invalid token");

    var data = await response.json();
    var role = data.user ? data.user.role : data.role;
    var name = data.user
      ? (data.user.first_name + " " + data.user.last_name).trim()
      : data.first_name
        ? data.first_name + " " + data.last_name
        : "";
    var isGlobalInstructor = !!(data.user && data.user.is_global_instructor);
    var isInstructor = role === "instructor" || isGlobalInstructor;

    // Update role badge
    var badge = document.getElementById("role-badge");
    if (badge) badge.textContent = roleLabel(role);

    // Update user name if element exists
    var nameEl = document.getElementById("user-name");
    if (nameEl && name) nameEl.textContent = name;

    return { role: role, name: name, token: token, isInstructor: isInstructor };
  } catch (err) {
    clearToken();
    window.location.href = siteRoot() + "index.html";
    return null;
  }
}

function roleLabel(role) {
  var labels = {
    customer: "Customer",
    instructor: "Instructor",
    admin: "Admin",
    super_admin: "Super Admin",
  };
  return labels[role] || role;
}

/* ── Copy-to-clipboard ─────────────────────────────────── */
function copyPrompt(text, btn) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      var original = btn.textContent;
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 2000);
    })
    .catch(function () {
      btn.textContent = "Failed";
      setTimeout(function () {
        btn.textContent = "Copy";
      }, 1500);
    });
}

/* ── Prompt rendering (prompts.html pages) ─────────────── */
var currentFilter = "all";
var activeSections = [];

function getSectionsForRole(role, isInstructor) {
  var sections = [];
  if (role === "super_admin") {
    sections.push({ key: "super-admin", label: "Super Admin prompts" });
  }
  if (role === "super_admin" || role === "admin") {
    sections.push({ key: "admin", label: "Admin prompts" });
  }
  // super_admin always sees instructor prompts; so do instructors and admin+instructor combos
  if (role === "super_admin" || role === "instructor" || isInstructor) {
    sections.push({ key: "instructor", label: "Instructor prompts" });
  }
  sections.push({ key: "customer", label: "Customer prompts" });
  return sections;
}

function buildFilterChips() {
  var container = document.querySelector(".filter-tags");
  if (!container || !activeSections.length) return;

  // Collect unique categories in order across all active sections
  var seen = Object.create(null);
  var categories = [];
  activeSections.forEach(function (section) {
    var prompts = promptsDatabase[section.key];
    if (!prompts) return;
    Object.keys(prompts).forEach(function (cat) {
      if (!seen[cat]) {
        seen[cat] = true;
        categories.push(cat);
      }
    });
  });

  container.replaceChildren();

  var allBtn = document.createElement("button");
  allBtn.className = "filter-tag active";
  allBtn.type = "button";
  allBtn.textContent = "All";
  allBtn.addEventListener("click", function () {
    filterByCategory("all", allBtn);
  });
  container.appendChild(allBtn);

  categories.forEach(function (cat) {
    var btn = document.createElement("button");
    btn.className = "filter-tag";
    btn.type = "button";
    btn.textContent = categoryLabel(cat);
    btn.addEventListener("click", function () {
      filterByCategory(cat, btn);
    });
    container.appendChild(btn);
  });
}

function filterByCategory(category, clickedBtn) {
  currentFilter = category;
  document.querySelectorAll(".filter-tag").forEach(function (tag) {
    tag.classList.remove("active");
  });
  if (clickedBtn) clickedBtn.classList.add("active");
  renderPrompts();
}

var DIFFICULTY_ORDER = { easy: 0, intermediate: 1, advanced: 2 };

function sortByDifficulty(arr) {
  return arr.slice().sort(function (a, b) {
    return (DIFFICULTY_ORDER[a.difficulty] || 0) - (DIFFICULTY_ORDER[b.difficulty] || 0);
  });
}

function renderQuickStart(sections, limit) {
  var container = document.getElementById("quick-start-grid");
  if (!container) return;

  // Collect all prompts across all accessible sections
  var all = [];
  sections.forEach(function (section) {
    var prompts = promptsDatabase[section.key];
    if (!prompts) return;
    Object.keys(prompts).forEach(function (category) {
      prompts[category].forEach(function (prompt) {
        all.push({ text: prompt.text, difficulty: prompt.difficulty, category: category });
      });
    });
  });

  // Fisher-Yates shuffle for variety, then sort easy → advanced
  for (var i = all.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = all[i]; all[i] = all[j]; all[j] = tmp;
  }
  var selected = sortByDifficulty(all.slice(0, limit || 12));

  var grid = document.createElement("div");
  grid.className = "prompts-grid";
  selected.forEach(function (prompt) {
    grid.appendChild(buildPromptCard(prompt));
  });
  container.replaceChildren(grid);
}

function renderPrompts() {
  var container = document.getElementById("prompts-container");
  if (!container || !activeSections.length) return;

  var searchTerm = "";
  var searchEl = document.getElementById("prompt-search");
  if (searchEl) searchTerm = searchEl.value.toLowerCase();

  container.replaceChildren();

  var hasResults = false;

  activeSections.forEach(function (section) {
    var prompts = promptsDatabase[section.key];
    if (!prompts) return;

    var results = [];
    Object.keys(prompts).forEach(function (category) {
      if (currentFilter !== "all" && currentFilter !== category) return;
      prompts[category].forEach(function (prompt) {
        if (!searchTerm || prompt.text.toLowerCase().includes(searchTerm)) {
          results.push({
            text: prompt.text,
            difficulty: prompt.difficulty,
            category: category,
          });
        }
      });
    });

    if (results.length === 0) return;
    hasResults = true;

    results = sortByDifficulty(results);

    var sectionEl = document.createElement("div");
    sectionEl.className = "prompt-section";

    var titleEl = document.createElement("h2");
    titleEl.className = "prompt-section-title";
    titleEl.textContent = section.label;
    sectionEl.appendChild(titleEl);

    var grid = document.createElement("div");
    grid.className = "prompts-grid";
    results.forEach(function (prompt) {
      grid.appendChild(buildPromptCard(prompt));
    });
    sectionEl.appendChild(grid);
    container.appendChild(sectionEl);
  });

  if (!hasResults) {
    var empty = document.createElement("p");
    empty.className = "prompts-empty";
    empty.textContent =
      "No prompts found. Try a different search term or filter.";
    container.appendChild(empty);
  }
}

function buildPromptCard(prompt) {
  var card = document.createElement("div");
  card.className = "prompt-card";

  // Meta row: difficulty badge + category
  var meta = document.createElement("div");
  meta.className = "prompt-card-meta";

  var badge = document.createElement("span");
  badge.className = "difficulty-badge " + prompt.difficulty;
  badge.textContent = difficultyLabel(prompt.difficulty);
  meta.appendChild(badge);

  if (prompt.category) {
    var cat = document.createElement("span");
    cat.className = "category-label";
    cat.textContent = categoryLabel(prompt.category);
    meta.appendChild(cat);
  }
  card.appendChild(meta);

  // Prompt text block
  var code = document.createElement("span");
  code.className = "prompt-text";
  code.textContent = prompt.text;
  card.appendChild(code);

  // Copy button
  var btn = document.createElement("button");
  btn.className = "copy-button";
  btn.type = "button";
  btn.textContent = "Copy";
  var capturedText = prompt.text;
  btn.addEventListener("click", function () {
    copyPrompt(capturedText, btn);
  });
  card.appendChild(btn);

  return card;
}

function difficultyLabel(d) {
  return (
    { easy: "Easy", intermediate: "Intermediate", advanced: "Advanced" }[d] || d
  );
}

function categoryLabel(cat) {
  var labels = {
    activities: "Activities",
    bookings: "Bookings",
    participants: "Participants",
    credit: "Credit",
    "gift-aid": "Gift Aid",
    profile: "Profile",
    sessions: "Sessions",
    attendance: "Attendance",
    statistics: "Statistics",
    venues: "Venues & Spaces",
    users: "Users",
    reports: "Reports",
    withdrawals: "Withdrawals",
    notifications: "Notifications",
    payments: "Payment Settings",
  };
  return labels[cat] || cat;
}
