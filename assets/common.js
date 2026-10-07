/* Shared code for every page of the guide: theme, term pop-ups, scroll effects, and the workbench map. */
(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const NS = "http://www.w3.org/2000/svg";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ---------- theme: light by default ---------- */
const root = document.documentElement;
const themeBtn = $("#themeBtn");
const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
function setTheme(t) {
  root.setAttribute("data-theme", t);
  if (themeBtn) {
    themeBtn.innerHTML = t === "dark" ? SUN : MOON;
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
  store.set("wb-theme", t);
}
setTheme(store.get("wb-theme") === "dark" ? "dark" : "light");
if (themeBtn) themeBtn.addEventListener("click", () => setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

/* ---------- terms: small pop-ups on dotted words ---------- */
const TERMS = {
  bap: ["BAP", "Buyer app. The app a customer uses to search and order."],
  bpp: ["BPP", "Seller app. The app of the business that sells."],
  ack: ["ACK", "The reply that means: received, and it passed the checks."],
  nack: ["NACK", "The reply that means: rejected. It comes with the reason."],
  l1: ["L1 rules", "The protocol's own rules for a domain and version, for example \"context.ttl must be present\". Checked by Onix."],
  l2: ["L2 check", "The flow's own check for one step, written as that step's validate() script. Run by the Mock."],
  registry: ["Registry", "ONDC's list of participants with their public keys. Onix uses it to check signatures."],
  signature: ["Signature", "A digital stamp on a message. It proves who sent it and that nobody changed it."],
  ttl: ["TTL", "Time to live. How long a message is valid."],
  session: ["Session", "One test setup: your app's URL, its role, the domain, version and use case."],
  expectation: ["Expectation", "A note in Redis: \"the next search from this app's URL belongs to this test\". Used only when your app sends first."],
  lock: ["Lock", "A flag in Redis. WORKING while the Mock is sending a message, AVAILABLE when it is done. It stops the same step from being sent twice."],
  history: ["History", "The list of messages exchanged so far in this test. The Mock reads it to find the next step."],
  notes: ["Mock notes", "Values the Mock copies from earlier messages because later steps need them."],
  txn: ["Transaction id", "One id for the whole journey, from the first message to the last."],
  msgid: ["Message id", "One id for a request and its reply. search and its on_search share it."]
};
const tip = document.createElement("div");
tip.className = "tip"; tip.setAttribute("role", "tooltip");
document.body.appendChild(tip);
function showTip(el) {
  const t = TERMS[el.dataset.t]; if (!t) return;
  tip.innerHTML = "<b>" + t[0] + "</b>" + t[1];
  tip.classList.add("show");
  const r = el.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
  let x = r.left + r.width / 2 - w / 2 + scrollX;
  x = Math.max(8 + scrollX, Math.min(x, scrollX + innerWidth - w - 8));
  let y = r.top + scrollY - h - 10;
  if (r.top < h + 80) y = r.bottom + scrollY + 10;
  tip.style.left = x + "px"; tip.style.top = y + "px";
}
function hideTip() { tip.classList.remove("show"); }
document.addEventListener("mouseover", e => { const el = e.target.closest(".term"); if (el) showTip(el); });
document.addEventListener("mouseout", e => { if (e.target.closest(".term")) hideTip(); });
document.addEventListener("focusin", e => { const el = e.target.closest(".term"); if (el) showTip(el); });
document.addEventListener("focusout", e => { if (e.target.closest(".term")) hideTip(); });
document.addEventListener("click", e => { const el = e.target.closest(".term"); if (el) { e.preventDefault(); showTip(el); setTimeout(hideTip, 3500); } });
addEventListener("scroll", hideTip, { passive: true });

/* ---------- top menu: keep the current page's tab visible on small screens ---------- */
const nav = $(".pages"), cur = nav && nav.querySelector('[aria-current="page"]');
if (nav && cur && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = Math.max(0, cur.offsetLeft - nav.offsetLeft - 24);

/* ---------- long code (URLs, paths): allow line breaks only after "/" ---------- */
function breakSlashes(rootEl) {
  (rootEl || document).querySelectorAll("code").forEach(el => {
    if (el.dataset.wb || el.children.length || el.textContent.indexOf("/") < 0) return;
    el.innerHTML = el.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\//g, "/<wbr>");
    el.dataset.wb = "1";
  });
}
breakSlashes();

/* ---------- scroll: reveal and side rail ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in");
  io.unobserve(en.target);
}), { threshold: .12 });
$$(".rv").forEach(el => io.observe(el));
const lis = $$("#rail li"), fill = $("#railFill");
const secs = lis.map(li => $(li.querySelector("a").getAttribute("href")));
function rail() {
  if (!lis.length) return;
  let cur = 0;
  secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .45) cur = i; });
  lis.forEach((li, i) => { li.classList.toggle("on", i === cur); li.classList.toggle("done", i < cur); });
  if (fill) fill.style.height = (lis[cur].offsetTop - lis[0].offsetTop) + "px";
}
addEventListener("scroll", rail, { passive: true });
rail();

/* ---------- the workbench map ----------
   Same boxes, names and lines as the architecture diagram on the Confluence page.
   Reporting Service, Praman Service and monitoring are drawn but marked "not covered". */
const VBW = 1100, VBH = 600, H = 48;
const N = {
  fe:    { x: 77,   y: 306, w: 130, g: "ctl",   name: "UI Frontend", port: ":3035 · website",
           job: "The workbench website the tester uses to create a test, start it and watch it.",
           more: ["Scenario Testing: tests from the domain's spec.", "Playground: write your own flow. It can also import flows from the automation-specifications repo."],
           talks: ["uib", "specs"] },
  uib:   { x: 196,  y: 448, w: 130, g: "ctl",   name: "UI Backend", port: ":3034",
           job: "Works for the UI Frontend. Creates the test session, starts and moves the flow, and asks for its status every few seconds.",
           more: ["Saves the session in Redis (48 hours) and a copy in DB Service.", "Gets step lists from Config Service.", "For the Playground, sends messages to Onix's /test/ door for a rules check."],
           talks: ["fe", "onix", "cfg", "mock", "db", "redis", "rep"] },
  net:   { x: 186,  y: 173, w: 130, g: "msg", out: true, name: "ONDC Network", port: "your app",
           job: "Real network participants. In a local test, this is the app under test: your buyer or seller app.",
           more: ["It sends its messages to Onix and receives the workbench's messages from Onix.", "It must reply ACK to every message it receives."],
           talks: ["onix"] },
  onix:  { x: 378,  y: 179, w: 170, g: "msg",   name: "Onix Service", port: "API service",
           job: "Checks every message from your app, signs the workbench's own messages, delivers them, and reports each one to the Transaction Recorder.",
           more: ["One container per domain and version, for example api-ondcret11-1-2-0.", "In front of it sits a small gateway (nginx, localhost:3032) that passes each message to the right Onix container by the first part of the URL path.", "It checks signatures with public keys from the ONDC Registry.", "Doors: /seller/ (your buyer app sends here), /buyer/ (your seller app sends here), /mock/ (the Mock sends here), /test/ (rules check only)."],
           talks: ["net", "mock", "rec", "uib", "specs"] },
  mock:  { x: 544,  y: 226, w: 130, g: "msg",   name: "Mock Service", port: ":3031",
           job: "Plays the other side. It reads the test's history to find the next step, then runs that step's script to build or check a message.",
           more: ["Sends its messages to Onix's /mock/ door.", "Runs scripts with mock-runner-lib.", "Gets scripts from Config Service and keeps a copy in Redis."],
           talks: ["onix", "uib", "cfg", "redis"] },
  rec:   { x: 676,  y: 158, w: 170, g: "store", name: "Transaction Recorder", port: ":8089 gRPC · :8090",
           job: "Writes every message into the test's history in Redis and frees the lock after a send.",
           more: ["Onix calls it over gRPC after each message.", "Also saves the full message to DB Service."],
           talks: ["onix", "redis", "db"] },
  cfg:   { x: 665,  y: 302, w: 140, g: "ctl",   name: "Config Service", port: ":5556",
           job: "Reads each domain's spec from DB Service and turns it into step lists for the UI and scripts for the Mock.",
           more: [], talks: ["uib", "mock", "db"] },
  db:    { x: 838,  y: 301, w: 130, g: "store", name: "DB Service", port: ":5001",
           job: "The only way into MongoDB. Stores specs, sessions and a full copy of every message.",
           more: [], talks: ["uib", "cfg", "rec", "specs", "rep", "mongo"] },
  mongo: { x: 1030, y: 301, w: 130, g: "store", name: "MongoDB", port: ":27017",
           job: "Long-term storage. Only DB Service reads and writes it.", more: [], talks: ["db"] },
  redis: { x: 955,  y: 387, w: 130, g: "store", name: "Redis Cache", port: ":6379",
           job: "Fast, short-term memory shared by the services: sessions, test history, locks, the Mock's notes and cached scripts.",
           more: ["Onix also reads and writes it, for example to find which test a message belongs to."],
           talks: ["uib", "mock", "rec", "mon"] },
  specs: { x: 672,  y: 64,  w: 210, g: "store", out: true, name: "automation-specifications", port: "Git",
           job: "The spec repo. One branch per domain and version: message shapes, rules and flows.",
           more: ["At build time it is turned into an Onix container and pushed to DB Service."],
           talks: ["onix", "db", "fe"] },
  rep:   { x: 390,  y: 531, w: 150, g: "skip",  name: "Reporting Service", port: "not covered here",
           job: "Builds test reports. Not covered in this guide.", more: [], talks: ["uib", "db", "pra"] },
  pra:   { x: 560,  y: 545, w: 140, g: "skip",  name: "Praman Service", port: "not covered here",
           job: "Report checks for some domains. Not covered in this guide.", more: [], talks: ["rep"] },
  mon:   { x: 720,  y: 545, w: 150, g: "skip",  name: "monitoring", port: "not covered here",
           job: "Six monitoring services and stores. Not covered in this guide.", more: [], talks: ["redis"] }
};
// [id, from, to, group, path, dashed?, label?]
const E = [
  ["fe-specs",  "fe",   "specs", "ctl",   "M77,282 V64 H567"],
  ["fe-uib",    "fe",   "uib",   "ctl",   "M77,330 V448 H131"],
  ["net-onix",  "net",  "onix",  "msg",   "M251,163 H293"],
  ["onix-net",  "onix", "net",   "msg",   "M293,186 H251"],
  ["uib-onix",  "uib",  "onix",  "ctl",   "M261,436 H274 V196 H293"],
  ["onix-rec",  "onix", "rec",   "msg",   "M463,163 H591", false, "grpc"],
  ["onix-specs","onix", "specs", "store", "M430,155 V112 H660 V88", true, "git"],
  ["onix-mock", "onix", "mock",  "msg",   "M440,203 V216 H479"],
  ["mock-onix", "mock", "onix",  "msg",   "M479,238 H410 V203"],
  ["uib-mock",  "uib",  "mock",  "ctl",   "M261,456 H530 V250"],
  ["uib-cfg",   "uib",  "cfg",   "ctl",   "M261,440 H285 V302 H595"],
  ["uib-db",    "uib",  "db",    "ctl",   "M261,464 H800 V325"],
  ["uib-rep",   "uib",  "rep",   "skip",  "M196,472 V531 H315"],
  ["uib-redis", "uib",  "redis", "store", "M226,472 V590 H955 V411", false, "redis"],
  ["mock-cfg",  "mock", "cfg",   "ctl",   "M609,236 H640 V278"],
  ["mock-redis","mock", "redis", "store", "M609,214 H930 V363", false, "redis"],
  ["rec-redis", "rec",  "redis", "store", "M761,150 H945 V363", false, "redis"],
  ["rec-db",    "rec",  "db",    "store", "M761,172 H790 V277"],
  ["specs-db",  "specs","db",    "store", "M777,52 H860 V277"],
  ["cfg-db",    "cfg",  "db",    "store", "M735,302 H773"],
  ["db-mongo",  "db",   "mongo", "store", "M903,301 H965", false, "mongo"],
  ["rep-db",    "rep",  "db",    "skip",  "M465,515 H815 V325"],
  ["rep-pra",   "rep",  "pra",   "skip",  "M465,545 H490"],
  ["mon-redis", "mon",  "redis", "skip",  "M795,545 H920 V411", false, "redis"]
];

function mountMap(svg) {
  const gE = document.createElementNS(NS, "g"), gN = document.createElementNS(NS, "g"), gL = document.createElementNS(NS, "g");
  svg.setAttribute("viewBox", "0 0 " + VBW + " " + VBH);
  svg.innerHTML = "";
  svg.appendChild(gE); svg.appendChild(gL); svg.appendChild(gN);
  const pkt = document.createElementNS(NS, "circle");
  pkt.setAttribute("class", "pkt"); pkt.setAttribute("r", "8"); pkt.setAttribute("cx", "-50"); pkt.setAttribute("cy", "-50");
  svg.appendChild(pkt);
  const edgeEl = {}, nodeEl = {};
  E.forEach(([id, a, b, g, d, dash, label]) => {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d); p.setAttribute("class", "edge e-" + g + (dash ? " dash" : ""));
    p.dataset.id = id; p.dataset.a = a; p.dataset.b = b;
    gE.appendChild(p); edgeEl[id] = p;
    if (label) {
      const t = document.createElementNS(NS, "text");
      t.setAttribute("class", "elabel"); t.dataset.for = id;
      t.textContent = label;
      gL.appendChild(t);
    }
  });
  Object.entries(N).forEach(([id, n]) => {
    const w = n.w || 130, g = document.createElementNS(NS, "g");
    g.setAttribute("class", "node g-" + n.g + (n.out ? " g-out" : ""));
    g.dataset.id = id;
    g.innerHTML = '<rect x="' + (n.x - w / 2) + '" y="' + (n.y - H / 2) + '" width="' + w + '" height="' + H + '" rx="12"/>' +
      '<text class="nm" x="' + n.x + '" y="' + (n.y - 3) + '" text-anchor="middle">' + n.name + "</text>" +
      '<text class="pt" x="' + n.x + '" y="' + (n.y + 14) + '" text-anchor="middle">' + n.port + "</text>";
    gN.appendChild(g); nodeEl[id] = g;
  });
  // place edge labels at the middle of their line (needs the path in the DOM)
  requestAnimationFrame(() => {
    gL.querySelectorAll(".elabel").forEach(t => {
      const p = edgeEl[t.dataset.for], L = p.getTotalLength(), m = p.getPointAtLength(L / 2);
      t.setAttribute("x", m.x); t.setAttribute("y", m.y - 6); t.setAttribute("text-anchor", "middle");
    });
  });
  let token = 0, camToken = 0;
  const labels = () => gL.querySelectorAll(".elabel");
  const api = {
    svg, gN, edgeEl, nodeEl, pkt,
    clear() {
      Object.values(nodeEl).forEach(n => n.classList.remove("sel", "dim"));
      Object.values(edgeEl).forEach(e => e.classList.remove("hot", "dim", "flow"));
      labels().forEach(t => t.classList.remove("dim"));
    },
    // a step: ["edgeId", reverse?, answerColour?] moves a dot along a line; ["@nodeId"] only lights up a box
    showMoves(moves) {
      api.clear();
      const used = new Set(api.usedNodes(moves));
      moves.forEach(([id]) => { if (id[0] !== "@") edgeEl[id].classList.add("hot"); });
      Object.values(edgeEl).forEach(e => { if (!e.classList.contains("hot")) e.classList.add("dim"); });
      labels().forEach(t => t.classList.toggle("dim", !edgeEl[t.dataset.for].classList.contains("hot")));
      Object.keys(nodeEl).forEach(k => nodeEl[k].classList.toggle("dim", !used.has(k)));
      api.animate(moves.filter(([id]) => id[0] !== "@"));
    },
    stop() { token++; pkt.setAttribute("cx", -50); },
    focus(ids, minW = 560) {
      const pts = ids.map(id => N[id]).filter(Boolean);
      if (!pts.length) return;
      let x0 = Math.min(...pts.map(n => n.x - (n.w || 130) / 2)) - 40, x1 = Math.max(...pts.map(n => n.x + (n.w || 130) / 2)) + 40;
      let y0 = Math.min(...pts.map(n => n.y)) - H / 2 - 50, y1 = Math.max(...pts.map(n => n.y)) + H / 2 + 50;
      const ratio = VBH / VBW;
      let w = Math.max(minW, x1 - x0), h = Math.max(w * ratio, y1 - y0); w = Math.max(w, h / ratio);
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const tx = Math.min(Math.max(0, cx - w / 2), Math.max(0, VBW - w)), ty = Math.min(Math.max(0, cy - h / 2), Math.max(0, VBH - h));
      const to = [tx, ty, Math.min(w, VBW), Math.min(h, VBH)];
      const from = (svg.getAttribute("viewBox") || ("0 0 " + VBW + " " + VBH)).split(/\s+/).map(Number);
      if (reduced) { svg.setAttribute("viewBox", to.join(" ")); return; }
      const my = ++camToken, t0 = performance.now();
      (function f(t) {
        if (my !== camToken) return;
        const p = Math.min(1, (t - t0) / 600), e = 1 - Math.pow(1 - p, 3);
        svg.setAttribute("viewBox", from.map((v, i) => (v + (to[i] - v) * e).toFixed(1)).join(" "));
        if (p < 1) requestAnimationFrame(f);
      })(t0);
    },
    usedNodes(moves) {
      const u = new Set();
      moves.forEach(([id]) => {
        if (id[0] === "@") { u.add(id.slice(1)); return; }
        u.add(edgeEl[id].dataset.a); u.add(edgeEl[id].dataset.b);
      });
      return [...u];
    },
    animate(moves) {
      const my = ++token;
      if (reduced || !moves.length) { pkt.setAttribute("cx", -50); return; }
      let i = 0;
      const run = () => {
        if (my !== token) return;
        if (i >= moves.length) { setTimeout(() => { if (my === token) pkt.style.opacity = 0; }, 500); return; }
        const [id, rev, back] = moves[i++];
        const path = edgeEl[id], len = path.getTotalLength();
        pkt.classList.toggle("back", !!back); pkt.style.opacity = 1;
        const dur = Math.max(450, len * 2.4), t0 = performance.now();
        (function f(t) {
          if (my !== token) return;
          const p = Math.min(1, (t - t0) / dur), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          const pt = path.getPointAtLength((rev ? 1 - e : e) * len);
          pkt.setAttribute("cx", pt.x); pkt.setAttribute("cy", pt.y);
          if (p < 1) requestAnimationFrame(f); else run();
        })(t0);
      };
      run();
    }
  };
  return api;
}

/* ---------- small JSON viewer ---------- */
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function jsonHTML(v) {
  const txt = JSON.stringify(v, null, 2);
  return esc(txt)
    .replace(/(&quot;|")((?:\\.|[^"\\])*)("\s*:)/g, '<span class="jk">"$2"</span>:')
    .replace(/:\s"((?:\\.|[^"\\])*)"/g, ': <span class="js">"$1"</span>')
    .replace(/^(\s*)"((?:\\.|[^"\\])*)"(,?)$/gm, '$1<span class="js">"$2"</span>$3')
    .replace(/:\s(-?\d[\d.eE+-]*|true|false|null)/g, ': <span class="jn">$1</span>');
}

window.WB = { $, $$, store, reduced, N, E, mountMap, esc, jsonHTML, breakSlashes };
})();
