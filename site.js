/* Builds the page from content.js, then adds the scroll animations.
   You should not need to edit this file to change words or skills. */
(function () {
  const C = window.CONTENT;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const rich = s => esc(s).replace(/\[\[(.+?)\]\]/g, '<mark class="tbc">$1</mark>');
  const statusWord = { holding: "Holding", accumulating: "Accumulating", watchlist: "Watchlist" };
  const magnifier = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>';

  /* ---------- FRONT PAGE ---------- */
  function renderFront() {
    const F = C.front, P = C.person;
    const para = (t, i) => `<p>${rich(t)}</p>`
      + (i === F.pullAfter ? `<blockquote class="pq"><span class="pq-mark" aria-hidden="true">\u201C</span>${esc(F.pullQuote.replace(/^[\u201C"]|[\u201D"]$/g, ""))}</blockquote>` : "")
      + (F.breakout && i === F.breakoutAfter ? `<p class="breakout">${esc(F.breakout)}</p>` : "")
      + (F.breakout2 && i === F.breakout2After ? `<p class="breakout">${esc(F.breakout2)}</p>` : "")
      + (F.breakout3 && i === F.breakout3After ? `<p class="breakout">${esc(F.breakout3)}</p>` : "");
    const left = F.article.slice(0, F.split).map((t, i) => para(t, i)).join("");
    const right = F.article.slice(F.split).map((t, i) => para(t, i + F.split)).join("");
    const photo = P.video
      ? `<video id="moving" src="${esc(P.video)}" poster="${esc(P.photo || "")}" autoplay muted loop playsinline aria-label="${esc(P.name)} says hello"></video><button type="button" class="sound" id="sound">Sound on</button>`
      : P.photo
      ? `<img src="${esc(P.photo)}" alt="${esc(P.name)}">`
      : `<div class="photo-ph"><b>PB</b><span>Photo coming soon</span></div>`;
    C.stories.front = { kicker: F.kicker, title: F.headline, body: F.article };
    setTimeout(() => { const v = $("#moving"), s = $("#sound"); if (v && s) s.onclick = () => { v.muted = !v.muted; if (!v.muted) { v.currentTime = 0; v.play(); } s.textContent = v.muted ? "Sound on" : "Sound off"; }; });
    $("#paper").innerHTML = `
      <div class="np-sheet"><div class="np-sheet-in">
      <div class="mast-row">
        <div class="ear">${esc(F.earLeft)}${F.earLeftSub ? `<br><b class="ear-name">${esc(F.earLeftSub)}</b>` : ""}</div>
        <h1 class="masthead">${esc(F.masthead)}</h1>
        <div class="ear right">${(() => { const t = F.earRight.split(" · ").map(esc); const h = Math.ceil(t.length / 2); return t.slice(0, h).join(" · ") + "<br>" + t.slice(h).join(" · "); })()}</div>
      </div>
      <div class="dateline"><span>${esc(F.edition)}</span><span>${esc(F.date)}</span><span>${esc(F.price)}</span></div>
      <div class="contact-bar cb-one" aria-label="Contact">
        ${P.linkedin ? `<a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}${P.linkedin && P.email ? `<span class="cb-sep" aria-hidden="true">|</span>` : ""}${P.email ? `<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>` : ""}
      </div>
      <div class="above-fold">
        <div class="kicker">${esc(F.kicker)}</div>
        <h2 class="headline">${esc(F.headline)}</h2>
        <p class="deck">${esc(F.deck)}</p>
        ${F.impact ? `<div class="impact" aria-label="By the numbers"><span class="imp-k">By the numbers</span>${F.impact.map(i => `<div class="imp"><b>${esc(i.big)}</b><span>${esc(i.label)}</span></div>`).join("")}</div>` : ""}
        <div class="story-grid">
          <div class="col col-l"><div class="byline">${esc(F.byline)}</div>${left}</div>
          ${P.avatar ? `<div class="avatar-slot" aria-hidden="true"></div>` : `<figure class="photo">
            <div class="photo-frame">${photo}</div>
            <figcaption>${esc(F.photoCaption)} <span class="credit">${esc(F.photoCredit)}</span></figcaption>
          </figure>`}
          <div class="col col-r">${right}</div>
        </div>
        ${F.spotlight ? `<section class="spotlight" aria-label="${esc(F.spotlight.title)}">
          <div class="sp-head"><span class="sp-mark" aria-hidden="true">\u201C</span><div><h3>${esc(F.spotlight.title)}</h3><p class="sp-sub">${esc(F.spotlight.sub)}</p></div></div>
          <div class="sp-cols">${F.spotlight.body.map(t => `<p>${rich(t)}</p>`).join("")}</div>
        </section>` : ""}
        ${P.avatar ? `<div class="avatar" id="avatar" role="img" aria-label="${esc(P.name)} introduces herself">
          <img class="av-poster" src="${esc(P.avatar.poster)}" alt="">
          ${P.avatar.still ? `<img class="av-still" src="${esc(P.avatar.still)}" alt="">` : ""}
          <canvas id="avc"></canvas>
          <button type="button" class="sound av-sound" id="avsound" aria-pressed="false">Sound on</button>
        </div>` : ""}
      </div>
      </div></div>
      <div class="np-fold">
        <p class="signoff">${esc(F.signOff)} ↓</p>
      </div>`;

    const nums = F.tickerNumbers.map(t => `<span>${esc(t)}</span>`).join("");
        $("#tickers").innerHTML =
      `<div class="ticker"><div class="track">${nums}</div><div class="track" aria-hidden="true">${nums}</div></div>
`;
  }

  /* ---------- SEARCH SCENE ---------- */
  function renderSearch() {
    const S = C.search, F = C.front;
    $("#search").innerHTML = `
      <div class="loadbar" id="loadbar"></div>
      <button type="button" class="skip" id="skip">Skip ›</button>
      <div class="stage" id="stage">
        <div class="searchbox" id="sbox" role="img" aria-label="A search for ${esc(S.suggestions[S.pick])}">
          <span class="pmark">P</span>
          <span class="typed-wrap"><span id="typed">${esc(S.typed)}</span><span class="caret"></span></span>
          ${magnifier}
        </div>
        <ul class="suggest" id="suggest">
          ${S.suggestions.map((s, i) => {
            const t = esc(s).replace(esc(S.typed), `<b>${esc(S.typed)}</b>`);
            return `<li class="${i === S.pick ? "pick" : ""}">${magnifier}<span class="s-txt">${i === S.pick ? `<strong>${esc(s)}</strong>` : t}</span></li>`;
          }).join("")}
        </ul>
        <svg class="cursor" id="cursor" viewBox="0 0 24 24"><path d="M4 2l15 10-7 1.5L8.5 21z" fill="#1B1C1A" stroke="#F7F7F4" stroke-width="1.3"/></svg>
      </div>`;
  }

  /* ---------- PORTFOLIO (certificates only) ---------- */
  /* How far along a certificate is, from its start month to the end of its target month (0 to 1). */
  function progress(h) {
    const d = (s, end) => { s = String(s || "").replace(/^Spring/, "May").replace(/^Summer/, "Aug").replace(/^Fall/, "Dec").replace(/^Winter/, "Jan");
      const m = /^([A-Z][a-z]{2}) (\d{4})$/.exec(s); if (!m) return null;
      return end ? new Date(+m[2], MONTHS[m[1]] + 1, 0) : new Date(+m[2], MONTHS[m[1]], 1); };
    const a = d(h.started), b = d(h.target, true); if (!a || !b || b <= a) return null;
    return Math.min(1, Math.max(0.04, (Date.now() - a) / (b - a)));
  }
  /* Stock-style chart on each tile: rising line with a soft fill, a live dot, and a dotted projection to the target. */
  function spark(h, i) {
    const W = 100, H = 30, rnd = k => { const x = Math.sin((i + 1) * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
    if (h.status === "watchlist") {
      return `<div class="spark-wrap watch"><svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><path class="proj" d="M0 ${H - 6} L${W} ${H - 6}" pathLength="1"/></svg></div>`;
    }
    const p = h.status === "holding" ? 1 : (progress(h) ?? .3), n = 9, xEnd = W * Math.max(.38, p);
    const pts = Array.from({ length: n }, (_, k) => { const t = k / (n - 1); const trend = H - 3 - Math.pow(t, 1.15) * Math.max(.6, p) * (H - 9);
      return [t * xEnd, Math.max(3, Math.min(H - 2, trend + (k && k < n - 1 ? (rnd(k) - .5) * 5 : 0)))]; });
    const line = pts.map(([x, y], k) => `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    const [lx, ly] = pts[n - 1];
    const area = `${line} L${lx.toFixed(1)} ${H} L0 ${H} Z`;
    const proj = p < 1 ? `<path class="proj" d="M${lx.toFixed(1)} ${ly.toFixed(1)} L${W} 4" pathLength="1"/>` : "";
    return `<div class="spark-wrap ${h.status}"><svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="sg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".32"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>
      <path class="area" d="${area}" fill="url(#sg${i})"/>${proj}<path class="line" d="${line}" pathLength="1"/></svg>
      <i class="live-dot" style="left:${(100 * lx / W).toFixed(1)}%;top:${(100 * ly / H).toFixed(1)}%"></i></div>`;
  }
  const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  function daysTo(target) { // "Nov 2026" -> days until the end of that month
    const m = /^([A-Z][a-z]{2}) (\d{4})$/.exec(target || ""); if (!m) return null;
    const end = new Date(+m[2], MONTHS[m[1]] + 1, 0); return Math.max(0, Math.ceil((end - new Date()) / 864e5));
  }
  function renderHoldings() {
    const H = C.holdings, count = s => H.filter(h => h.status === s).length;
    const next = H.filter(h => h.status === "accumulating" && daysTo(h.target) !== null).sort((a, b) => daysTo(a.target) - daysTo(b.target))[0];
    const sectors = C.sectors.filter(s => H.some(h => h.sector === s));
    $("#holdings-in").innerHTML = `
      <div class="section-head">
        <h2 id="h-holdings">Priyal's Portfolio</h2>
        <p class="hello">${esc(C.holdingsIntro)}</p>
      </div>
      <nav class="tabs" role="tablist" id="tabs">
        ${["All", ...sectors].map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-sector="${esc(s)}">${esc(s === "All" ? "All certificates" : s)} <span>${s === "All" ? H.length : H.filter(h => h.sector === s).length}</span></button>`).join("")}
      </nav>
      <div class="board-grid">
        <div class="board" id="board">
          ${H.map((h, i) => {
            const d = h.status === "accumulating" ? daysTo(h.target) : null;
            return `<button type="button" class="pos tile ${h.status}" data-i="${i}" data-sector="${esc(h.sector)}" aria-pressed="false">
              <span class="row"><span class="code">${esc(h.code)}</span><span class="tag">${statusWord[h.status]}</span></span>
              <span class="nm">${esc(h.name)}</span>
              <span class="iss">${esc(h.issuer || "")}</span>
              ${spark(h, i)}
              <span class="tgt">${h.status === "holding" ? "Earned" : h.status === "accumulating" ? "Target " + esc(h.target) : "Lists " + esc(h.target)}${d !== null ? ` · <em>${d} days</em>` : ""}${h.status === "accumulating" && progress(h) !== null ? `<b class="gain">▲ ${Math.round(progress(h) * 100)}%</b>` : h.status === "holding" ? `<b class="gain">▲ 100%</b>` : ""}</span>
            </button>`; }).join("")}
        </div>
        <aside class="panel" id="panel" aria-live="polite"></aside>
      </div>
      ${allocation()}`;

    $("#tabs").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      document.querySelectorAll("#tabs button").forEach(x => x.setAttribute("aria-selected", x === b));
      const s = b.dataset.sector;
      document.querySelectorAll(".pos").forEach(t => (t.hidden = s !== "All" && t.dataset.sector !== s));
    });
    const donut = $(".donut");
    if (donut) {
      const hl = x => { donut.classList.toggle("hl", !!x); donut.querySelectorAll(".slice").forEach(o => o.classList.toggle("on", o.dataset.x === x)); };
      document.querySelectorAll(".at-row[data-x]").forEach(btn => {
        btn.addEventListener("mouseenter", () => hl(btn.dataset.x));
        btn.addEventListener("mouseleave", () => hl(document.querySelector('.at-row[aria-expanded="true"]')?.dataset.x));
        btn.addEventListener("click", () => {
          const open = btn.getAttribute("aria-expanded") !== "true";
          document.querySelectorAll(".at-row[data-x]").forEach(o => { o.setAttribute("aria-expanded", "false"); o.nextElementSibling.hidden = true; });
          btn.setAttribute("aria-expanded", String(open)); btn.nextElementSibling.hidden = !open; hl(open ? btn.dataset.x : null);
        });
      });
      donut.querySelectorAll(".slice").forEach(sl => sl.addEventListener("click", () => document.querySelector(`.at-row[data-x="${sl.dataset.x}"]`)?.click()));
    }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("drawn"); io.unobserve(e.target); } }), { threshold: .4 });
    document.querySelectorAll(".spark-wrap").forEach(el => io.observe(el));
    const board = $("#board");
    board.addEventListener("click", e => { const b = e.target.closest(".pos"); if (b) selectTile(+b.dataset.i, true); });
    board.addEventListener("mouseover", e => { const b = e.target.closest(".pos"); if (b && window.matchMedia("(hover: hover)").matches) selectTile(+b.dataset.i, false); });
    const first = H.findIndex(h => h.status === "holding");
    selectTile(first < 0 ? 0 : first, false);
  }
  /* ---------- SKILL ALLOCATION (donut under the portfolio, like asset allocation) ----------
     Built from the skills listed on every holding. Click a sector to see its skills. */
  const DOMAIN_COLORS = { "Project Management": "#1E5A42", "Business": "#3E7C7A", "Data": "#2F5D8A", "Tech": "#8A6B2A", "AI": "#9B2A24", "Tools": "#6B6D67" };
  function allSkills() {
    const seen = new Map(), rank = { holding: 0, accumulating: 1, watchlist: 2 };
    C.holdings.forEach(h => (h.skills || []).forEach(s => {
      const st = s.st || h.status, key = s.n.toLowerCase(), cur = seen.get(key);
      if (!cur) seen.set(key, { n: s.n, d: s.d, st, from: [h.code] });
      else { cur.from.push(h.code); if (rank[st] < rank[cur.st]) cur.st = st; }
    }));
    return [...seen.values()];
  }
  function allocation() {
    const S = allSkills(); if (!S.length) return "";
    const order = Object.keys(DOMAIN_COLORS);
    const secs = order.filter(x => S.some(s => s.d === x)).map(x => { const it = S.filter(s => s.d === x);
      return { x, n: it.length, have: it.filter(s => s.st !== "watchlist").length, items: it.sort((a, b) => ({ holding: 0, accumulating: 1, watchlist: 2 })[a.st] - ({ holding: 0, accumulating: 1, watchlist: 2 })[b.st]) }; })
      .sort((a, b) => b.n - a.n);
    const R = 80, r = 52, cx = 100, cy = 100; let a0 = -Math.PI / 2;
    const arc = (a1, a2) => { const p = (rad, a) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)], L = a2 - a1 > Math.PI ? 1 : 0;
      const [x1, y1] = p(R, a1), [x2, y2] = p(R, a2), [x3, y3] = p(r, a2), [x4, y4] = p(r, a1);
      return `M${x1} ${y1}A${R} ${R} 0 ${L} 1 ${x2} ${y2}L${x3} ${y3}A${r} ${r} 0 ${L} 0 ${x4} ${y4}Z`; };
    const slices = secs.map(s => { const a1 = a0, a2 = a0 + 2 * Math.PI * s.n / S.length; a0 = a2;
      return `<path class="slice" data-x="${esc(s.x)}" d="${arc(a1 + .012, a2 - .012)}" fill="${DOMAIN_COLORS[s.x]}"><title>${esc(s.x)}: ${s.n} skills</title></path>`; }).join("");
    const word = { holding: "Earned", accumulating: "Building", watchlist: "Planned" };
    return `<div class="alloc">
      <div class="alloc-head"><h3>Skill allocation</h3><span>${S.length} skills across ${secs.length} sectors · click a sector</span></div>
      <div class="alloc-body">
        <svg viewBox="0 0 200 200" class="donut" role="img" aria-label="Skills by sector">${slices}
          <text x="100" y="96" text-anchor="middle" class="d-n">${S.length}</text><text x="100" y="116" text-anchor="middle" class="d-l">skills</text></svg>
        <div class="alloc-table" role="table">
          <div class="at-row at-h" role="row"><span>Sector</span><span>Skills</span><span>Weight</span><span>Earned or building</span></div>
          ${secs.map(s => `<div class="at-group" data-x="${esc(s.x)}">
            <button type="button" class="at-row" aria-expanded="false" data-x="${esc(s.x)}"><span><i style="background:${DOMAIN_COLORS[s.x]}"></i>${esc(s.x)}</span><span>${s.n}</span><span>${Math.round(100 * s.n / S.length)}%</span><span>${s.have}<b class="chev">▾</b></span></button>
            <ul class="at-skills" hidden>${s.items.map(k => `<li class="${k.st}"><i class="dot ${k.st}"></i><span class="k-n">${esc(k.n)}</span><span class="k-f">${esc(k.from.join(" · "))}</span><span class="k-s">${word[k.st]}</span></li>`).join("")}</ul>
          </div>`).join("")}
        </div>
      </div></div>`;
  }
  function list(title, arr) {
    return `<div class="pblock"><h4>${title}</h4><ul>${arr.map(x => `<li>${rich(x)}</li>`).join("")}</ul></div>`;
  }
  let current = -1;
  function selectTile(i, scroll) {
    if (i === current && !scroll) return; current = i;
    const h = C.holdings[i];
    document.querySelectorAll(".pos").forEach(t => t.setAttribute("aria-pressed", +t.dataset.i === i));
    const imgs = [].concat(h.badge || []).map(x => typeof x === "string" ? { src: x } : x);
    const box = imgs.length
      ? `<div class="slides" id="slides">${imgs.map(x => `<div class="slide${x.cover ? " cover" : ""}"><img src="${esc(x.src)}" alt="${esc(x.alt || h.name)}"></div>`).join("")}</div>
         ${imgs.length > 1 ? `<div class="dots">${imgs.map((_, k) => `<button type="button" aria-label="Image ${k + 1}" data-k="${k}"${k ? "" : ' aria-current="true"'}></button>`).join("")}</div><span class="swipe">Swipe →</span>` : ""}`
      : `<div class="logo-ph"><span class="lp-iss">${esc(h.issuer || "")}</span><span class="lp-note">${h.status === "holding" ? "Badge image to be added" : "Official badge appears here when earned"}</span></div>`;
    const when = h.status === "holding" ? `Earned${h.earned ? " " + esc(h.earned) : ""}`
      : h.status === "accumulating" ? `In progress · started ${esc(h.started || "")} · target ${esc(h.target || "")}`
      : `Planned · ${esc(h.target || "")}`;
    const notes = [["What I learned", h.learned], ["How I'd use it at work", h.useAtWork], ["Key takeaways", h.takeaways], ["Readings and books", h.readings]]
      .filter(([, a]) => a && a.length);
    $("#panel").innerHTML = `
      <div class="logo-box">${box}</div>
      <div class="p-head"><div class="p-code">${esc(h.code)}</div><h3>${esc(h.name)}</h3>
        <div class="p-meta">${esc(h.issuer || "")}</div><div class="p-status"><i class="dot ${h.status}"></i>${when}</div></div>
      ${(() => { const sk = h.skills || []; if (!sk.length) return "";
        return `<div class="pblock p-skills"><h4>Skills this builds</h4><ul>${sk.map(s => { const st = s.st || h.status;
          return `<li class="${esc(st)}"><i class="dot ${esc(st)}"></i><span>${esc(s.n)}${s.via ? ` <em>${esc(s.via)}</em>` : ""}</span></li>`; }).join("")}</ul></div>`; })()}
      ${h.certificate ? `<a class="cert-link" href="${esc(h.certificate)}" target="_blank" rel="noopener">Open the certificate in full →</a>` : ""}
      ${h.status === "watchlist" ? "" : notes.length ? notes.map(([t, a]) => list(t, a)).join("") : `<p class="empty-note">What I learned, how I'd use it, and key takeaways will appear here.</p>`}`;
    const sl = $("#slides");
    if (sl && imgs.length > 1) {
      const dots = [...document.querySelectorAll(".dots button")];
      dots.forEach(d => d.onclick = () => sl.scrollTo({ left: sl.clientWidth * +d.dataset.k, behavior: "smooth" }));
      sl.onscroll = () => { const k = Math.round(sl.scrollLeft / sl.clientWidth); dots.forEach((d, n) => d.toggleAttribute("aria-current", n === k)); };
    }
    if (scroll && window.matchMedia("(max-width: 860px)").matches) $("#panel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ---------- CHART / TIMELINE ---------- */
  let ptPos = [];
  function renderGrowth() {
    const T = C.timeline, n = T.length;
    ptPos = T.map((t, i) => ({ x: 4 + (i * 92) / (n - 1), y: 82 - Math.pow(i / (n - 1), 1.15) * 60 + (i % 2 ? 2.5 : -2.5) }));
    const lastNow = T.reduce((a, t, i) => (t.status !== "future" ? i : a), 0);
    const pathOf = arr => arr.map((p, k) => `${k ? "L" : "M"}${p.x * 10} ${p.y * 4.2}`).join(" ");
    const solid = pathOf(ptPos.slice(0, lastNow + 1));
    const future = pathOf(ptPos.slice(lastNow));
    const todayX = ptPos[T.findIndex(t => t.status === "ongoing" && /2026/.test(t.date) && /Oct/.test(t.date))] || ptPos[lastNow];
    $("#growth-in").innerHTML = `
      <div class="section-head">
        
        <h2 id="h-growth">Where she has been, and where she is headed</h2>
        <div class="legend"><span><i class="dot holding"></i>Done</span><span><i class="dot accumulating"></i>Ongoing</span><span><i class="dot watchlist"></i>Ahead</span></div>
      </div>
      <div class="chart-scroll"><div class="chart" id="chart">
        <svg viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
          <g class="grid">${[1, 2, 3, 4].map(k => `<line x1="0" x2="1000" y1="${k * 84}" y2="${k * 84}"/>`).join("")}</g>
          <path class="line-done" id="lineDone" d="${solid}"/>
          <path class="line-future" id="lineFuture" d="${future}"/>
        </svg>
        <div class="today" style="left:${todayX.x}%"><span>Today</span></div>
        ${T.map((t, i) => {
          const p = ptPos[i], below = i % 2 === 0;
          return `<button type="button" class="pt ${t.status}" style="left:${p.x}%;top:${p.y}%" data-i="${i}" aria-label="${esc(t.date)}: ${esc(t.title)}" aria-pressed="false"></button>
            <div class="lbl ${t.status}" style="left:${p.x}%;top:calc(${p.y}% ${below ? "+ 18px" : "- 66px"})"><b>${esc(t.date)}</b>${esc(t.title)}</div>`;
        }).join("")}
      </div></div>
      <div class="detail" id="detail"></div>`;
    $("#chart").addEventListener("click", e => { const b = e.target.closest(".pt"); if (b) showMilestone(+b.dataset.i); });
    showMilestone(lastNow);
  }
  function showMilestone(i) {
    const t = C.timeline[i];
    document.querySelectorAll(".pt").forEach(p => p.setAttribute("aria-pressed", +p.dataset.i === i));
    $("#detail").innerHTML = `<div class="eyebrow">${esc(t.date)} · ${t.status === "done" ? "Done" : t.status === "ongoing" ? "Ongoing" : "Ahead"}</div><h3>${esc(t.title)}</h3><p>${rich(t.note)}</p>`;
  }

  /* ---------- PROUD MOMENTS ---------- */
  function sealSVG(i) {
    const pts = [], n = 24;
    for (let k = 0; k < n * 2; k++) { const r = k % 2 ? 22 : 27, a = (Math.PI * k) / n; pts.push((32 + r * Math.cos(a)).toFixed(1) + "," + (30 + r * Math.sin(a)).toFixed(1)); }
    return `<svg class="seal" viewBox="0 0 64 76" aria-hidden="true">
      <path d="M20 44 L12 74 L21 68 L26 76 L31 48 Z" fill="var(--seal-red)"/><path d="M44 44 L52 74 L43 68 L38 76 L33 48 Z" fill="var(--seal-red)"/>
      <polygon points="${pts.join(" ")}" fill="var(--gold)"/>
      <circle cx="32" cy="30" r="19" fill="var(--seal-red)"/><circle cx="32" cy="30" r="16" fill="none" stroke="var(--gold)" stroke-width="1" stroke-dasharray="2 2"/>
      <text x="32" y="36" text-anchor="middle" font-family="Playfair Display SC, Georgia, serif" font-weight="900" font-size="17" fill="#F3E3B4">P</text></svg>`;
  }
  function renderProud() {
    $("#proud-in").innerHTML = `
      <div class="section-head"><h2 id="h-proud">Wall of Fame</h2><p class="wall-sub">Proud moments.</p></div>
      <div class="frames">${C.proud.map((p, i) => `
        <button type="button" class="certificate" data-story="${esc(p.story)}"><div class="guil"><div class="cert-paper">
          ${["tl","tr","bl","br"].map(k => `<svg class="orn ${k}" viewBox="0 0 40 40" aria-hidden="true"><path d="M5 22C5 11 11 5 22 5M22 5c6 0 8 6 4 8-3 1.5-5-2-2-3M5 22c0 6 6 8 8 4 1.5-3-2-5-3-2M11 11c4-2 7 1 4 4-2 2-5 0-4-4zM17 17l3 3" /><circle cx="4" cy="4" r="1.6"/></svg>`).join("")}<span class="side l"></span><span class="side r"></span>
          <span class="tt">${esc(p.title)}</span><span class="ln">${esc(p.line)}</span><span class="yr">${esc(p.year)}</span>
          ${sealSVG(i)}<span class="rd">Read the story →</span>
        </div></div></button>`).join("")}</div>`;
  }

  /* ---------- HEADED, PRINCIPLES, BUILT, CONTACT ---------- */
  function renderRest() {
    const H = C.headed, P = C.person;
    $("#headed-in").innerHTML = `
      <div class="section-head"><h2 id="h-headed">Where I'm headed</h2></div>
      <div class="headed">
        <div><div class="eyebrow">The goal</div><p class="goal">${esc(H.goal)}</p>
          <p class="why">${esc(H.why)}</p><p class="motto">${esc(P.motto)}</p></div>
        <div class="pillars">${H.pillars.map(x => `<article><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}</div>
      </div>`;
    const li = P.linkedin
      ? `<a href="${esc(P.linkedin)}" target="_blank" rel="noopener">${esc(P.linkedin.replace(/^https?:\/\/(www\.)?/, ""))}</a>`
      : `<span class="ph">LinkedIn link coming soon</span>`;
    $("#closing-in").innerHTML = `
      <section class="section" aria-labelledby="h-princ" style="padding-top:0">
        <div class="section-head"><h2 id="h-princ">My principles</h2></div>
        <div class="principles">${C.principles.map(p => `<article><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>${p.lp ? `<span class="lp">${esc(p.lp)}</span>` : ""}</article>`).join("")}</div>
        ${C.principlesNote ? `<p class="draftnote">${esc(C.principlesNote)}</p>` : ""}
      </section>
      <footer class="end">The Portfolio · ${esc(C.front.edition)} · ${esc(P.name)}</footer>`;
  }

  /* ---------- STORY DIALOG ---------- */
  function wireStories() {
    const dlg = $("#story");
    document.addEventListener("click", e => {
      const b = e.target.closest("[data-story]"); if (!b) return;
      const s = C.stories[b.dataset.story]; if (!s) return;
      $("#story-in").innerHTML = `<button type="button" class="close" id="closeStory">Close</button>
        <div class="kicker">${esc(s.kicker)}</div><h2>${esc(s.title)}</h2><div class="rule"></div>
        ${s.body.map(p => `<p>${rich(p)}</p>`).join("")}`;
      $("#closeStory").onclick = () => dlg.close();
      dlg.showModal();
    });
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  }

  /* ---------- MOVING AVATAR ----------
     The clip is one video with two halves side by side: her in colour on the left,
     a black-and-white cut-out mask on the right. WebGL joins them so only she shows,
     standing in front of the page. If WebGL is missing, the still cut-out shows instead. */
  function avatarLayout() {
    const box = $("#avatar"); if (!box) return;
    const fold = $(".above-fold"), slot = $(".avatar-slot"), sub = $(".sp-sub"), grid = $(".story-grid");
    if (!fold || !slot) return;
    const A = C.person.avatar.aspect || .5, fr = fold.getBoundingClientRect();
    let top, bottom, cx;
    if (window.innerWidth <= 860) {           // phones: she stands in her own space above the story
      slot.style.height = Math.min(window.innerHeight * .72, 620) + "px";
      const r = slot.getBoundingClientRect();
      top = r.top - fr.top; bottom = r.bottom - fr.top; cx = r.left + r.width / 2 - fr.left;
    } else {                                   // desktop: head above the photo spot, feet on the "What she believes" line
      slot.style.height = "";
      const r = slot.getBoundingClientRect(), g = grid.getBoundingClientRect();
      top = g.top - fr.top + 6;
      bottom = sub ? sub.getBoundingClientRect().bottom - fr.top : g.bottom - fr.top;
      cx = r.left + r.width / 2 - fr.left;
    }
    const h = Math.max(200, bottom - top), w = h * A;
    Object.assign(box.style, { top: top + "px", height: h + "px", width: w + "px", left: (cx - w / 2) + "px" });
  }
  function initAvatar() {
    const box = $("#avatar"); if (!box) return;
    const V = C.person.avatar, canvas = $("#avc"), btn = $("#avsound");
    avatarLayout();
    addEventListener("resize", avatarLayout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(avatarLayout);
    setTimeout(avatarLayout, 600);
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return;                                   // poster stays
    const vid = document.createElement("video");
    const webm = V.src.replace(/\.mp4$/, ".webm");
    Object.assign(vid, { src: vid.canPlayType('video/mp4; codecs="avc1.640028"') ? V.src : webm, muted: true, loop: false, playsInline: true, autoplay: true, preload: "auto" });
    vid.setAttribute("playsinline", ""); vid.setAttribute("muted", "");
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, "attribute vec2 p;varying vec2 u;void main(){u=vec2((p.x+1.)/2.,(1.-p.y)/2.);gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, "precision mediump float;varying vec2 u;uniform sampler2D t;void main(){vec3 c=texture2D(t,vec2(u.x*.5,u.y)).rgb;float a=texture2D(t,vec2(.5+u.x*.5,u.y)).r;gl_FragColor=vec4(c*a,a);}"));
    gl.linkProgram(pr); gl.useProgram(pr);
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(k => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    let ready = false, cur = vid, lastT = -1, lastV = null;
    // after she finishes talking, a silent clip of her waving and standing at ease loops while people read
    const idle = V.idle ? document.createElement("video") : null;
    if (idle) {
      Object.assign(idle, { src: idle.canPlayType('video/mp4; codecs="avc1.640028"') ? V.idle : V.idle.replace(/\.mp4$/, ".webm"), muted: true, loop: true, playsInline: true, preload: "auto" });
      idle.setAttribute("playsinline", ""); idle.setAttribute("muted", "");
    }
    const draw = () => {
      if (cur.readyState >= 2 && (cur.currentTime !== lastT || cur !== lastV)) {
        lastT = cur.currentTime; lastV = cur;
        const dpr = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(box.clientWidth * dpr), h = Math.round(box.clientHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
        gl.viewport(0, 0, w, h);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, cur);
        gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!ready) { ready = true; box.classList.add("live"); }
      }
      requestAnimationFrame(draw);
    };
    vid.addEventListener("loadeddata", () => draw(), { once: true });
    // She talks once, the first time she is on screen, then waves and stands at ease on a loop
    // (or, with no idle clip, stands still in her final pose). "Play with sound" replays her intro.
    let talked = false, onScreen = false;
    new IntersectionObserver(es => es.forEach(e => {
      onScreen = e.isIntersecting;
      if (!onScreen) { cur.pause(); return; }
      cur.play().catch(() => {});
    })).observe(box);
    const toIdle = () => {
      vid.muted = true; btn.textContent = "Play with sound"; btn.setAttribute("aria-pressed", "false");
      if (idle) { cur = idle; idle.currentTime = 0; if (onScreen) idle.play().catch(() => {}); }
      else box.classList.add("ended");
    };
    vid.addEventListener("ended", () => { talked = true; toIdle(); });
    btn.onclick = () => {
      if (cur === vid && !vid.muted && !vid.paused) {        // playing with sound: mute it
        vid.muted = true; btn.textContent = "Sound on"; btn.setAttribute("aria-pressed", "false"); return;
      }
      if (idle) idle.pause();
      box.classList.remove("ended"); cur = vid;
      vid.muted = false; vid.currentTime = 0; vid.play().catch(() => {});
      btn.textContent = "Sound off"; btn.setAttribute("aria-pressed", "true");
    };
  }

  /* ---------- ANIMATION ---------- */
  function animate() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // front page: masthead settles in
    gsap.from(".masthead", { y: 18, opacity: 0, duration: 1, ease: "power3.out" });
    if ($(".photo")) gsap.from(".photo", { y: 14, opacity: 0, duration: 1, delay: .15, ease: "power3.out" });

    // search scene: fold → search bar → typing → suggestions → pick → loading
    const S = C.search, full = S.typed, sugg = gsap.utils.toArray("#suggest li"), pickLi = sugg[S.pick];
    pickLi.classList.remove("pick");
    const typed = $("#typed");
    const state = { chars: 0 };
    const cursorTo = () => {
      const st = $("#stage").getBoundingClientRect(), r = pickLi.getBoundingClientRect();
      return { left: r.left - st.left + Math.min(220, r.width * .45), top: r.top - st.top + r.height * .55 };
    };
    // The search is the end of the page until it plays. Everything below stays hidden.
    // On arrival the scene plays by itself: the cursor clicks the bar, types "Priyal",
    // picks her portfolio, the page loads, the search disappears and the portfolio opens in its place.
    const root = document.documentElement, body = document.body, skipBtn = $("#skip"), caret = $(".caret");
    body.classList.add("gated");
    const tl = gsap.timeline({ paused: true });
    tl.set(typed, { textContent: "" })
      .set(caret, { autoAlpha: 0 })
      .set("#suggest", { autoAlpha: 0 })
      .set(sugg, { autoAlpha: 0, y: -6 })
      .set("#cursor", { autoAlpha: 0, left: "88%", top: "160%", scale: 1 })
      .set("#loadbar", { width: "0%" })
      .to("#cursor", { autoAlpha: 1, duration: .25 }, "+=.25")
      .to("#cursor", { left: () => { const st = $("#stage").getBoundingClientRect(), r = $("#sbox").getBoundingClientRect(); return r.left - st.left + r.width * .3; }, top: () => { const st = $("#stage").getBoundingClientRect(), r = $("#sbox").getBoundingClientRect(); return r.top - st.top + r.height * .45; }, duration: .9, ease: "power2.inOut" })   // to the search bar
      .to("#cursor", { scale: .82, duration: .1, yoyo: true, repeat: 1 })                 // click
      .to("#sbox", { boxShadow: "0 0 0 3px rgba(30,90,66,.25), 0 8px 24px -10px rgba(27,28,26,.35)", duration: .2 }, "<")
      .set(caret, { autoAlpha: 1 })
      .to(state, { chars: full.length, duration: .9, ease: "none", onUpdate: () => (typed.textContent = full.slice(0, Math.round(state.chars))) }, "+=.15")
      .to("#suggest", { autoAlpha: 1, duration: .2 })
      .to(sugg, { autoAlpha: 1, y: 0, stagger: .12, duration: .3 }, "<")
      .to("#cursor", { left: () => cursorTo().left, top: () => cursorTo().top, duration: .8, ease: "power2.inOut" }, "+=.25")
      .add(() => pickLi.classList.add("pick"))
      .to("#cursor", { scale: .82, duration: .1, yoyo: true, repeat: 1 })                 // click her portfolio
      .to("#loadbar", { width: "100%", duration: .8, ease: "power1.inOut" }, "+=.05")
      .to("#stage", { autoAlpha: 0, y: -24, duration: .4, ease: "power2.in" });
    tl.progress(0).pause(); typed.textContent = "";

    let locked = false, opened = false, glide = null, touchY = 0;
    const glideTo = (y, dur, done) => {
      if (glide) glide.kill();
      root.style.scrollBehavior = "auto";
      const o = { y: window.scrollY };
      glide = gsap.to(o, { y, duration: dur, ease: "power2.inOut", onUpdate: () => window.scrollTo(0, o.y),
        onComplete: () => { root.style.scrollBehavior = ""; done && done(); } });
    };
    const keys = ["ArrowDown", "PageDown", " ", "End", "ArrowUp", "PageUp", "Home"];
    addEventListener("wheel", ev => { if (!locked) { if (ev.deltaY > 0) nudge(); return; } ev.preventDefault(); if (ev.deltaY < -40) release(); }, { passive: false });
    addEventListener("touchstart", ev => { touchY = ev.touches[0].clientY; }, { passive: true });
    addEventListener("touchmove", ev => { if (!locked) { if (touchY - ev.touches[0].clientY > 10) nudge(); return; } ev.preventDefault(); if (ev.touches[0].clientY - touchY > 60) release(); }, { passive: false });
    addEventListener("keydown", ev => { if (!locked && ["ArrowDown", "PageDown", " ", "End"].includes(ev.key)) nudge(); if (!locked || !keys.includes(ev.key)) return; ev.preventDefault(); if (["ArrowUp", "PageUp", "Home"].includes(ev.key)) release(); });
    const lock = on => { locked = on; skipBtn.classList.toggle("on", on); };
    const topOf = el => el.getBoundingClientRect().top + window.scrollY;

    // the portfolio opens where the search was
    function open() {
      if (opened) return; opened = true;
      if (glide) glide.kill(); tl.pause(); lock(false);
      const y = topOf($("#search"));
      $("#search").style.display = "none";
      body.classList.remove("gated");
      root.style.scrollBehavior = "auto"; window.scrollTo(0, y); root.style.scrollBehavior = "";
      ScrollTrigger.refresh();
      gsap.from("#holdings", { autoAlpha: 0, y: 30, duration: .7, ease: "power2.out" });
    }
    function release() {            // visitor scrolled up mid-play: let them go, replay next time
      clearTimeout(safety);
      if (glide) glide.kill();
      tl.pause(); lock(false); root.style.scrollBehavior = "";
      tl.progress(0).pause(); typed.textContent = ""; pickLi.classList.remove("pick");
    }
    let safety = null;
    const start = () => {
      if (opened || locked) return;
      lock(true); pickLi.classList.remove("pick");
      clearTimeout(safety); safety = setTimeout(() => { if (!opened && locked) open(); }, 9000);   // never get stuck
      glideTo(topOf($("#search")), .6, () => { if (locked) tl.restart(); });
    };
    // scrolling down while the search bar is on screen (re)starts it, e.g. after an interrupted play
    function nudge() {
      if (opened || locked) return;
      const r = $("#search").getBoundingClientRect();
      if (r.top < window.innerHeight * .6) start();
    }
    tl.eventCallback("onComplete", () => { if (locked) open(); });
    skipBtn.addEventListener("click", open);
    ScrollTrigger.create({ trigger: "#search", start: "top 55%", onEnter: start });
    // links into the hidden part of the page open it straight away
    document.addEventListener("click", ev => {
      const a = ev.target.closest('a[href^="#"]'); if (!a || opened) return;
      const t = document.querySelector(a.getAttribute("href"));
      if (t && t.closest("#holdings, #growth, #proud, #headed, #closing")) { ev.preventDefault(); open(); setTimeout(() => t.scrollIntoView(), 50); }
    }, true);

    // holdings: tabs slide up like the ticker, tiles drop in
    gsap.from("#tabs", { y: 50, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: "#tabs", start: "top 92%", once: true } });
    gsap.from(".pos", { y: 12, opacity: 0, duration: .4, ease: "power2.out", stagger: .03,
      scrollTrigger: { trigger: "#board", start: "top 85%", once: true } });

    // chart: the line draws itself as you scroll, milestones stamp in
    ["#lineDone", "#lineFuture"].forEach(id => {
      const p = $(id); const L = p.getTotalLength(); p.style.strokeDasharray = id === "#lineDone" ? L : "6 6";
      if (id === "#lineDone") gsap.fromTo(p, { strokeDashoffset: L }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: "#chart", start: "top 80%", end: "bottom 45%", scrub: .5 } });
      else gsap.from(p, { opacity: 0, scrollTrigger: { trigger: "#chart", start: "center 55%", end: "bottom 40%", scrub: .5 } });
    });
    gsap.from(".pt, .lbl", { scale: .2, opacity: 0, stagger: .025, duration: .3, ease: "back.out(2)", scrollTrigger: { trigger: "#chart", start: "top 70%", once: true } });

    // proud moments: frames swing onto the wall
    // wall of fame: certificates appear on the wall one by one
    gsap.from(".certificate", { y: 18, opacity: 0, duration: .6, stagger: .18, ease: "power2.out",
      scrollTrigger: { trigger: "#proud", start: "top 70%", once: true } });

    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  renderFront(); renderSearch(); renderHoldings(); renderGrowth(); renderProud(); renderRest(); wireStories(); initAvatar();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(animate); else animate();
})();
