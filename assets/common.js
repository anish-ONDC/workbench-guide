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

/* ---------- the workbench map ---------- */
const W = 136, H = 50;
const N = {
  you:   { x: 82,  y: 90,  g: "ctl",   out: true, name: "You", port: "in a browser",
           job: "The person running the test.", more: [], talks: ["ui"] },
  ui:    { x: 250, y: 90,  g: "ctl",   name: "Website", port: ":3035",
           job: "The pages you use to start a test and watch it.", more: ["Scenario Testing: tests from the domain's spec.", "Playground: write your own flow."], talks: ["you", "uib"] },
  uib:   { x: 410, y: 90,  g: "ctl",   name: "UI Backend", port: ":3034",
           job: "Works for the website. Creates the test session, starts and moves the flow, and asks for its status every few seconds.",
           more: ["Saves the session in Redis (48 hours) and a copy in DB Service.", "Gets step lists from Config Service.", "For the Playground, sends messages to Onix's /test/ door for a rules check."], talks: ["ui", "cfg", "mock", "redis", "gw"] },
  cfg:   { x: 570, y: 90,  g: "ctl",   name: "Config Service", port: ":5556",
           job: "Reads each domain's spec from DB Service and turns it into step lists for the website and scripts for the Mock.", more: [], talks: ["uib", "db", "mock"] },
  db:    { x: 740, y: 90,  g: "store", name: "DB Service", port: ":5001",
           job: "The only way into MongoDB.", more: ["Stores specs, sessions and a full copy of every message.", "The Recorder sends it full messages; UI Backend sends it sessions."], talks: ["cfg", "mongo", "spec"] },
  mongo: { x: 905, y: 90,  g: "store", name: "MongoDB", port: ":27017",
           job: "Long-term storage. Only DB Service reads and writes it.", more: [], talks: ["db"] },
  app:   { x: 82,  y: 290, g: "msg",   out: true, name: "Your app", port: "buyer or seller",
           job: "The app being tested. It only talks to the gateway.", more: ["It must reply ACK to every message it receives."], talks: ["gw"] },
  gw:    { x: 250, y: 290, g: "msg",   name: "Gateway", port: ":3032 · nginx",
           job: "The single address for every message. It reads the first part of the URL path and passes the message to the right Onix container.",
           more: ["Example: /api-service/ONDC:RET11/1.2.0/… goes to the RET11 1.2.0 container.", "It does not open or check the message."], talks: ["app", "onix", "mock", "uib"] },
  onix:  { x: 410, y: 290, g: "msg",   name: "Onix", port: "API service",
           job: "The API service. One container per domain and version. Checks every message from your app, signs the workbench's own messages, delivers them, and reports each one to the Recorder.",
           more: ["Example container: api-ondcret11-1-2-0 (port 7039 inside Docker).", "Door /seller/: your buyer app sends here.", "Door /buyer/: your seller app sends here.", "Door /mock/: the Mock sends here.", "Door /test/: rules check only, used by the Playground."],
           talks: ["gw", "mock", "rec", "redis", "reg"] },
  mock:  { x: 570, y: 290, g: "msg",   name: "Mock", port: ":3031",
           job: "Plays the other side. It reads the test's history to find the next step, then runs that step's script to build or check a message.",
           more: ["Sends its messages through the gateway to Onix's /mock/ door.", "Runs scripts with mock-runner-lib.", "Gets scripts from Config Service and keeps a copy in Redis."], talks: ["uib", "onix", "gw", "redis", "cfg"] },
  redis: { x: 740, y: 290, g: "store", name: "Redis", port: ":6379",
           job: "Fast, short-term memory shared by all parts.", more: ["Holds sessions, test history, locks, the Mock's notes and cached scripts."], talks: ["uib", "onix", "mock", "rec"] },
  spec:  { x: 905, y: 290, g: "store", out: true, name: "Spec repo", port: "Git",
           job: "The automation-specifications repo. One branch per domain and version: message shapes, rules and flows.",
           more: ["At build time it is turned into an Onix container and pushed to DB Service."], talks: ["db"] },
  reg:   { x: 250, y: 450, g: "msg",   out: true, name: "ONDC Registry", port: "outside",
           job: "ONDC's list of participants and their public keys.", more: ["Onix looks up your app's key here to check your signature.", "By default the workbench uses the pre-production registry."], talks: ["onix"] },
  rec:   { x: 570, y: 450, g: "store", name: "Recorder", port: ":8089 gRPC · :8090",
           job: "Writes every message into the test's history and frees the lock after a send.",
           more: ["Onix calls it after each message.", "Also saves the full message to DB Service."], talks: ["onix", "redis", "db"] }
};
const E = [
  ["you-ui",   "you", "ui",  "ctl",   "M150,90 H182"],
  ["ui-uib",   "ui",  "uib", "ctl",   "M318,90 H342"],
  ["uib-cfg",  "uib", "cfg", "ctl",   "M478,90 H502"],
  ["cfg-db",   "cfg", "db",  "store", "M638,90 H672"],
  ["db-mongo", "db",  "mongo","store", "M808,90 H837"],
  ["uib-mock", "uib", "mock","ctl",   "M425,115 V195 H550 V265"],
  ["uib-redis","uib", "redis","ctl",  "M450,115 V165 H725 V265"],
  ["mock-cfg", "mock","cfg", "ctl",   "M605,265 V115"],
  ["uib-gw",   "uib", "gw",  "ctl",   "M395,115 V210 H235 V265"],
  ["app-gw",   "app", "gw",  "msg",   "M150,290 H182"],
  ["gw-onix",  "gw",  "onix","msg",   "M318,290 H342"],
  ["onix-mock","onix","mock","msg",   "M478,290 H502"],
  ["mock-gw",  "mock","gw",  "msg",   "M525,265 V230 H265 V265"],
  ["mock-redis","mock","redis","store","M638,290 H672"],
  ["onix-reg", "onix","reg", "msg",   "M380,315 V375 H250 V425", true],
  ["onix-rec", "onix","rec", "msg",   "M430,315 V450 H502"],
  ["onix-redis","onix","redis","store","M455,315 V395 H720 V315"],
  ["rec-redis","rec", "redis","store","M638,450 H748 V315"],
  ["spec-db",  "spec","db",  "store", "M905,265 V150 H770 V115", true]
];

