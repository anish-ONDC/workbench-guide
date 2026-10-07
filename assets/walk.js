/* Step-by-step player shared by the buyer and seller pages.
   A page sets window.WALK = { phases, steps, done } before loading this file.
   step: { who: "you"|"app"|"wb", title, lines: [html], m: [[edgeId, reverse?, answerColour?]], mem: {row: value}, d: [[tabLabel, value, caption?]] } */
(() => {
"use strict";
const { $, $$, esc, jsonHTML, mountMap } = WB;
const { phases: PHASES, steps: STEPS, done } = window.WALK;

const WHO = { you: ["you", "You"], app: ["app", "Your app"], wb: ["wb", "The workbench"] };
const MEMROWS = window.WALK.memRows || [["session", "Session"], ["exp", "Expectation"], ["hist", "History"], ["notes", "Mock notes"], ["lock", "Lock"]];
const memAt = [];
STEPS.reduce((acc, s, i) => { const n = Object.assign({}, acc, s.mem || {}); memAt[i] = n; return n; }, {});

const map = mountMap($("#mapSvg"));
let step = 0, playing = false, timer = 0, tab = 0;

$("#phases").innerHTML = PHASES.map((p, i) => '<button type="button" class="phase" data-p="' + i + '"><b>' + p.name + "</b><small>" +
  (p.to > p.from ? "Steps " + (p.from + 1) + "–" + (p.to + 1) : "Step " + (p.from + 1)) + '</small><span class="pbar"></span></button>').join("");
if (done && $("#statusRow")) $("#statusRow").innerHTML = done.map(s => "<span>" + s.actionId + ": " + s.status + ", " + s.subStatus + "</span>").join("");

function lockHTML(v) { return v === "W" ? '<span class="lockchip w">WORKING</span>' : v === "A" ? '<span class="lockchip a">AVAILABLE</span>' : v; }
function renderMem(i) {
  const now = memAt[i], before = i ? memAt[i - 1] : {};
  $("#mem").innerHTML = MEMROWS.map(([k, label]) => {
    const v = now[k], changed = v !== undefined && v !== before[k];
    return '<div class="mrow' + (changed ? " chg" : "") + '"><span class="mk">' + label + '</span><span class="mv' + (v ? "" : " none") + '">' +
      (v ? lockHTML(v) : (k === "lock" ? "not set" : "nothing yet")) + "</span></div>";
  }).join("");
}
function renderData(s) {
  if (!s.d || !s.d.length) { $("#sData").innerHTML = ""; return; }
  if (tab >= s.d.length) tab = 0;
  const [, val, cap] = s.d[tab];
  const body = typeof val === "string" ? esc(val) : jsonHTML(val);
  $("#sData").innerHTML = '<div class="dtabs">' + s.d.map((x, i) => '<button type="button" data-tab="' + i + '" aria-pressed="' + (i === tab) + '">' + x[0] + "</button>").join("") + "</div>" +
    '<div class="dview"><button class="copy" type="button">Copy</button><pre>' + body + "</pre>" + (cap ? '<div class="cap">' + cap + "</div>" : "") + "</div>";
}
function render() {
  const s = STEPS[step];
  $("#sNum").textContent = "STEP " + (step + 1) + " OF " + STEPS.length;
  const w = WHO[s.who]; $("#sWho").className = "who " + w[0]; $("#sWho").textContent = w[1];
  $("#sBody").innerHTML = '<div class="anim-in"><h3>' + s.title + '</h3><ul class="lines">' + s.lines.map(l => "<li>" + l + "</li>").join("") + "</ul></div>";
  WB.breakSlashes($("#sBody"));
  tab = 0; renderData(s);
  $("#sBack").disabled = step === 0;
  $("#sNext").textContent = step === STEPS.length - 1 ? "Start again ↺" : "Next →";
  $$(".phase").forEach((b, i) => {
    const p = PHASES[i], part = step > p.to ? 1 : step < p.from ? 0 : (step - p.from + 1) / (p.to - p.from + 1);
    b.classList.toggle("on", step >= p.from && step <= p.to);
    b.querySelector(".pbar").style.width = (part * 100) + "%";
  });
  renderMem(step);
  map.showMoves(s.m);
  map.focus(map.usedNodes(s.m));
  try { history.replaceState(null, "", "#step-" + (step + 1)); } catch (e) {}
}
function go(i) { step = (i + STEPS.length) % STEPS.length; render(); }
function stopAuto() { playing = false; clearInterval(timer); $("#sAuto").textContent = "▶ Play all"; }
$("#sNext").addEventListener("click", () => { stopAuto(); go(step + 1); });
$("#sBack").addEventListener("click", () => { stopAuto(); go(step - 1); });
$("#sAuto").addEventListener("click", () => {
  if (playing) return stopAuto();
  playing = true; $("#sAuto").textContent = "❚❚ Pause"; if (step === STEPS.length - 1) go(0);
  timer = setInterval(() => { if (step === STEPS.length - 1) return stopAuto(); go(step + 1); }, 5200);
});
$("#phases").addEventListener("click", e => { const b = e.target.closest("[data-p]"); if (b) { stopAuto(); go(PHASES[+b.dataset.p].from); } });
$("#sData").addEventListener("click", e => {
  const t = e.target.closest("[data-tab]");
  if (t) { tab = +t.dataset.tab; renderData(STEPS[step]); return; }
  const btn = e.target.closest(".copy");
  if (btn) {
    const v = STEPS[step].d[tab][1], txt = typeof v === "string" ? v : JSON.stringify(v, null, 2);
    try { navigator.clipboard.writeText(txt).then(() => { btn.textContent = "Copied"; setTimeout(() => btn.textContent = "Copy", 1200); }, () => {}); } catch (err) {}
  }
});
addEventListener("keydown", e => {
  const r = $("#walk").getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
  if (e.key === "ArrowRight") { stopAuto(); go(step + 1); }
  if (e.key === "ArrowLeft") { stopAuto(); go(step - 1); }
});

WB.walkGo = n => { stopAuto(); go(n - 1); $("#walk").scrollIntoView({ behavior: "smooth" }); };
const m = /#step-(\d+)/.exec(location.hash);
step = m ? Math.min(STEPS.length, Math.max(1, +m[1])) - 1 : 0;
render();
if (m) $("#walk").scrollIntoView();
})();
