/* Concept Tech — her cut-out video in front of her name; her tools orbit around her on their own page. */
(function () {
  const $ = s => document.querySelector(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- skills sphere: tools and project management skills spin in a globe around her ---------- */
  const SKILLS = [
    // project management
    "Agile", "Scrum", "Kanban", "Waterfall", "Risk management", "Stakeholder management", "Budgeting",
    "Scope management", "Roadmaps", "Requirements", "Sprint planning", "Gantt charts", "RACI",
    "Change management", "Vendor negotiation", "Status reporting", "KPIs", "Retrospectives",
    "Prioritisation", "Resource planning", "Go / no-go calls", "User research",
    // tools
    "Excel", "Word", "PowerPoint", "Google Sheets", "Jira", "Asana", "Trello", "Notion",
    "Slack", "SQL", "Tableau", "Figma", "Claude", "ChatGPT"];
  const HOT = new Set(["Agile", "Risk management", "Stakeholder management", "Roadmaps", "Excel", "Jira", "SQL", "Claude"]);
  const orbit = $("#orbit");
  const chips = SKILLS.map(s => { const c = document.createElement("span"); c.className = "chip" + (HOT.has(s) ? " hot" : ""); c.textContent = s; orbit.appendChild(c); return c; });
  // spread the chips evenly over a sphere (Fibonacci sphere)
  const N = chips.length, GA = Math.PI * (3 - Math.sqrt(5));
  const pts = chips.map((_, i) => { const y = 1 - (i + .5) / N * 2, r = Math.sqrt(1 - y * y); return [Math.cos(GA * i) * r, y, Math.sin(GA * i) * r]; });
  // each skill starts somewhere off screen and flies in at its own moment
  const rnd = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
  const starts = chips.map((_, i) => { const a = rnd(i, 1) * Math.PI * 2, d = .75 + rnd(i, 2) * .6; return [Math.cos(a) * d, Math.sin(a) * d, .2 + rnd(i, 3) * .4]; });
  const oPage = $(".orbit-page"), oHer = $(".o-her"), oHead = $(".o-head"), stage = $(".slide-stage"), jPanel = $(".slide-pin > .journey");
  const clamp = v => Math.min(1, Math.max(0, v)), ease = v => 1 - Math.pow(1 - v, 3);
  let spinT = .6, last = performance.now(), oStart = null, sT = 0, opening = false, orbitPlay = () => {}, orbitReset = () => {};
  function spin(now) {
    const w = innerWidth, h = innerHeight, mobile = w <= 860;
    // transition: nothing moves until the visitor has scrolled 25% past the Journey page,
    // then the orbit page rises from the bottom, by itself, and closes again if they scroll back
    const sr = stage.getBoundingClientRect(), q = clamp(-sr.top / (sr.height - h));
    const target = (reduce || q >= .25) ? 1 : 0, dt = Math.min(.05, (now - last) / 1000);
    if (target > sT) sT = Math.min(1, sT + dt / 1.1); else if (target < sT) sT = Math.max(0, sT - dt / .8);   // hold still once it arrives
    const e = sT * sT * (3 - 2 * sT);
    // the orbit page rises from the bottom over the Journey, its curved top edge flattening as it arrives
    oPage.style.transform = e >= 1 ? "none" : `translateY(${((1 - e) * 102).toFixed(2)}%)`;
    const rr = ((1 - e) * 22).toFixed(2);
    oPage.style.borderRadius = e >= 1 ? "" : `50% 50% 0 0 / ${rr}vh ${rr}vh 0 0`;
    jPanel.style.transform = e > 0 ? `scale(${(1 - e * .08).toFixed(4)})` : ""; jPanel.style.filter = e > 0 && e < 1 ? `blur(${(e * 6).toFixed(1)}px)` : "";
    // the page always arrives on the first frame of her video; it only plays once the page is fully in
    if (sT > 0 && !opening) { opening = true; orbitReset(); }
    if (sT >= 1 && oStart === null) { oStart = now; orbitPlay(); }
    if (sT <= 0) { oStart = null; if (opening) { opening = false; orbitReset(); } }
    const p = reduce ? 1 : (oStart === null ? 0 : clamp((now - oStart) / 2800));
    oHer.style.transform = "translateX(-50%)";
    // 3) the heading slides in last
    const hd = ease(clamp((p - .72) / .22));
    oHead.style.transform = `translate(${(-(1 - hd) * 40).toFixed(2)}vw, ${mobile ? "0" : "-50%"})`; oHead.style.opacity = hd.toFixed(3);
    // the sphere only starts spinning once every skill has arrived
    const allIn = p >= .9;
    if (allIn && !reduce) spinT += (now - last) / 1000 * .22;
    last = now;
    const R = mobile ? Math.min(w * .4, h * .28) : Math.min(w * .24, h * .38, 400);
    const ca = Math.cos(spinT), sa = Math.sin(spinT), tilt = .32, ct = Math.cos(tilt), st = Math.sin(tilt);
    chips.forEach((c, i) => {
      let [x, y, z] = pts[i];
      [x, z] = [x * ca + z * sa, -x * sa + z * ca];
      [y, z] = [y * ct - z * st, y * st + z * ct];
      // 2) fly in from off screen and lock onto the sphere
      const k = ease(clamp((p - starts[i][2]) / .32));
      const sx = starts[i][0] * w, sy = starts[i][1] * h;
      const fx = x * R, fy = y * R * .92;
      const px = sx + (fx - sx) * k, py = sy + (fy - sy) * k;
      const s = (.7 + (z + 1) * .2) * (1.6 - .6 * k);
      c.style.transform = `translate(-50%, -50%) translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) scale(${s.toFixed(3)})`;
      c.style.zIndex = z > 0 ? 6 : 1;
      c.style.opacity = ((.28 + (z + 1) * .36) * k).toFixed(2);
      c.style.filter = k < 1 ? `blur(${((1 - k) * 6).toFixed(1)}px)` : (z < -.35 ? `blur(${((-z - .35) * 2.2).toFixed(1)}px)` : "");
    });
    requestAnimationFrame(spin);
  }
  requestAnimationFrame(spin);
  // chips in front of her must sit above the person layer: keep the orbit container out of stacking
  orbit.style.zIndex = "auto";

  /* ---------- her cut-out video (colour on the left half, mask on the right half) ---------- */
  const box = $("#person"), canvas = $("#pc");


  /* ---------- Journey: rolling outlined year + milestones moving up beside her ---------- */
  const STEPS = [
    { y: "2013", t: "High school", d: "Bharatiya Vidya Bhavan, Civil Lines, Nagpur, India." },
    { y: "2016", t: "Managing partner", d: "Nathibai Tulsidas Investments, Nagpur." },
    { y: "2021", t: "Bachelor of Commerce", d: "Rashtrasant Tukadoji Maharaj Nagpur University." },
    { y: "2021", t: "Forbes India", d: "Featured in \u201cWomen of Dalal Street\u201d. Invited speaker at FICCI FLO Ahmedabad." },
    { y: "2022", t: "Founder, WedNet", d: "A platform bringing couples, guests and vendors together to plan weddings in one place." },
    { y: "2023", t: "Led Community Campaign", d: "Led a campaign that brought my community to agree on new rules." },
    { y: "2026", t: "Master's, Project Management", d: "Harrisburg University. Information Systems Engineering and Management. GPA 4.00." }
  ];
  const ytrack = $("#ytrack"), ltrack = $("#ltrack"), jbar = $("#jbar"), journey = $("#journey");
  if (journey) {
    ytrack.innerHTML = STEPS.map(s => `<div>${[...s.y].map(ch => `<span>${ch}</span>`).join("")}</div>`).join("");
    ltrack.innerHTML = STEPS.map(s => `<div class="j-item"><span class="yr">${s.y}</span><h3>${s.t}</h3><p>${s.d}</p></div>`).join("");
    const items = [...ltrack.children];
    const list = $(".j-list");
    const ease = x => { const k = Math.min(1, Math.max(0, (x - .3) / .4)); return k * k * (3 - 2 * k); };  // hold on each year, then roll
    const pad = () => { ltrack.style.paddingBottom = Math.max(0, list.clientHeight - items[0].offsetHeight) + "px"; };
    const jScroll = () => {
      const ih = items[0].offsetHeight, max = (STEPS.length - 1) * ih;
      const f = Math.min(STEPS.length - 1, Math.max(0, list.scrollTop / ih));
      const i = Math.floor(f), g = Math.min(STEPS.length - 1, i + ease(f - i)), on = Math.round(f);
      ytrack.style.transform = `translateY(${-g}em)`;
      items.forEach((el, k) => el.classList.toggle("on", k === on));
      jbar.style.width = (max ? Math.min(1, list.scrollTop / max) * 100 : 0) + "%";
    };
    items.forEach((el, k) => el.addEventListener("click", () => list.scrollTo({ top: k * items[0].offsetHeight, behavior: "smooth" })));
    pad();
    list.addEventListener("scroll", jScroll, { passive: true }); addEventListener("resize", () => { pad(); jScroll(); }); jScroll();

    // put the year's second digit (the 0) right behind her head; the other digits stay clear on either side
    const her = $(".j-her"), years = $(".j-years");
    const placeYear = () => {
      const P = her.parentElement.getBoundingClientRect(), r = her.getBoundingClientRect();
      if (!r.width) return;
      const cx = r.left - P.left + r.width * .52, cy = r.top - P.top + r.height * .19;   // centre of her head in the photo
      const mobile = innerWidth <= 860, gutter = mobile ? 8 : 16;
      years.style.fontSize = "";
      const row = ytrack.firstElementChild, zero = row.children[1];
      const f0 = parseFloat(getComputedStyle(years).fontSize), rw = Math.max(...[...ytrack.children].map(d => d.scrollWidth));   // widest year, since digits differ in width
      if (!mobile) {
        // the year fills the space from the left edge to just before the text column, and she moves so the 0 sits behind her head
        const end = $(".j-side").getBoundingClientRect().left - P.left - 40;
        years.style.fontSize = f0 * (end - gutter) / rw + "px";
        years.style.left = gutter + "px";
        const zc = gutter + zero.offsetLeft + zero.offsetWidth / 2;
        her.style.left = (zc - r.width * .02) + "px";
      } else {
        her.style.left = "";
        const zc = zero.offsetLeft + zero.offsetWidth / 2;
        const f = Math.min(f0 * (cx - gutter) / zc, f0 * (P.width - 2 * gutter) / rw);
        years.style.fontSize = f + "px";
        let x = cx - (zero.offsetLeft + zero.offsetWidth / 2);
        x = Math.min(Math.max(x, gutter), P.width - gutter - Math.max(...[...ytrack.children].map(d => d.scrollWidth)));
        years.style.left = x + "px";
      }
      years.style.top = cy + "px";
    };
    her.complete ? placeYear() : her.addEventListener("load", placeYear);
    addEventListener("resize", placeYear);
    if (document.fonts) document.fonts.ready.then(placeYear);
  }

  /* ---------- Toolkit: periodic table (tools, certificates, degrees, experience) ---------- */
  // st: "done" | "now" | "next"
  const TABLE = [
    // Tools
    ["Tools","Ex","Microsoft Excel","Spreadsheets, models and trackers.","done"],
    ["Tools","Wd","Microsoft Word","Documents, requirements and reports.","done"],
    ["Tools","Pp","PowerPoint","Decks for stakeholders and pitches.","done"],
    ["Tools","Gs","Google Sheets","Shared trackers and budgets.","done"],
    ["Tools","Gd","Google Docs","Shared docs and meeting notes.","done"],
    ["Tools","Cl","Claude","AI for research, drafting and analysis.","done"],
    ["Tools","Gp","ChatGPT","AI for research and drafting.","done"],
    ["Tools","As","Asana","Task and project tracking.","now"],
    ["Tools","Jr","Jira","Agile boards, sprints and backlogs.","next"],
    ["Tools","Tr","Trello","Kanban boards.","now"],
    ["Tools","Sq","SQL","Querying data to back decisions.","now"],
    ["Tools","Tb","Tableau","Dashboards and data stories.","next"],
    ["Tools","Bi","Power BI","Dashboards and reporting.","next"],
    ["Tools","Fg","Figma","Wireframes and design reviews.","next"],
    ["Tools","Gh","GitHub","Version control and collaboration.","next"],
    // Degrees
    ["Degrees","BCom","Bachelor of Commerce","Rashtrasant Tukadoji Maharaj Nagpur University · 2021","done"],
    ["Degrees","MSPM","MS Project Management","Harrisburg University of Science and Technology · Information Systems Engineering and Management · GPA 4.00 · Spring 2028","now"],
    // Experience
    ["Experience","MgP","Managing Partner","Nathibai Tulsidas Investments, Nagpur · 2016–2022","done"],
    ["Experience","Fd","Founder, WedNet","Hyderabad · 2022–2023 · a team of six, idea to tested prototype","done"],
    ["Experience","Cm","Campaign lead","Brought 650 families in my community to one vote · 2023","done"],
    ["Experience","Sp","Invited speaker","FICCI FLO Ahmedabad · 2021","done"]
  ];
  const CERTS = [["GPM","Google Project Management Professional Certificate","Google · Coursera","Nov 2026","now"],["SQL","CS50's Introduction to Databases with SQL","Harvard University · CS50","Dec 2026","now"],
    ["CAPM","Certified Associate in Project Management","Project Management Institute","Jun 2027"],["MOS","Microsoft Office Specialist: Excel Associate","Microsoft","Jun 2027"],["TCH","CompTIA Tech+","CompTIA","Jun 2027"],
    ["SCS","Amazon Supply Chain Specialist","Amazon · Coursera","2027"],["SCM","Supply Chain Management","Rutgers University · Coursera","2027"],["PRS","Procurement and Sourcing","Rutgers University · Coursera","2027"],
    ["Py","CS50's Introduction to Programming with Python","Harvard University · CS50","Feb 2028"],["PCEP","Certified Entry-Level Python Programmer","Python Institute","Feb 2028"],["Stat","Introduction to Statistics","Stanford University · Coursera","Feb 2028"],
    ["PSM","Professional Scrum Master I","Scrum.org","Feb 2028"],["OCA","Oracle Database SQL Certified Associate","Oracle","May 2028"],["LSS","Lean Six Sigma Green Belt","IASSC","May 2028"],["dbt","dbt Analytics Engineering","dbt Labs","May 2028"],
    ["GHF","GitHub Foundations","GitHub","Aug 2028"],["PSE","Postman Student Expert","Postman","Aug 2028"],["MSPG","Microsoft Program Management","Microsoft · Coursera","Aug 2028"],["MSP","MSP Foundation","PeopleCert · Axelos","Aug 2028"],
    ["MBF","Managing Benefits Foundation","APMG International","Aug 2028"],["CTFL","ISTQB Certified Tester Foundation","ISTQB","Aug 2028"],["CCP","AWS Certified Cloud Practitioner","Amazon Web Services","Jan 2029"],
    ["SAA","AWS Solutions Architect – Associate","Amazon Web Services","Jan 2029"],["JIRA","Jira Fundamentals badge","Atlassian","Jan 2029"],["PSPO","Professional Scrum Product Owner I","Scrum.org","Jan 2029"],
    ["PCA","Prometheus Certified Associate","Linux Foundation · CNCF","May 2029"],["PBI","Power BI Data Analyst","Microsoft","May 2029"],["CC","ISC2 Certified in Cybersecurity","ISC2","May 2029"],
    ["ML","Machine Learning Specialization","DeepLearning.AI · Stanford","Nov 2029"],["AIP","AWS Certified AI Practitioner","Amazon Web Services","Nov 2029"],["CPMAI","PMI Certified Professional in Managing AI","Project Management Institute","Nov 2029"],
    ["AIGP","AI Governance Professional","IAPP","Nov 2029"],["GCA","Google Cloud AI Agents","Google Cloud · Coursera","Nov 2029"],["PRSC","Prosci Change Management","Prosci","Nov 2029"],
    ["CS50","CS50x Introduction to Computer Science","Harvard University · CS50","Mar 2030"],["BBC","Better Business Cases Foundation","APMG International","Mar 2030"],["MoP","Management of Portfolios Foundation","PeopleCert · Axelos","Mar 2030"],
    ["PMP","Project Management Professional","Project Management Institute","After graduation"]];
  CERTS.forEach(([s, n, by, when, st]) => TABLE.push(["Certificates", s, n, `${by} · ${st === "now" ? "target" : "planned"} ${when}`, st || "next"]));
  const ORDER = ["Experience", "Degrees", "Certificates", "Tools"];
  TABLE.sort((a, b) => ORDER.indexOf(a[0]) - ORDER.indexOf(b[0]));
  const grid = $("#ptable"), panel = $("#tpanel"), fams = $("#fams");
  if (grid) {
    const ST = { done: ["Done", "var(--blue)", "#fff"], now: ["In progress", "#E3E6F0", "var(--blue-deep)"], next: ["Planned", "#EEF0F5", "#5B6070"] };
    grid.innerHTML = TABLE.map((t, i) => `<button class="el ${t[4]}" data-i="${i}" data-f="${t[0]}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="s">${t[1]}</span><span class="nm">${t[2]}</span></button>`).join("");
    const els = [...grid.children];
    const show = i => { const t = TABLE[i], s = ST[t[4]]; els.forEach(e => e.classList.toggle("sel", e === els[i]));
      panel.innerHTML = `<div class="big" style="background:${s[1]};color:${s[2]}">${t[1]}</div><p class="fam">${t[0]}</p><h3>${t[2]}</h3><p>${t[3]}</p><span class="st" style="background:${s[1]};color:${s[2]}">${s[0]}</span>`; };
    els.forEach(e => { e.addEventListener("mouseenter", () => show(+e.dataset.i)); e.addEventListener("click", () => show(+e.dataset.i)); });
    show(0);
    fams.innerHTML = ["All", ...ORDER].map(f => `<button role="tab" aria-selected="${f === "All"}">${f}</button>`).join("");
    [...fams.children].forEach(b => b.onclick = () => {
      [...fams.children].forEach(x => x.setAttribute("aria-selected", x === b));
      const f = b.textContent; grid.classList.toggle("filtered", f !== "All");
      els.forEach(e => e.classList.toggle("lit", e.dataset.f === f));
      const first = els.find(e => e.dataset.f === f); if (first) show(+first.dataset.i);
    });
  }

  /* ---------- Recognition: each certificate is a rolled scroll tied with a ribbon.
     Once the section is 30% in view, the bow unties, the ribbon falls away,
     the scroll unrolls and confetti bursts. Plays by itself, one after another. ---------- */
  const certs = [...document.querySelectorAll(".cert-wrap")], recog = $("#recognition");
  certs.forEach(w => {
    const r = document.createElement("div"); r.className = "ribbon"; r.setAttribute("aria-hidden", "true");
    r.innerHTML = '<i class="band"></i><i class="bow"><b></b><b></b><s></s></i><i class="tail"></i><i class="tail"></i>';
    w.appendChild(r);
    const c = document.createElement("div"); c.className = "confetti"; c.setAttribute("aria-hidden", "true"); w.appendChild(c);
  });
  const COLORS = ["#1E2A55", "#D4A53C", "#2F4FD0", "#F1C75B", "#4A6CF0", "#B8862B"];   // blue and gold
  const burst = box => {
    for (let i = 0; i < 46; i++) {
      const p = document.createElement("span"), a = Math.random() * Math.PI - Math.PI, sp = 140 + Math.random() * 220;
      p.style.background = COLORS[i % COLORS.length];
      if (i % 3 === 0) p.style.borderRadius = "50%";
      box.appendChild(p);
      const dx = Math.cos(a) * sp, dy = Math.sin(a) * sp, rot = (Math.random() - .5) * 900;
      p.animate([
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot / 2}deg)`, opacity: 1, offset: .4 },
        { transform: `translate(${dx * 1.3}px, ${dy + 320}px) rotate(${rot}deg)`, opacity: 0 }
      ], { duration: 1800 + Math.random() * 900, easing: "cubic-bezier(.2,.6,.4,1)", fill: "forwards" }).onfinish = () => p.remove();
    }
  };
  const play = () => {
    certs.forEach((w, i) => {
      const t = i * 650;
      setTimeout(() => w.classList.add("untie"), t);              // the bow loosens
      setTimeout(() => w.classList.add("drop"), t + 550);         // the ribbon falls away
      setTimeout(() => { w.style.setProperty("--h", w.firstElementChild.offsetHeight + "px"); w.classList.add("open"); }, t + 900);   // the scroll unrolls
      setTimeout(() => burst(w.querySelector(".confetti")), t + 1500);   // confetti
      setTimeout(() => w.classList.add("done"), t + 2000);
    });
  };
  if (reduce || !("IntersectionObserver" in window)) certs.forEach(w => w.classList.add("untie", "drop", "open", "done"));
  else {
    const io = new IntersectionObserver(es => { if (es[0].intersectionRatio >= .3) { io.disconnect(); play(); } }, { threshold: [.3] });
    io.observe(recog);
  }

  /* ---------- scroll transitions ---------- */
  const giant = $(".giant"), left = $(".hero-left"), cue = $(".scroll-cue");
  const letters = [...giant.querySelectorAll(":scope > span")];
  letters.forEach(l => { l.innerHTML = `<i>${l.textContent}</i>`; });
  // line the name up so the I sits right behind her head and torso
  const placeName = () => {
    if (innerWidth <= 860) { giant.style.left = giant.style.right = ""; return; }
    const r = box.getBoundingClientRect(), H = giant.parentElement.getBoundingClientRect(), I = letters[2];
    const cx = r.left - H.left + r.width * .5;
    giant.style.right = "auto"; giant.style.fontSize = "";
    for (let n = 0; n < 12; n++) {     // shrink the name if it would run off the screen or into the headline
      const x = cx - (I.offsetLeft + I.offsetWidth / 2);
      giant.style.left = x + "px";
      if (x + giant.scrollWidth <= H.width - 8 && x >= 8) break;
      giant.style.fontSize = parseFloat(getComputedStyle(giant).fontSize) * .93 + "px";
    }
  };
  addEventListener("resize", placeName); if (document.fonts) document.fonts.ready.then(placeName); placeName();
  const curtains = [...document.querySelectorAll(".curtain")], about = $("#about");
  function onScroll() {
    const vh = innerHeight, p = Math.min(1, Math.max(0, scrollY / (vh * .75)));   // 0 at top, 1 when the next section has covered the hero
    if (!reduce) {
      // dispersion: blur, drift up and scatter as you scroll away
      // the wave: alternate letters split apart, P goes up, R goes down, I up, Y down...
      letters.forEach((l, i) => {
        const dir = i % 2 ? 1 : -1;
        l.style.transform = `translateY(${dir * p * (28 + i * 6)}vh)`;
        l.style.filter = `blur(${p * 10}px)`; l.style.opacity = 1 - p;
      });
      left.style.transform = `translateY(${-p * 45}vh)`; left.style.filter = `blur(${p * 8}px)`; left.style.opacity = 1 - p * 1.2;
      box.style.transform = `translateX(-50%) translateY(${-p * 6}vh) scale(${1 - p * .06})`; box.style.filter = `blur(${p * 6}px)`;
      cue.style.opacity = 1 - p * 3;
    }
    // About rises with a slanted top edge (low on the left, high on the right) that levels out as it arrives
    if (about) {
      const r = about.getBoundingClientRect(), q = Math.min(1, Math.max(0, (vh - r.top) / (vh * .85)));
      const s = reduce ? 0 : (1 - q) * vh * .45;
      about.style.clipPath = s < 1 ? "none" : `polygon(0 ${s.toFixed(1)}px, 100% 0, 100% 100%, 0 100%)`;
    }
    curtains.forEach(s => {
      const r = s.getBoundingClientRect(), q = Math.min(1, Math.max(0, (vh - r.top) / (vh * .9)));
      if (reduce) { s.style.clipPath = "none"; return; }
      if (s.classList.contains("from-left")) {   // slanted edge sweeps in from the left
        const a = -30 + q * 160;
        s.style.clipPath = q >= 1 ? "none" : `polygon(0 0, ${a}% 0, ${a - 30}% 100%, 0 100%)`;
      } else {                                  // slanted edge travels from right to left
        const a = 130 - q * 160;
        s.style.clipPath = q >= 1 ? "none" : `polygon(${a}% 0, 100% 0, 100% 100%, ${a - 30}% 100%)`;
      }
    });
  }
  addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); onScroll();

  // steps: the grey line is shorter than PROJECT, and PROJECT is shorter than MANAGER.
  const kicker = $("#kicker"), l1 = $("#pmtitle .l1");
  const fitKicker = () => {
    kicker.style.fontSize = "";
    const max = l1.offsetWidth * .86;
    if (kicker.scrollWidth > max) kicker.style.fontSize = parseFloat(getComputedStyle(kicker).fontSize) * max / kicker.scrollWidth + "px";
  };
  addEventListener("resize", fitKicker); if (document.fonts) document.fonts.ready.then(fitKicker); fitKicker();

  // one small WebGL renderer per canvas: colour on the left half, mask on the right half
  function renderer(cv, holder) {
    const gl = cv.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return null;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, "attribute vec2 p;varying vec2 u;void main(){u=vec2((p.x+1.)/2.,(1.-p.y)/2.);gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, "precision mediump float;varying vec2 u;uniform sampler2D t;void main(){vec3 c=texture2D(t,vec2(u.x*.5,u.y)).rgb;float a=smoothstep(.12,.55,texture2D(t,vec2(.5+u.x*.5,u.y)).r);gl_FragColor=vec4(c*a,a);}"));
    gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(k => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return v => {
      const dpr = Math.min(devicePixelRatio || 1, 2), w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr);
      if (!w || !h) return;
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      gl.viewport(0, 0, w, h);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, v);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      holder.classList.add("live");
    };
  }
  const drawHero = renderer(canvas, box);
  if (!drawHero) return;
  const jher = $("#jher"), drawJourney = jher ? renderer($("#jc"), jher) : null;
  const mk = (src, ver) => { const v = document.createElement("video"); const mp4 = v.canPlayType('video/mp4; codecs="avc1.640028"'); const q = ver ? "?v=" + ver : "";
    Object.assign(v, { src: mp4 ? src + ".mp4" + q : src + ".webm" + q, muted: true, playsInline: true, preload: "auto" }); v.setAttribute("playsinline", ""); v.setAttribute("muted", ""); return v; };
  const idle = mk("assets/priyal-idle"), talk = mk("assets/priyal-talking");
  idle.loop = true;
  let cur = idle, lastT = -1, lastV = null, lastJ = -1;
  const near = el => { const r = el.getBoundingClientRect(); return r.bottom > -200 && r.top < innerHeight + 200; };
  function draw() {
    if (cur.readyState >= 2 && (cur.currentTime !== lastT || cur !== lastV) && near(box)) { lastT = cur.currentTime; lastV = cur; drawHero(cur); }
    requestAnimationFrame(draw);
  }
  idle.addEventListener("loadeddata", () => { idle.play().catch(() => {}); draw(); }, { once: true });

  // Skills in orbit: she looks around as the skills form, then folds her arms and holds that pose
  const oher = $("#oher"), drawOrbit = oher ? renderer($("#oc"), oher) : null;
  let lastO = -1, lastW = -1;
  const look = mk("assets/priyal-look");
  orbitPlay = () => { look.currentTime = 0; look.play().catch(() => {}); };
  // hide the video layer while it jumps back, so the first-frame poster shows instead of the folded-arms frame
  orbitReset = () => { look.pause(); oher.classList.remove("live"); look.currentTime = 0; lastO = -1; };
  // Let's talk: she walks in, plays once each time the section comes into view
  // Let's talk: the original sitting video plays once each time the section comes into view
  const ther = $("#ther"), drawTalk = null, walk = $("#tvid");
  if (ther && "IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(en => {
    if (en.intersectionRatio >= .4) { if (walk.paused) { walk.currentTime = 0; walk.play().catch(() => {}); } }
    else if (!en.isIntersecting) { walk.pause(); walk.currentTime = 0; }
  }), { threshold: [0, .4] }).observe(ther);
  (function draw2() {
    if (drawOrbit && look.readyState >= 2 && !look.seeking && look.currentTime !== lastO && near(oher)) { lastO = look.currentTime; drawOrbit(look); }
    if (drawTalk && walk.readyState >= 2 && !walk.seeking && walk.currentTime !== lastW && near(ther)) { lastW = walk.currentTime; drawTalk(walk); }
    requestAnimationFrame(draw2);
  })();

  // "Hear my intro": plays her talking clip with sound, then back to standing and waving
  const btn = $("#intro");
  btn.onclick = () => {
    if (cur === talk && !talk.paused) { talk.pause(); cur = idle; btn.textContent = "▶ Hear my intro"; return; }
    cur = talk; talk.muted = false; talk.currentTime = 0; talk.play().catch(() => {}); btn.textContent = "■ Stop";
  };
  talk.addEventListener("ended", () => { cur = idle; btn.textContent = "▶ Hear my intro"; });
})();