function mountMap(svg) {
  const gE = document.createElementNS(NS, "g"), gN = document.createElementNS(NS, "g");
  svg.innerHTML =
    '<rect class="zone" x="6" y="18" width="152" height="490" rx="14"/><text class="zone-t" x="18" y="40">OUTSIDE</text>' +
    '<rect class="zone" x="170" y="18" width="808" height="490" rx="14"/><text class="zone-t" x="184" y="40">THE WORKBENCH (DOCKER)</text>';
  svg.appendChild(gE); svg.appendChild(gN);
  const pkt = document.createElementNS(NS, "circle");
  pkt.setAttribute("class", "pkt"); pkt.setAttribute("r", "8"); pkt.setAttribute("cx", "-50"); pkt.setAttribute("cy", "-50");
  svg.appendChild(pkt);
  const edgeEl = {}, nodeEl = {};
  E.forEach(([id, a, b, g, d, dash]) => {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d); p.setAttribute("class", "edge e-" + g + (dash ? " dash" : ""));
    p.dataset.id = id; p.dataset.a = a; p.dataset.b = b;
    gE.appendChild(p); edgeEl[id] = p;
  });
  Object.entries(N).forEach(([id, n]) => {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "node g-" + n.g + (n.out ? " g-out" : ""));
    g.dataset.id = id;
    g.innerHTML = '<rect x="' + (n.x - W / 2) + '" y="' + (n.y - H / 2) + '" width="' + W + '" height="' + H + '" rx="12"/>' +
      '<text class="nm" x="' + n.x + '" y="' + (n.y - 3) + '" text-anchor="middle">' + n.name + "</text>" +
      '<text class="pt" x="' + n.x + '" y="' + (n.y + 14) + '" text-anchor="middle">' + n.port + "</text>";
    gN.appendChild(g); nodeEl[id] = g;
  });
  let token = 0, camToken = 0;
  const api = {
    svg, gN, edgeEl, nodeEl, pkt,
    clear() {
      Object.values(nodeEl).forEach(n => n.classList.remove("sel", "dim"));
      Object.values(edgeEl).forEach(e => e.classList.remove("hot", "dim", "flow"));
    },
    // show only the edges of a step, dim the rest, and run the dot along them
    showMoves(moves) {
      api.clear();
      const used = new Set();
      moves.forEach(([id]) => { edgeEl[id].classList.add("hot"); used.add(edgeEl[id].dataset.a); used.add(edgeEl[id].dataset.b); });
      Object.values(edgeEl).forEach(e => { if (!e.classList.contains("hot")) e.classList.add("dim"); });
      Object.keys(nodeEl).forEach(k => nodeEl[k].classList.toggle("dim", !used.has(k)));
      api.animate(moves);
    },
    stop() { token++; pkt.setAttribute("cx", -50); },
    // move the "camera" (viewBox) so the given parts fill the view
    focus(ids, minW = 560) {
      const pts = ids.map(id => N[id]).filter(Boolean);
      if (!pts.length) return;
      let x0 = Math.min(...pts.map(n => n.x)) - W / 2 - 40, x1 = Math.max(...pts.map(n => n.x)) + W / 2 + 40;
      let y0 = Math.min(...pts.map(n => n.y)) - H / 2 - 50, y1 = Math.max(...pts.map(n => n.y)) + H / 2 + 50;
      const ratio = 520 / 985;
      let w = Math.max(minW, x1 - x0), h = Math.max(w * ratio, y1 - y0); w = Math.max(w, h / ratio);
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      let tx = Math.min(Math.max(0, cx - w / 2), Math.max(0, 985 - w)), ty = Math.min(Math.max(0, cy - h / 2), Math.max(0, 520 - h));
      const to = [tx, ty, Math.min(w, 985), Math.min(h, 520)];
      const from = (svg.getAttribute("viewBox") || "0 0 985 520").split(/\s+/).map(Number);
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
      moves.forEach(([id]) => { u.add(edgeEl[id].dataset.a); u.add(edgeEl[id].dataset.b); });
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
