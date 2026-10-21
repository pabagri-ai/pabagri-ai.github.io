/* =====================================================================
   THE PORTFOLIO — all words, numbers, skills and stories live here.
   Edit this file to change the site. Design lives in theme.css.
   [[to confirm: ...]] shows on the page as a highlighted note.
   ===================================================================== */
window.CONTENT = {
  draft: true, // shows the small "Draft edition" stamp. Set to false when final.

  person: {
    name: "Priyal Bagri",
    first: "Priyal",
    city: "Madison, Wisconsin",
    email: "priyalbagri30@gmail.com",
    linkedin: "https://www.linkedin.com/in/priyal-bagri-003b93365/",
    phone: "", // left blank so the public site shows only LinkedIn and email
    photo: "assets/photos/priyal.jpg",
    avatar: { src: "assets/avatar/priyal-talking.mp4", poster: "assets/avatar/priyal-cutout.png", still: "assets/avatar/priyal-still.png", aspect: 0.3416 }, // cut-out talking video: colour on the left half, see-through mask on the right half
    video: "", // a short moving-photo clip, e.g. "assets/photos/priyal-moving.mp4" (plays silently on loop, sound on tap)
    motto: "I mobilize teams to deliver work that creates direct impact."
  },

  /* ---------------- FRONT PAGE ---------------- */
  front: {
    masthead: "The Portfolio",
    edition: "Vol. I · No. 1",
    date: "Tuesday, October 20, 2026",
    price: "Madison, Wisconsin, USA",
    earLeft: "Special feature",
    earLeftSub: "Priyal Bagri",
    earRight: "Investor · Trader · Entrepreneur · Project Manager",
    kicker: "About Priyal",
    headline: "Built to deliver",
    deck: "Self-taught investor, startup founder and community organiser, Priyal Bagri gets people moving and gets work delivered. Next up: technology and AI programs.",
    byline: "By The Portfolio staff",
    photoCaption: "Priyal Bagri in Madison, Wisconsin.",
    photoCredit: "Photo: The Portfolio",
    split: 4,
    article: [
      "Priyal Bagri taught herself the stock market, and then she made it pay. As managing partner of Nathibai Tulsidas Investments in Nagpur, India, she grew the firm's capital twelvefold, from $50,000 to $600,000, over six years while she finished her degree.",
      "The results got noticed. In 2021 Forbes India named her one of its \"Women of Dalal Street,\" and FICCI FLO invited her to speak in Ahmedabad. Behind the numbers was a system she ran herself: a research and risk check before every investment, regular performance reports, and steady work with brokers, accountants and partners.",
      "Bagri is at her best when she is mobilizing people toward a common goal. In her Hyderabad community she brought 650 resident families to vote for one direction, and she did it by showing every side what the change would mean for them. It was a win built on communication, not authority.",
      "She found the same energy in India's wedding market, one of its most disorganised industries. In 2022 she co-founded WedNet to bring couples, guests and vendors into one place, built a team of six, and ran countless vendor interviews, guest surveys and prototypes, learning each new skill as the work demanded it.",
      "When the research showed the market was closed to an open platform, she made the call most founders avoid. She stopped before launch and protected about 47% of the starting capital.",
      "\u201cI am kinetic. I learn as I go,\u201d she said. \u201cWhat helps me is that I am highly organised and motivated, and my motivation comes from wanting to take something to its final delivery and create impact.\u201d",
      "She loves technology and the processes behind it, and delivering in technology is what excites her most. She is driven to join the technical side of project teams and wishes to work with cross-functional teams, and for this she is honing the skills to understand the full spectrum in which these teams perform.",
      "To get there, she is pursuing a Master of Science in Project Management at Harrisburg University of Science and Technology in Pennsylvania, with a concentration in Information Systems Engineering and Management, and she holds a GPA of 4.00. Her focus is AI programs, and getting hands-on with projects that deliver real impact."
    ],
    pullQuote: "\u201cI am kinetic. I learn as I go.\u201d",
    pullAfter: 7, // the pull quote sits after this paragraph
    breakout: "She brought 650 families to one vote by showing them what it meant for them.",
    breakoutAfter: 2, // the bold breakout line sits after this paragraph
    breakout2: "She feels the most energised when she is mobilizing people toward a common goal.",
    breakout2After: 3, // a second bold line at the bottom of the left column
    breakout3: "She set up the workflows, wrote the requirements and ran the testing that told her when to stop.",
    breakout3After: 5, // a bold line in the right column
    spotlight: {
      title: "Spotlight",
      sub: "What she believes",
      body: [
        "Ask the hard question early. At WedNet she asked whether the market could support the product before the money ran out, not after.",
        "Deliver start to finish. \u201cIt energises me to deliver something from start to finish, and to get people moving toward one goal,\u201d she said.",
        "Get people moving toward one goal. Six people wearing different hats every day still need one plan.",
        "Learn what the work needs. She taught herself to build WedNet, and she puts knowledge ahead of certificates."
      ]
    },
    continued: "Continued inside: read the full story",
    signOff: "Watch her portfolio",
    alsoInside: [
      { story: "wednet", label: "WedNet: the call to stop" },
      { story: "nathibai", label: "Six years in the markets" },
      { story: "krishe", label: "650 families, one set of rules" }
    ],
    tickerNumbers: [
      "12× capital growth", "$50K → $600K", "Forbes India · Women of Dalal Street 2021",
      "FICCI FLO Ahmedabad speaker",
      "2,000 Instagram followers in 7 days", "47% of capital kept", "650 resident families"
    ]
  },

  /* ---------------- SEARCH TRANSITION ---------------- */
  search: {
    typed: "Priyal",
    suggestions: [
      "Priyal Bagri Forbes India",
      "Priyal Bagri FICCI FLO speaker",
      "Priyal Bagri WedNet founder",
      "Priyal's portfolio"
    ],
    pick: 3 // which suggestion the cursor clicks (0 = first)
  },

  /* ---------------- PORTFOLIO (HOLDINGS) ----------------
     status: "holding" (done) | "accumulating" (in progress) | "watchlist" (planned)
     To add a skill: copy one block, change the fields. Put certificate files in
     assets/certificates/ and write the path in `certificate`.
  */
  holdingsIntro: "Hi, I'm Priyal. Watch my portfolio grow.",
  sectors: ["Project Management", "Data", "Tech", "AI", "Tools"], // tabs only appear for sectors that have certificates
  /* Certificates only.
     status: "holding" (earned) | "accumulating" (in progress) | "watchlist" (planned)
     badge: image shown in the white box. One path, or a list to swipe through, e.g.
            ["assets/certificates/logo.png", { src: "assets/certificates/photo.jpg", cover: true }]
     certificate: path to the certificate PDF or image (opens full size). */
  holdings: [
    { code: "MSPM", name: "MS Project Management, concentration in Information Systems Engineering and Management (ISEM)", issuer: "Harrisburg University of Science and Technology · PMI GAC accredited", sector: "Project Management", status: "accumulating", started: "May 2026", target: "Spring 2028", badge: ["assets/certificates/hu-banner-gac.png", { src: "assets/certificates/hu-campus.jpg", cover: true, alt: "Harrisburg University campus, 326 Market Street" }], skills: [{n:  "Project management process groups: initiate, plan, execute, monitor, close", d:  "Project Management", via:  "PMGT 510", st:  "holding"}, {n:  "Waterfall and agile delivery", d:  "Project Management", via:  "PMGT 510", st:  "holding"}, {n:  "Project tools and techniques", d:  "Project Management", via:  "PMGT 510", st:  "holding"}, {n:  "Ethical use of LLMs in project work", d:  "AI", via:  "PMGT 511", st:  "holding"}, {n:  "LLM-supported risk, resource and stakeholder decisions", d:  "AI", via:  "PMGT 511", st:  "holding"}, {n:  "Scoping, budgeting and scheduling a project", d:  "Project Management", via:  "PMGT 540", st:  "accumulating"}, {n:  "Controlling scope, schedule and cost", d:  "Project Management", via:  "PMGT 540", st:  "accumulating"}, {n:  "Core project artifacts for stakeholders", d:  "Project Management", via:  "PMGT 540", st:  "accumulating"}, {n:  "Leading organizational change", d:  "Business", via:  "MGMT 560", st:  "accumulating"}, {n:  "Negotiation and conflict resolution", d:  "Business", via:  "MGMT 560", st:  "accumulating"}, {n:  "Building relationships and human capital", d:  "Business", via:  "MGMT 560", st:  "accumulating"}, {n:  "Business ethics and professional conduct", d:  "Business", via:  "MGMT 560", st:  "accumulating"}, {n:  "Risk management plans and risk registers", d:  "Project Management", via:  "PMGT 530", st:  "watchlist"}, {n:  "Procurement planning and contract types", d:  "Project Management", via:  "PMGT 530", st:  "watchlist"}, {n:  "Vendor selection and writing an RFP", d:  "Project Management", via:  "PMGT 530", st:  "watchlist"}, {n:  "Agile project management with Scrum", d:  "Project Management", via:  "PMGT 570", st:  "watchlist"}, {n:  "Agile at the enterprise level", d:  "Project Management", via:  "PMGT 570", st:  "watchlist"}, {n:  "Digital transformation strategy", d:  "Business", via:  "ISEM 500", st:  "watchlist"}, {n:  "Information system building blocks: processes, enterprise apps, databases, cloud, web, AI and networks", d:  "Tech", via:  "ISEM 500", st:  "watchlist"}, {n:  "Planning, integrating and securing global systems", d:  "Tech", via:  "ISEM 500", st:  "watchlist"}, {n:  "AI concepts: problem solving, knowledge representation, reasoning and learning", d:  "AI", via:  "ISEM 503", st:  "watchlist"}, {n:  "Expert systems and knowledge management", d:  "AI", via:  "ISEM 503", st:  "watchlist"}, {n:  "AI applications in business", d:  "AI", via:  "ISEM 503", st:  "watchlist"}, {n:  "Business requirements and business-process modelling", d:  "Tech", via:  "ISEM 530", st:  "watchlist"}, {n:  "System life cycles and conceptual models", d:  "Tech", via:  "ISEM 530", st:  "watchlist"}, {n:  "Object orientation, design patterns and component-based design", d:  "Tech", via:  "ISEM 530", st:  "watchlist"}, {n:  "Designing secure, integrated system architectures", d:  "Tech", via:  "ISEM 530", st:  "watchlist"}, {n:  "Service-oriented architecture (SOA)", d:  "Tech", via:  "ISEM 540", st:  "watchlist"}, {n:  "Enterprise models and system integration", d:  "Tech", via:  "ISEM 540", st:  "watchlist"}, {n:  "B2B and on-demand business services", d:  "Business", via:  "ISEM 540", st:  "watchlist"}, {n:  "Research design and academic writing", d:  "Business", via:  "GRAD 695 · 699", st:  "watchlist"}, {n:  "Applied research: graduate thesis", d:  "Business", via:  "GRAD 695 · 699", st:  "watchlist"}] },
    { code: "GPM", name: "Google Project Management Professional Certificate", issuer: "Google · Coursera", sector: "Project Management", status: "accumulating", started: "Oct 2026", target: "Nov 2026", badge: "assets/certificates/gpm-logo.png", skills: [{n:  "Project initiation: goals, scope and deliverables", d:  "Project Management"}, {n:  "Stakeholder analysis and RACI charts", d:  "Project Management"}, {n:  "Planning schedules, budgets and procurement", d:  "Project Management"}, {n:  "Project risk management", d:  "Project Management"}, {n:  "Quality management and quality assurance", d:  "Project Management"}, {n:  "Change management", d:  "Project Management"}, {n:  "Team leadership and stakeholder communication", d:  "Project Management"}, {n:  "Agile, Scrum and backlogs", d:  "Project Management"}, {n:  "Project closure", d:  "Project Management"}, {n:  "Project tracking tools: spreadsheets, Gantt charts, Asana", d:  "Tools"}] },
    { code: "SQL", name: "CS50's Introduction to Databases with SQL", issuer: "Harvard University · CS50", sector: "Data", status: "accumulating", started: "Oct 2026", target: "Dec 2026", skills: [{n:  "Writing SQL queries to read data", d:  "Data"}, {n:  "Linking tables with joins and relationships", d:  "Data"}, {n:  "Designing database schemas", d:  "Data"}, {n:  "Inserting, updating and deleting data", d:  "Data"}, {n:  "Creating views", d:  "Data"}, {n:  "Speeding up queries with indexes", d:  "Data"}, {n:  "Scaling databases", d:  "Tech"}] },
    { code: "CAPM", name: "Certified Associate in Project Management", issuer: "Project Management Institute", sector: "Project Management", status: "watchlist", started: "Nov 2026", target: "Jun 2027", skills: [{n:  "Explaining project life cycles, processes and team roles", d:  "Project Management"}, {n:  "Building and controlling a predictive (plan-based) schedule", d:  "Project Management"}, {n:  "Choosing between a predictive and an agile approach", d:  "Project Management"}, {n:  "Planning agile iterations and managing tasks", d:  "Project Management"}, {n:  "Using common problem-solving tools and techniques", d:  "Project Management"}, {n:  "Gathering and validating requirements", d:  "Business"}, {n:  "Communicating with stakeholders", d:  "Business"}, {n:  "Reading and using product roadmaps", d:  "Business"}] },
    { code: "MOS", name: "Microsoft Office Specialist: Excel Associate (MO-210)", issuer: "Microsoft", sector: "Data", status: "watchlist", started: "Nov 2026", target: "Jun 2027", skills: [{n:  "Importing data from text files and online sources into Excel", d:  "Tools"}, {n:  "Setting up page layout, print areas, frozen panes and workbook views", d:  "Tools"}, {n:  "Using named ranges, sparklines and conditional formatting", d:  "Tools"}, {n:  "Creating tables, then sorting and filtering by several columns", d:  "Tools"}, {n:  "Writing formulas with relative, absolute and structured references", d:  "Tools"}, {n:  "Using SUM, COUNT, IF, SORT and UNIQUE functions", d:  "Data"}, {n:  "Cleaning text with LEFT, MID, LEN, CONCAT and TEXTJOIN", d:  "Data"}, {n:  "Building and formatting charts", d:  "Data"}] },
    { code: "TCH+", name: "CompTIA Tech+", issuer: "CompTIA", sector: "Tech", status: "watchlist", started: "Nov 2026", target: "Jun 2027", skills: [{n:  "Using number systems and units of storage and speed", d:  "Tech"}, {n:  "Following a troubleshooting method", d:  "Tech"}, {n:  "Identifying computer parts, storage types and peripherals", d:  "Tech"}, {n:  "Explaining virtualization, cloud models and basic networking", d:  "Tech"}, {n:  "Explaining operating systems, software types and common AI uses", d:  "Tech"}, {n:  "Explaining programming basics: data types, variables, functions, branching and loops", d:  "Tech"}, {n:  "Comparing relational and non-relational databases, and backup basics", d:  "Data"}, {n:  "Applying security basics: confidentiality, integrity and availability, login checks, passwords and encryption", d:  "Tech"}] },
    { code: "AMZSC", name: "Amazon Supply Chain Specialist Professional Certificate", issuer: "Amazon · Coursera", sector: "Data", status: "watchlist", started: "2027", target: "2027", skills: [{n:  "Explaining the supply chain life cycle and how inventory, procurement and logistics work", d:  "Business"}, {n:  "Forecasting demand and planning supply", d:  "Data"}, {n:  "Analyzing supply chain data, performance metrics and cost or budget data", d:  "Data"}, {n:  "Evaluating supplier performance and supplier risk", d:  "Business"}, {n:  "Designing a network using cost, service and sustainability factors", d:  "Business"}, {n:  "Applying continuous improvement and quality tools", d:  "Business"}, {n:  "Using AI insights and AWS tools for supply chain analytics", d:  "AI"}] },
    { code: "RSCM", name: "Supply Chain Management Specialization", issuer: "Rutgers University · Coursera", sector: "Data", status: "watchlist", started: "2027", target: "2027", skills: [{n:  "Comparing transportation modes and setting up warehouses", d:  "Business"}, {n:  "Managing inventory to keep costs low while still serving customers", d:  "Business"}, {n:  "Improving a process with Six Sigma", d:  "Business"}, {n:  "Cutting waste with Lean methods", d:  "Business"}, {n:  "Building demand forecasts and choosing the best one", d:  "Data"}, {n:  "Building a Sales and Operations Plan", d:  "Business"}, {n:  "Selecting, grouping and managing suppliers", d:  "Business"}, {n:  "Writing a supply chain strategy for a real case", d:  "Business"}] },
    { code: "RPS", name: "Procurement and Sourcing Specialization", issuer: "Rutgers University · Coursera", sector: "Data", status: "watchlist", started: "2027", target: "2027", skills: [{n:  "Mapping a basic procurement process and telling direct from indirect buying", d:  "Business"}, {n:  "Running a 7-step strategic sourcing process", d:  "Business"}, {n:  "Selecting and evaluating suppliers", d:  "Business"}, {n:  "Choosing contract types and reducing supplier risk", d:  "Business"}, {n:  "Analyzing supply markets with PESTLE, Five Forces and SWOT", d:  "Business"}, {n:  "Analyzing supplier finances", d:  "Business"}, {n:  "Planning and running a procurement negotiation using BATNA", d:  "Business"}, {n:  "Managing internal stakeholders and applying procurement ethics", d:  "Business"}] },
    { code: "CS50P", name: "CS50's Introduction to Programming with Python", issuer: "Harvard University · CS50", sector: "Tech", status: "watchlist", started: "Jun 2027", target: "Feb 2028", skills: [{n:  "Writing Python functions and variables", d:  "Tech"}, {n:  "Using conditionals and loops", d:  "Tech"}, {n:  "Handling exceptions", d:  "Tech"}, {n:  "Using libraries", d:  "Tech"}, {n:  "Writing unit tests", d:  "Tech"}, {n:  "Reading and writing files", d:  "Tech"}, {n:  "Using regular expressions", d:  "Tech"}, {n:  "Writing object-oriented Python code", d:  "Tech"}] },
    { code: "PCEP", name: "Certified Entry-Level Python Programmer", issuer: "Python Institute", sector: "Tech", status: "watchlist", started: "Jun 2027", target: "Feb 2028", skills: [{n:  "Explaining compilation, interpretation and the Python runtime", d:  "Tech"}, {n:  "Using literals, variables and number systems", d:  "Tech"}, {n:  "Using operators and data types", d:  "Tech"}, {n:  "Handling input and output", d:  "Tech"}, {n:  "Controlling program flow with conditionals and loops", d:  "Tech"}, {n:  "Working with lists, tuples, dictionaries and strings", d:  "Tech"}, {n:  "Writing functions, including generators and recursion", d:  "Tech"}, {n:  "Handling exceptions", d:  "Tech"}] },
    { code: "STAT", name: "Introduction to Statistics", issuer: "Stanford University · Coursera", sector: "Data", status: "watchlist", started: "Jun 2027", target: "Feb 2028", skills: [{n:  "Exploring data with descriptive statistics and charts", d:  "Data"}, {n:  "Explaining sampling and how data is collected", d:  "Data"}, {n:  "Working with probability, the binomial distribution and the normal distribution", d:  "Data"}, {n:  "Applying sampling distributions and the central limit theorem", d:  "Data"}, {n:  "Building and reading regression", d:  "Data"}, {n:  "Calculating confidence intervals and running significance tests", d:  "Data"}, {n:  "Using resampling methods", d:  "Data"}, {n:  "Analyzing categorical data and one-way ANOVA", d:  "Data"}] },
    { code: "PSM", name: "Professional Scrum Master I", issuer: "Scrum.org", sector: "Project Management", status: "watchlist", started: "Jun 2027", target: "Feb 2028", skills: [{n:  "Explaining empiricism and Scrum values", d:  "Project Management"}, {n:  "Running Scrum events and keeping Scrum artifacts", d:  "Project Management"}, {n:  "Setting and using a Definition of Done", d:  "Project Management"}, {n:  "Coaching and facilitating teams that manage themselves", d:  "Project Management"}, {n:  "Forecasting and release planning", d:  "Project Management"}, {n:  "Managing the Product Backlog", d:  "Project Management"}, {n:  "Working with stakeholders and customers", d:  "Business"}] },
    { code: "OCA", name: "Oracle Database SQL Certified Associate (1Z0-071)", issuer: "Oracle", sector: "Data", status: "watchlist", started: "Feb 2028", target: "May 2028", skills: [{n:  "Writing basic SELECT statements, then restricting and sorting results", d:  "Data"}, {n:  "Writing table joins", d:  "Data"}, {n:  "Using single-row, conversion and group functions", d:  "Data"}, {n:  "Writing subqueries and set operators", d:  "Data"}, {n:  "Changing data with DML and controlling transactions", d:  "Data"}, {n:  "Creating and managing tables and schema objects with DDL", d:  "Data"}, {n:  "Using data dictionary views and controlling user access", d:  "Data"}] },
    { code: "LSS", name: "Lean Six Sigma Green Belt", issuer: "IASSC", sector: "Project Management", status: "watchlist", started: "Feb 2028", target: "May 2028", skills: [{n:  "Writing a project charter and business case and selecting projects", d:  "Project Management"}, {n:  "Applying Lean, the seven wastes and 5S", d:  "Business"}, {n:  "Mapping processes with SIPOC, value stream maps, fishbone diagrams and FMEA", d:  "Business"}, {n:  "Checking measurement systems with Gage R&R", d:  "Data"}, {n:  "Analyzing process capability", d:  "Data"}, {n:  "Running hypothesis tests such as t-tests, ANOVA and chi-squared", d:  "Data"}, {n:  "Building simple and multiple regression models", d:  "Data"}, {n:  "Building control charts and control plans", d:  "Data"}] },
    { code: "DBT", name: "dbt Analytics Engineering Certification", issuer: "dbt Labs", sector: "Data", status: "watchlist", started: "Feb 2028", target: "May 2028", skills: [{n:  "Building and optimizing dbt models", d:  "Data"}, {n:  "Applying model governance in dbt", d:  "Data"}, {n:  "Debugging data modeling errors", d:  "Data"}, {n:  "Troubleshooting and optimizing dbt pipelines", d:  "Data"}, {n:  "Writing dbt tests", d:  "Data"}, {n:  "Managing external dependencies", d:  "Tools"}, {n:  "Using dbt state", d:  "Tools"}] },
    { code: "GHF", name: "GitHub Foundations", issuer: "GitHub", sector: "Tools", status: "watchlist", started: "May 2028", target: "Aug 2028", skills: [{n:  "Explaining Git and GitHub basics", d:  "Tools"}, {n:  "Working with GitHub repositories", d:  "Tools"}, {n:  "Collaborating on GitHub", d:  "Tools"}, {n:  "Applying modern development practices", d:  "Tech"}, {n:  "Managing projects with GitHub", d:  "Project Management"}, {n:  "Applying GitHub privacy, security and admin settings", d:  "Tools"}, {n:  "Taking part in the GitHub community", d:  "Tools"}] },
    { code: "PSE", name: "Postman Student Expert", issuer: "Postman", sector: "Tools", status: "watchlist", started: "May 2028", target: "Aug 2028" },
    { code: "MSPG", name: "Microsoft Program Management Professional Certificate", issuer: "Microsoft · Coursera", sector: "Project Management", status: "watchlist", started: "May 2028", target: "Aug 2028", skills: [{n:  "Telling projects, programs and portfolios apart, and planning and controlling a program", d:  "Project Management"}, {n:  "Building and leading teams through the stages of team development", d:  "Project Management"}, {n:  "Matching stakeholder communication to strategy and culture", d:  "Business"}, {n:  "Applying the eight project performance domains", d:  "Project Management"}, {n:  "Running projects with agile and hybrid approaches", d:  "Project Management"}, {n:  "Tracking performance with Earned Value Management", d:  "Project Management"}, {n:  "Ranking investments by return on investment", d:  "Business"}, {n:  "Setting up a high-performing PMO", d:  "Project Management"}] },
    { code: "MSP", name: "MSP Foundation (Managing Successful Programmes)", issuer: "PeopleCert · Axelos", sector: "Project Management", status: "watchlist", started: "May 2028", target: "Aug 2028", skills: [{n:  "Defining a program and when to use program management", d:  "Project Management"}, {n:  "Applying the seven MSP principles", d:  "Project Management"}, {n:  "Setting up program organization, governance and decisions", d:  "Project Management"}, {n:  "Designing the program and its justification", d:  "Project Management"}, {n:  "Structuring the program and managing knowledge and assurance", d:  "Project Management"}, {n:  "Running the program life cycle from identify to close", d:  "Project Management"}] },
    { code: "MBF", name: "Managing Benefits Foundation", issuer: "APMG International", sector: "Project Management", status: "watchlist", started: "May 2028", target: "Aug 2028", skills: [{n:  "Explaining what benefits management is and why it matters", d:  "Business"}, {n:  "Applying the seven benefits management principles", d:  "Business"}, {n:  "Running the five practices of the Benefits Management Cycle", d:  "Business"}, {n:  "Managing benefits at portfolio, program and project level", d:  "Project Management"}, {n:  "Using benefits management techniques, roles and documents", d:  "Project Management"}, {n:  "Setting up benefits management and keeping it going", d:  "Business"}] },
    { code: "CTFL", name: "ISTQB Certified Tester Foundation Level", issuer: "ISTQB", sector: "Tech", status: "watchlist", started: "May 2028", target: "Aug 2028", skills: [{n:  "Explaining why testing matters and the principles of testing", d:  "Tech"}, {n:  "Matching test levels and test types to the software development life cycle", d:  "Tech"}, {n:  "Running reviews and other static testing", d:  "Tech"}, {n:  "Designing tests with black-box, white-box and experience-based techniques", d:  "Tech"}, {n:  "Planning tests and managing risk", d:  "Project Management"}, {n:  "Monitoring test progress and writing clear defect reports", d:  "Tech"}, {n:  "Weighing the risks and benefits of test automation tools", d:  "Tools"}] },
    { code: "CCP", name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", sector: "Tech", status: "watchlist", started: "Aug 2028", target: "Jan 2029", skills: [{n:  "Explaining cloud concepts and benefits", d:  "Tech"}, {n:  "Applying AWS security and compliance basics", d:  "Tech"}, {n:  "Describing AWS global infrastructure and ways to deploy", d:  "Tech"}, {n:  "Identifying AWS compute, database, network and storage services", d:  "Tech"}, {n:  "Identifying AWS AI, machine learning and analytics services", d:  "AI"}, {n:  "Explaining AWS billing, pricing and support", d:  "Business"}] },
    { code: "SAA", name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", sector: "Tech", status: "watchlist", started: "Aug 2028", target: "Jan 2029", skills: [{n:  "Designing secure architectures on AWS", d:  "Tech"}, {n:  "Designing resilient, highly available architectures", d:  "Tech"}, {n:  "Designing high-performing architectures", d:  "Tech"}, {n:  "Designing cost-optimized architectures", d:  "Tech"}] },
    { code: "JIRA", name: "Jira Fundamentals badge", issuer: "Atlassian", sector: "Tools", status: "watchlist", started: "Aug 2028", target: "Jan 2029", skills: [{n:  "Using key Jira terms and concepts", d:  "Tools"}, {n:  "Navigating Jira", d:  "Tools"}, {n:  "Applying beginner best practices in Jira", d:  "Tools"}] },
    { code: "PSPO", name: "Professional Scrum Product Owner I", issuer: "Scrum.org", sector: "Project Management", status: "watchlist", started: "Aug 2028", target: "Jan 2029", skills: [{n:  "Explaining empiricism, the Scrum Team, events and artifacts", d:  "Project Management"}, {n:  "Working with self-managing teams", d:  "Project Management"}, {n:  "Creating a product vision and tying it to business strategy", d:  "Business"}, {n:  "Measuring product value", d:  "Business"}, {n:  "Managing the Product Backlog", d:  "Project Management"}, {n:  "Forecasting and release planning", d:  "Project Management"}, {n:  "Working with stakeholders and customers", d:  "Business"}] },
    { code: "PCA", name: "Prometheus Certified Associate", issuer: "Linux Foundation · CNCF", sector: "Tools", status: "watchlist", started: "Jan 2029", target: "May 2029", skills: [{n:  "Explaining metrics, logs, traces and SLOs, SLAs and SLIs", d:  "Tech"}, {n:  "Configuring Prometheus scraping and its data model", d:  "Tools"}, {n:  "Writing PromQL queries", d:  "Tools"}, {n:  "Adding metrics to code with client libraries and exporters", d:  "Tech"}, {n:  "Writing alerting rules and using Alertmanager", d:  "Tools"}, {n:  "Building monitoring dashboards", d:  "Tools"}] },
    { code: "PBI", name: "Power BI Data Analyst (PL-300 learning path)", issuer: "Microsoft", sector: "Tools", status: "watchlist", started: "Jan 2029", target: "May 2029", skills: [{n:  "Connecting to data sources in Power BI", d:  "Tools"}, {n:  "Profiling and cleaning data in Power Query", d:  "Data"}, {n:  "Building fact and dimension tables and relationships", d:  "Data"}, {n:  "Writing DAX measures, including CALCULATE and time intelligence", d:  "Data"}, {n:  "Building reports and visuals that tell a clear story", d:  "Data"}, {n:  "Finding trends, outliers and forecasts in reports", d:  "Data"}, {n:  "Managing workspaces, apps and scheduled refresh", d:  "Tools"}, {n:  "Setting up row-level security and sensitivity labels", d:  "Tools"}] },
    { code: "CC", name: "ISC2 Certified in Cybersecurity", issuer: "ISC2", sector: "Tech", status: "watchlist", started: "Jan 2029", target: "May 2029", skills: [{n:  "Applying the CIA triad and security risk management", d:  "Tech"}, {n:  "Explaining security governance, policies and controls", d:  "Business"}, {n:  "Planning business continuity and disaster recovery", d:  "Tech"}, {n:  "Managing identity and access with least privilege", d:  "Tech"}, {n:  "Explaining network security, zero trust and cloud shared responsibility", d:  "Tech"}, {n:  "Classifying data and using encryption", d:  "Tech"}, {n:  "Logging, monitoring and responding to incidents", d:  "Tech"}] },
    { code: "MLS", name: "Machine Learning Specialization", issuer: "DeepLearning.AI · Stanford · Coursera", sector: "AI", status: "watchlist", started: "May 2029", target: "Nov 2029", skills: [{n:  "Building linear and logistic regression models in Python", d:  "AI"}, {n:  "Using NumPy and scikit-learn", d:  "Tools"}, {n:  "Training neural networks in TensorFlow for multi-class classification", d:  "AI"}, {n:  "Building decision trees, random forests and boosted trees", d:  "AI"}, {n:  "Applying best practices so models work on real data", d:  "AI"}, {n:  "Using clustering and anomaly detection", d:  "AI"}, {n:  "Building recommender systems", d:  "AI"}, {n:  "Building a deep reinforcement learning model", d:  "AI"}] },
    { code: "AIP", name: "AWS Certified AI Practitioner", issuer: "Amazon Web Services", sector: "AI", status: "watchlist", started: "May 2029", target: "Nov 2029", skills: [{n:  "Explaining AI and machine learning basics", d:  "AI"}, {n:  "Explaining generative AI basics", d:  "AI"}, {n:  "Designing applications that use foundation models", d:  "AI"}, {n:  "Choosing prompt engineering techniques", d:  "AI"}, {n:  "Explaining how foundation models are trained and fine-tuned", d:  "AI"}, {n:  "Evaluating foundation model performance", d:  "AI"}, {n:  "Applying responsible AI guidelines", d:  "AI"}, {n:  "Applying security, compliance and governance to AI solutions", d:  "AI"}] },
    { code: "CPMAI", name: "PMI Certified Professional in Managing AI", issuer: "Project Management Institute", sector: "AI", status: "watchlist", started: "May 2029", target: "Nov 2029", skills: [{n:  "Matching AI solutions to business needs, feasibility and return on investment", d:  "Business"}, {n:  "Scoping AI projects with iterative delivery", d:  "Project Management"}, {n:  "Finding the data AI needs and meeting compliance rules", d:  "Data"}, {n:  "Preparing data with quality checks", d:  "Data"}, {n:  "Overseeing the building and checking of models", d:  "AI"}, {n:  "Testing, monitoring and handling model drift", d:  "AI"}, {n:  "Deploying AI responsibly with governance", d:  "AI"}] },
    { code: "AIGP", name: "Artificial Intelligence Governance Professional", issuer: "IAPP", sector: "AI", status: "watchlist", started: "May 2029", target: "Nov 2029", skills: [{n:  "Explaining what AI is and why it needs governance", d:  "AI"}, {n:  "Writing AI governance policies across the AI life cycle", d:  "AI"}, {n:  "Applying privacy, IP and anti-discrimination laws to AI", d:  "Business"}, {n:  "Applying AI-specific laws and frameworks such as the NIST AI RMF and ISO standards", d:  "AI"}, {n:  "Governing the design, training data and release of AI systems", d:  "AI"}, {n:  "Running AI impact assessments and reviewing vendor agreements", d:  "Business"}, {n:  "Governing how AI is deployed and used", d:  "AI"}] },
    { code: "GCAA", name: "Google Cloud AI Agents: From Foundations to Enterprise Scale", issuer: "Google Cloud · Coursera", sector: "AI", status: "watchlist", started: "May 2029", target: "Nov 2029", skills: [{n:  "Explaining agent architecture: models, tools, orchestration and runtime", d:  "AI"}, {n:  "Linking agent types to business KPIs and use cases", d:  "Business"}, {n:  "Building agents with Google's Agent Development Kit in YAML or Python", d:  "AI"}, {n:  "Writing agent instructions and ethical boundaries", d:  "AI"}, {n:  "Adding built-in, MCP and custom function tools to agents", d:  "AI"}, {n:  "Managing agent memory and state", d:  "AI"}, {n:  "Deploying agents to production with security and observability", d:  "Tech"}, {n:  "Designing human-in-the-loop workflows", d:  "AI"}] },
    { code: "PRSC", name: "Prosci Change Management Certification", issuer: "Prosci", sector: "Project Management", status: "watchlist", started: "May 2029", target: "Nov 2029", skills: [{n:  "Explaining change management and its value", d:  "Business"}, {n:  "Applying the ADKAR Model to help people through change", d:  "Business"}, {n:  "Applying the Prosci 3-Phase Process to organizational change", d:  "Business"}, {n:  "Getting the right roles to support a change", d:  "Business"}, {n:  "Drafting a change management plan for a project", d:  "Project Management"}] },
    { code: "CS50X", name: "CS50x Introduction to Computer Science", issuer: "Harvard University · CS50", sector: "Tech", status: "watchlist", started: "Nov 2029", target: "Mar 2030", skills: [{n:  "Solving problems with Scratch and C", d:  "Tech"}, {n:  "Using arrays and writing algorithms", d:  "Tech"}, {n:  "Managing memory", d:  "Tech"}, {n:  "Building data structures", d:  "Tech"}, {n:  "Programming in Python", d:  "Tech"}, {n:  "Writing SQL queries", d:  "Data"}, {n:  "Building web pages with HTML, CSS and JavaScript", d:  "Tech"}, {n:  "Building web apps with Flask", d:  "Tech"}] },
    { code: "BBC", name: "Better Business Cases Foundation", issuer: "APMG International", sector: "Project Management", status: "watchlist", started: "Nov 2029", target: "Mar 2030", skills: [{n:  "Explaining the Five Case Model and the three business case stages", d:  "Business"}, {n:  "Writing the Strategic Case with SMART spending objectives", d:  "Business"}, {n:  "Building a long list and short list of options in the Economic Case", d:  "Business"}, {n:  "Appraising options for value for money, with optimism bias and sensitivity analysis", d:  "Business"}, {n:  "Writing the Commercial Case and sharing risk in deals", d:  "Business"}, {n:  "Writing the Financial Case with budget and funding statements", d:  "Business"}, {n:  "Writing the Management Case with benefits and risk registers", d:  "Project Management"}] },
    { code: "MOP", name: "Management of Portfolios (MoP) Foundation", issuer: "PeopleCert · Axelos", sector: "Project Management", status: "watchlist", started: "Nov 2029", target: "Mar 2030", skills: [{n:  "Explaining portfolio management and how it differs from projects and programs", d:  "Project Management"}, {n:  "Applying the five portfolio principles", d:  "Project Management"}, {n:  "Understanding, grouping, ranking and balancing a portfolio", d:  "Project Management"}, {n:  "Using multi-criteria analysis and reference class forecasting", d:  "Business"}, {n:  "Running portfolio delivery: control, benefits, money and risk", d:  "Project Management"}, {n:  "Setting up portfolio management and measuring maturity", d:  "Business"}] },
    { code: "PMP", name: "Project Management Professional", issuer: "Project Management Institute", sector: "Project Management", status: "watchlist", started: "After 3 years of project work", target: "After graduation", skills: [{n:  "Leading the team and handling conflicts", d:  "Project Management"}, {n:  "Engaging stakeholders and managing their expectations", d:  "Project Management"}, {n:  "Planning communication and passing on knowledge", d:  "Project Management"}, {n:  "Building an integrated plan and managing scope", d:  "Project Management"}, {n:  "Managing the schedule, resources, money and procurement", d:  "Project Management"}, {n:  "Planning risk and building a risk response", d:  "Project Management"}, {n:  "Setting up project governance and controlling changes", d:  "Project Management"}, {n:  "Supporting organizational change and continuous improvement", d:  "Business"}] }
  ],


  /* ---------------- TIMELINE ----------------
     status: "done" | "ongoing" | "future". Order = left to right. */
  timeline: [
    { date: "2016", title: "Managing Partner, Nathibai Tulsidas Investments", status: "done",
      note: "Started running the firm day to day, alongside an undergraduate degree." },
    { date: "2021", title: "Forbes India and FICCI FLO", status: "done",
      note: "Featured in Forbes India's \"Women of Dalal Street.\" Invited speaker at FICCI FLO Ahmedabad." },
    { date: "2021", title: "Bachelor of Commerce", status: "done",
      note: "Rashtrasant Tukadoji Maharaj Nagpur University." },
    { date: "2022", title: "Co-founded WedNet", status: "done",
      note: "Hyderabad. Built from an idea to a tested prototype with a team of six." },
    { date: "2023", title: "The call to stop WedNet", status: "done",
      note: "Shelved before launch when the data said no. Kept about 47% of starting capital." },
    { date: "2023", title: "650 families, one set of rules", status: "done",
      note: "Led a campaign that got pet owners and other residents to agree on new rules." },
    { date: "Dec 2023", title: "Moved to the United States", status: "done", note: "Now based in Madison, Wisconsin." },
    { date: "May 2026", title: "MS Project Management, Harrisburg University", status: "ongoing",
      note: "Information Systems Engineering and Management concentration. GPA 4.0." },
    { date: "Nov 2026", title: "Google Project Management Certificate", status: "ongoing", note: "Target date." },
    { date: "Dec 2026", title: "CS50's Introduction to Databases with SQL", status: "ongoing", note: "Target date." },
    { date: "Summer 2027", title: "Internship in tech program management", status: "future", note: "The goal for 2027." },
    { date: "Spring 2028", title: "MS graduation", status: "future", note: "Harrisburg University of Science and Technology." }
  ],

  /* ---------------- PROUD MOMENTS (framed clippings) ---------------- */
  proud: [
    { year: "2021", title: "Forbes India", line: "Featured in \"Women of Dalal Street.\"", story: "nathibai" },
    { year: "2021", title: "FICCI FLO Ahmedabad", line: "Invited speaker.", story: "ficci" },
    { year: "2023", title: "650 families", line: "Led a campaign that got both sides to agree on new rules.", story: "krishe" }
  ],

  /* ---------------- WHERE I'M HEADED ---------------- */
  headed: {
    goal: "To lead technology and AI programs from the first idea to the final delivery, and to create impact through the way I communicate, negotiate and lead people.",
    pillars: [
      { title: "Lead people toward one goal",
        text: "I have done it with a team of six at WedNet and with 650 families in a community, and I want to do it with engineering teams building technology and AI products." },
      { title: "Deliver from start to finish",
        text: "I like owning the work from the first idea to the last detail, and I want to run programs end to end, from planning to launch and after." },
      { title: "Work both ends of the table",
        text: "I can sit with the business side on money, risk and deals, and with the technical side on systems and data, and connect the two so the work moves." },
      { title: "Negotiate and build trust",
        text: "I have worked with brokers, accountants, vendors and residents with different interests, and I want to use that to bring teams and partners to agreement." }
    ],
    why: "I grew up in business, making decisions with real money, and now I am adding the technical side through my master's in project management with a concentration in information systems. I want to be the person who understands both sides and gets the project delivered."
  },

  /* Each principle is her own version of an Amazon Leadership Principle (shown small as "lp"),
     backed by something she actually did. */
  principles: [
    { title: "Start with the people who will use it", lp: "Customer Obsession",
      text: "At WedNet I wrote the requirements for the first two releases from what users liked and disliked, and I kept changing them as we built." },
    { title: "Treat the money like it is mine", lp: "Ownership",
      text: "For six years I ran an investment firm day to day and grew its capital from $50,000 to $600,000, and I checked the risk on every investment before acting." },
    { title: "Let the numbers decide", lp: "Are Right, A Lot · Dive Deep",
      text: "At WedNet I tested demand before spending more, and I let the research decide, not my excitement." },
    { title: "Say stop when stop is right", lp: "Have Backbone · Frugality",
      text: "I shelved WedNet before launch, even though I loved the idea, and kept about 47% of the starting capital." },
    { title: "Test fast, then double down", lp: "Bias for Action",
      text: "I tested posting times and frequency for WedNet and grew its Instagram to 2,000 followers in one week." },
    { title: "Bring both sides to the table", lp: "Earn Trust",
      text: "In a community of 650 families, I got pet owners and other residents to agree on rules both sides could live with." },
    { title: "Give the team one way of working", lp: "Insist on the Highest Standards",
      text: "I set up the project platform for WedNet, with the workflows and documentation standards all six of us worked from." },
    { title: "Learn what the work needs", lp: "Learn and Be Curious",
      text: "I taught myself to build WedNet, and now I am adding information systems to project management in my master's." }
  ],

  builtNote: "I designed this site and directed its build with AI tools, with no coding background. Every word on it lives in one content file, so it grows as I do.",

  /* ---------------- FULL STORIES ---------------- */
  stories: {
    nathibai: {
      kicker: "Markets", title: "Six years in the markets",
      body: [
        "From 2016 to 2022, Priyal ran Nathibai Tulsidas Investments day to day as its managing partner, while she completed her undergraduate degree in Nagpur.",
        "The firm invested in Indian stocks and real estate. Over six years she grew its capital from $50,000 to $600,000. [[to confirm: from returns only, or including money added along the way]]",
        "She built and used a structured way to research each investment and check its risk before acting, across many positions held at once. [[to confirm: roughly how many positions]] She produced regular performance reports and worked with brokers, accountants and financial partners.",
        "In 2021 Forbes India featured her in \"Women of Dalal Street,\" and FICCI FLO invited her to speak in Ahmedabad."
      ]
    },
    wednet: {
      kicker: "Founder", title: "WedNet: the call to stop",
      body: [
        "In 2022 Priyal co-founded WedNet in Hyderabad with a software developer. She spent about three months thinking through the idea, then started building, adding people as the product needed their skills, until the team was six.",
        "WedNet was meant to bring a scattered market into one place: planning tools, guest management, a gift registry, shopping and vendor discovery, for the couple, their guests and the sellers.",
        "She set up Lark as the team's project management platform, with the workflows and documentation standards everyone worked from. She wrote the product requirements for the first two releases from what users liked and disliked, and kept refining them as the product was built.",
        "She spoke with vendors across two states. The 27 largest luxury-wedding vendors filled in a detailed form, alongside structured user testing. [[to confirm: total number of vendors spoken to, and the two states]]",
        "The data showed that venues in India work only with their partner vendors. The open marketplace WedNet was built on was not available. She shelved the product before launch and kept about 47% of the starting capital.",
        "On marketing, she grew WedNet's Instagram to 2,000 followers in one week by testing posting times and frequency, and ran audience surveys to test demand."
      ]
    },
    krishe: {
      kicker: "Community", title: "650 families, one set of rules",
      body: [
        "In 2023, in a gated community in Hyderabad, pet owners and other residents disagreed about pets in shared spaces.",
        "Priyal led a campaign across 650 resident families that brought both sides' concerns into the open and found rules both could accept.",
        "Once adopted: designated pet areas, waste guidelines with enforcement, more freedom for pet owners, and pet vaccination records in the community app."
      ]
    },
    ficci: {
      kicker: "Speaking", title: "FICCI FLO Ahmedabad",
      body: [
        "In 2021 Priyal was an invited speaker at the Ahmedabad chapter of FICCI FLO. [[to confirm: the topic of the talk]]"
      ]
    }
  }
};
