import { useState, useEffect, useRef, useCallback } from "react";

/* ─── COUNT-UP HOOK ─────────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = {
  Frontend:  ["HTML", "CSS", "JavaScript", "Sass", "React", "Vue.js", "Bootstrap", "Responsive Design"],
  Backend:   ["PHP", "Laravel", "SQL", "MySQL", "Express.js", "Node.js", "RESTful APIs"],
  "BI & Data": ["Power BI", "Data Analytics", "Data Visualization", "Business Intelligence", "Big Data", "DAX", "Power Query", "Star Schema", "ETL"],
  Design:    ["UI/UX Design", "Figma"],
  Tools:     ["Git", "GitHub", "VS Code", "PHPMyAdmin", "XAMPP", "Chrome DevTools"],
  "Soft Skills": ["Problem Solving", "Analytical Thinking", "Attention to Detail", "Clean Code"],
};

const PROJECTS = [
  {
    id: 1, category: "Web",
    title: "HR Employee Management System",
    desc: "Dual-dashboard HR platform managing employee lifecycles, leave approvals, attendance analytics, payroll generation, and attestation workflows. Admin controls department analytics and bulk email dispatch; employees track attendance, request leaves, and access payslips.",
    tech: "React · Laravel · REST API · JWT · Chart.js",
    tags: ["React", "Laravel", "REST API", "JWT", "Chart.js", "Dual Dashboard", "HR Tech", "Multi-Language", "Dark Mode"],
    github: "https://github.com/hajarLafdaoui/Employee_management",
    images: ["/employee/1.png","/employee/2.png","/employee/3.png","/employee/4.png","/employee/5.png","/employee/6.png"],
  },
  {
    id: 2, category: "Web",
    title: "FloraCare – Plant Care Services",
    desc: "Interactive plant care service website featuring Vue.js dynamic components and GSAP-powered scroll animations. Custom preloader, testimonial carousel, auth modal, and mobile-first responsive design with Sass architecture.",
    tech: "Vue.js · GSAP · Sass · Responsive Design",
    tags: ["Vue.js", "GSAP", "Sass", "Scroll Animations", "Mobile-First", "Preloader", "Frontend Animation"],
    github: "https://github.com/hajarLafdaoui/floracare-landing-page",
    images: ["/FloraCare/1.png","/FloraCare/2.png","/FloraCare/3.png","/FloraCare/4.png"],
  },
  {
    id: 3, category: "Web",
    title: "Custom Tech Accessories Store",
    desc: "Full-stack e-commerce platform for tech accessories. Customers browse products with search/filters, persistent cart, and Cash-on-Delivery orders. Admin dashboard manages products (CRUD), orders, users, and categories. Backend-ready for Stripe/PayPal.",
    tech: "React · Node.js · Express · PostgreSQL · TailwindCSS",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "E-Commerce", "Admin Dashboard", "Shopping Cart"],
    github: "https://github.com/hajarLafdaoui/Custom-Tech-Accessories-Store",
    images: ["/eco/1.png","/eco/2.png","/eco/3.png","/eco/4.png","/eco/5.png","/eco/6.png"],
  },
  {
    id: 10, category: "Web",
    title: "BookGlow – Smart Appointment Booking",
    desc: "SaaS-style booking platform for beauty salons, barbers, and spas. Customers browse services, choose staff, and book with real-time availability. Role-based auth, email notifications, calendar views, and cancel/reschedule options.",
    tech: "React · Node.js · Express · PostgreSQL · TailwindCSS",
    tags: ["React", "Node.js", "PostgreSQL", "FullCalendar", "Nodemailer", "Role-Based Access", "SaaS", "Real-Time"],
    github: "https://github.com/hajarLafdaoui/Salon-Appointment-Booking-System",
    images: ["/booking/1.png","/booking/2.png","/booking/3.png","/booking/4.png","/booking/5.png","/booking/6.png"],
  },
  {
    id: 4, category: "AI",
    title: "Customer Churn Prediction System",
    desc: "ML system that predicts which customers will leave before they do. Analyzes behavior patterns from 6 key inputs to deliver churn probability (0–100%) and automated retention strategies. Logistic Regression achieved 85% F1-score, deployed as an interactive Streamlit app.",
    tech: "Python · Scikit-learn · XGBoost · Streamlit · Plotly",
    tags: ["Python", "Scikit-learn", "XGBoost", "Streamlit", "Plotly", "Classification", "Customer Analytics"],
    github: "https://github.com/hajarLafdaoui/Customer-Churn-Prediction",
    images: ["/chrun/1.png","/chrun/2.png"],
  },
  {
    id: 5, category: "AI",
    title: "Sentinel AI – Fraud Detection System",
    desc: "Real-time transaction fraud detection using XGBoost with 85% recall and <100ms inference. Engineers 36+ features from synthetic transaction data. Includes SHAP explainability, business rules overlay, and interactive Streamlit dashboard.",
    tech: "Python · XGBoost · SHAP · Streamlit",
    tags: ["Python", "XGBoost", "SHAP", "Streamlit", "SMOTE", "Anomaly Detection", "Real-Time ML"],
    github: "https://github.com/hajarLafdaoui/fraud-detection-system",
    images: ["/fraud/1.png","/fraud/2.png"],
  },
  {
    id: 6, category: "AI",
    title: "DocuLocal – RAG-Powered Document Q&A",
    desc: "Local, privacy-first document QA system. Upload PDFs, ask natural language questions, and get answers with source citations. Runs 100% offline using Ollama + Llama 3.2 + ChromaDB. No API costs, no data leaving your machine.",
    tech: "Python · LangChain · Llama 3.2 · Ollama · ChromaDB",
    tags: ["Python", "LangChain", "Llama 3.2", "Ollama", "ChromaDB", "RAG", "Streamlit", "Privacy-First", "Local LLM"],
    github: "https://github.com/hajarLafdaoui/DocuLocal",
    images: ["/doc/1.png"],
  },
  {
    id: 7, category: "BI",
    title: "Sales Data Warehouse + ETL + Dashboard",
    desc: "Complete end-to-end BI workflow: ETL pipeline extracting and cleaning messy CSVs, star schema data warehouse with FactSales and dimension tables, and comprehensive Power BI dashboard with revenue trends, top products, customer segmentation, and drill-downs.",
    tech: "Python · SQL · Star Schema · Power BI · DAX",
    tags: ["Power BI", "DAX", "ETL", "Star Schema", "SQL", "Data Warehouse", "Sales Analytics"],
    github: "https://github.com/hajarLafdaoui/Sales-Data-Warehouse-ETL-Dashboard",
    images: ["/Sales_Dashboard.png"],
  },
  {
    id: 8, category: "BI",
    title: "Inventory / Supply Chain Analytics",
    desc: "Operational analytics tracking stock levels, orders, and supplier performance. Critical KPIs include stock turnover rate, out-of-stock incidents, and delivery delay metrics to optimize retail and logistics operations.",
    tech: "SQL · Power BI · DAX",
    tags: ["Power BI", "DAX", "SQL", "Inventory", "Supply Chain", "KPI Dashboard", "Logistics"],
    github: "https://github.com/hajarLafdaoui/Inventory-Supply-Analytics",
    images: ["/Inventory_Dashboard1.png","/Inventory_Dashboard2.png","/Inventory_Dashboard3.png"],
  },
  {
    id: 9, category: "BI",
    title: "Finance / Profitability Analytics",
    desc: "Financial performance dashboard analyzing revenue, costs, and profit by department and region. Key metrics include profit margins, cost-to-revenue ratios, and monthly financial trends to support executive decision-making.",
    tech: "Power BI · SQL · DAX",
    tags: ["Power BI", "DAX", "SQL", "Finance", "Profitability", "Executive Dashboard", "KPI"],
    github: "https://github.com/hajarLafdaoui/Finance-Profitability-Analytics",
    images: ["/Finance_Dashboard1.png","/Finance_Dashboard2.png","/Finance_Dashboard3.png","/Finance_Dashboard4.png"],
  },
];

const TABS = ["All", "Web", "AI", "BI"];

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── COMPONENTS ─────────────────────────────────────────────────────────── */

function FadeSection({ children, className = "", delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── ANIMATED HERO BADGES ──────────────────────────────────────────────── */
const STATS = [
  { value: 10,  suffix: "",  label: "Projects Built",    icon: "◈" },
  { value: 3,   suffix: "+", label: "Tech Domains",      icon: "◎" },
  { value: 20,  suffix: "+", label: "Technologies",      icon: "◇" },
  { value: 85,  suffix: "%", label: "ML Accuracy",       icon: "◉" },
  { value: 100, suffix: "%", label: "Open Source",       icon: "◐" },
  { value: 3,   suffix: "y", label: "Years Learning",    icon: "◑" },
];

function AnimatedStat({ value, suffix, label, icon, delay = 0 }) {
  const [ref, visible] = useInView(0.3);
  const count = useCountUp(value, 1600, visible);
  return (
    <div
      ref={ref}
      className="stat-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div className="stat-icon" aria-hidden="true">{icon}</div>
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-bar-wrap" aria-hidden="true">
        <div
          className="stat-bar"
          style={{
            width: visible ? "100%" : "0%",
            transition: `width 1.4s ease ${delay + 0.3}s`,
          }}
        />
      </div>
    </div>
  );
}

function HeroBadge1() {
  const [ref, visible] = useInView(0.1);
  const count = useCountUp(10, 1400, visible);
  return (
    <div
      ref={ref}
      className="hero-badge b1"
      aria-hidden="true"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
      }}
    >
      <div className="badge-num">{count}</div>
      <div className="badge-lbl">Projects Built</div>
    </div>
  );
}

function HeroBadge2() {
  const [ref, visible] = useInView(0.1);
  const count = useCountUp(20, 1200, visible);
  return (
    <div
      ref={ref}
      className="hero-badge b2"
      aria-hidden="true"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(16px)",
        transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
      }}
    >
      <div className="badge-num">{count}+</div>
      <div className="badge-lbl">Technologies</div>
    </div>
  );
}

/* ─── SLIDESHOW ─────────────────────────────────────────────────────────── */
function Slideshow({ images, title }) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [anyLoaded, setAnyLoaded] = useState(false);

  useEffect(() => {
    setIdx(0);
    setLoaded({});
    setAnyLoaded(false);
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const t = setInterval(() => setIdx(p => (p + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="proj-img-placeholder"><span>{title}</span></div>;
  }

  return (
    <div className="proj-slideshow">
      {!anyLoaded && <div className="proj-img-placeholder"><span>Loading preview…</span></div>}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${title} screenshot ${i + 1}`}
          className={`slide-img${i === idx ? " active" : ""}`}
          style={{ display: anyLoaded || loaded[i] ? undefined : "none" }}
          onLoad={() => {
            setLoaded(p => ({ ...p, [i]: true }));
            setAnyLoaded(true);
          }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ))}
      {images.length > 1 && anyLoaded && (
        <div className="slide-dots" aria-hidden="true">
          {images.map((_, i) => (
            <button
              key={i}
              className={`slide-dot${i === idx ? " active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── LANGUAGE TAGS ──────────────────────────────────────────────────────── */
function LanguageBars() {
  return (
    <div className="lang-tags">
      {["Arabic", "English", "French"].map(l => (
        <span key={l} className="lang-tag">{l}</span>
      ))}
    </div>
  );
}

/* ─── AI CHAT COMPONENT - FIXED VERSION ─────────────────────────────────── */
const SYSTEM_PROMPT = `You are Hajar's personal AI assistant embedded in her portfolio website.
You represent Hajar Lafdaoui — a 22-year-old Full Stack Developer & Business Intelligence Engineer based in Agadir, Morocco.

YOUR JOB: Answer questions about Hajar warmly, professionally, and concisely. Help recruiters, clients, and collaborators learn about her work and get in touch.

ABOUT HAJAR:
- Full Stack Developer & BI Engineer, age 22, based in Agadir, Morocco
- Currently pursuing a Bachelor's in Business Intelligence & Big Data
- Diploma in Digital Development – Web option (OFPPT, 2025)
- Baccalaureate in Physical Sciences (2022)
- Languages: Arabic (native), English (professional), French (fluent)
- Email: hajarlafdaoui@gmail.com
- GitHub: github.com/hajarLafdaoui
- LinkedIn: linkedin.com/in/hajar-lafdaoui
- Open to: freelance projects, internships, full-time opportunities

SKILLS:
- Frontend: React, Vue.js, JavaScript, HTML5, CSS3, Sass, GSAP, Bootstrap
- Backend: Laravel, PHP, Express.js, Node.js, Python, REST APIs
- Databases: MySQL, MongoDB, PostgreSQL
- BI & Data: Power BI, DAX, Power Query, ETL, Star Schema, Data Analytics
- AI/ML: Scikit-learn, XGBoost, SHAP, LangChain, Llama, Streamlit
- Tools: Git, GitHub, VS Code, Figma

PROJECTS (10 total):
1. HR Employee Management System – React, Laravel, JWT, Chart.js
2. FloraCare – Vue.js, GSAP, Sass
3. Custom Tech Accessories Store – React, Node.js, PostgreSQL
4. BookGlow – React, Node.js, PostgreSQL
5. Customer Churn Prediction – Python, XGBoost, Streamlit (85% accuracy)
6. Sentinel AI – Python, XGBoost, SHAP (85% recall)
7. DocuLocal – LangChain, Llama 3.2, ChromaDB
8. Sales Data Warehouse + ETL + Dashboard – Python, SQL, Power BI
9. Inventory/Supply Chain Analytics – SQL, Power BI
10. Finance/Profitability Analytics – Power BI, DAX

TONE: Friendly, professional, concise. Use short paragraphs. If asked something you don't know, say so and suggest contacting Hajar directly.

Reply in the same language the user writes in.`;

const SUGGESTIONS = [
  "What projects has she built?",
  "What are her skills?",
  "Is she available for hire?",
  "How can I contact her?",
];

function renderBubble(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    return p.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>{line}{j < arr.length - 1 ? <br /> : null}</span>
    ));
  });
}

function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm Hajar's AI assistant 👋\n\nAsk me anything about her skills, projects, or availability.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

async function send(text) {
  const q = (text || input).trim();
  if (!q || loading) return;
  setInput("");
  setShowSuggestions(false);
  setMessages(m => [...m, { role: "user", text: q }]);
  setLoading(true);

  // Simulate typing delay
  await new Promise(r => setTimeout(r, 700 + Math.random() * 500));

  const lower = q.toLowerCase();
  let reply = "";

  if (/project|built|work|portfolio|app|system|website/i.test(lower)) {
    reply = `Hajar has built **10 projects** across 3 domains:\n\n**Web:** HR Management System, FloraCare, Tech Accessories Store, BookGlow\n\n**AI/ML:** Customer Churn Prediction (85% accuracy), Sentinel AI Fraud Detection (85% recall), DocuLocal RAG Q&A\n\n**BI:** Sales Data Warehouse + ETL, Inventory/Supply Chain Analytics, Finance/Profitability Dashboard\n\nAll projects are open source on GitHub!`;
  } else if (/skill|tech|stack|know|use|language|framework/i.test(lower)) {
    reply = `Hajar's tech stack covers:\n\n**Frontend:** React, Vue.js, JavaScript, Sass, GSAP, Bootstrap\n**Backend:** Laravel, PHP, Node.js, Express.js, REST APIs\n**Databases:** MySQL, PostgreSQL, MongoDB\n**BI & Data:** Power BI, DAX, ETL, Star Schema\n**AI/ML:** Python, Scikit-learn, XGBoost, LangChain, Streamlit\n**Tools:** Git, Figma, VS Code`;
  } else if (/hire|available|freelance|job|opportunity|open|intern/i.test(lower)) {
    reply = `Yes! Hajar is **open to opportunities** including:\n\n- Freelance projects\n- Internships\n- Full-time positions\n\nShe responds within 24 hours. Reach her at **hajarlafdaoui@gmail.com** or connect on LinkedIn.`;
  } else if (/contact|email|reach|linkedin|github/i.test(lower)) {
    reply = `You can reach Hajar through:\n\n**Email:** hajarlafdaoui@gmail.com\n**GitHub:** github.com/hajarLafdaoui\n**LinkedIn:** linkedin.com/in/hajar-lafdaoui\n\nShe typically replies within 24 hours!`;
  } else if (/who|about|herself|background|bio|story/i.test(lower)) {
    reply = `Hajar Lafdaoui is a **22-year-old Full Stack Developer & BI Engineer** based in Agadir, Morocco.\n\nShe's currently pursuing a Licence in Business Intelligence & Big Data, holds a Diplôme in Digital Development (OFPPT, 2025), and speaks Arabic, English, and French.\n\nShe builds clean, purposeful digital products — from data dashboards to full-stack apps and AI tools.`;
  } else if (/education|study|degree|school|university|diplom/i.test(lower)) {
    reply = `Hajar's education:\n\n**2026 – In Progress:** Licence in Business Intelligence & Big Data\n**2025:** Diplôme — Développement Digital, option Web (OFPPT)\n**2022:** Baccalauréat — Sciences Physiques, option Française`;
  } else if (/language|speak|arabic|french|english/i.test(lower)) {
    reply = `Hajar speaks **3 languages:**\n\n- **Arabic** — Native\n- **English** — Professional\n- **French** — Fluent`;
  } else if (/ai|ml|machine learning|python|data/i.test(lower)) {
    reply = `Hajar has strong **AI & Data skills:**\n\n- Machine Learning with Scikit-learn & XGBoost\n- SHAP explainability for model transparency\n- RAG systems with LangChain + Llama 3.2\n- Power BI dashboards with DAX & ETL pipelines\n- Streamlit for interactive ML apps\n\nHer ML models achieve up to **85% accuracy/recall**.`;
  } else if (/cv|resume|download/i.test(lower)) {
    reply = `You can download Hajar's CV directly from the portfolio — look for the **Download CV** button at the top of the page. It's available in both **English (EN)** and **French (FR)**.`;
  } else if (/location|where|morocco|agadir/i.test(lower)) {
    reply = `Hajar is based in **Agadir, Morocco** 🇲🇦\n\nShe's open to remote work and international opportunities.`;
  } else if (/hello|hi|hey|bonjour|salut|مرحبا/i.test(lower)) {
    reply = `Hi there! 👋 I'm Hajar's AI assistant.\n\nI can tell you about her **skills**, **projects**, **background**, or how to **get in touch**. What would you like to know?`;
  } else if (/thank|thanks|merci|شكرا/i.test(lower)) {
    reply = `You're welcome! 😊 Feel free to ask anything else about Hajar's work or how to reach her.`;
  } else {
    reply = `Great question! For detailed answers, I'd suggest:\n\n- Browsing the **Projects** and **Skills** sections above\n- Emailing Hajar directly at **hajarlafdaoui@gmail.com**\n- Connecting on **LinkedIn:** linkedin.com/in/hajar-lafdaoui\n\nShe's happy to chat about any opportunities or collaborations!`;
  }

  setMessages(m => [...m, { role: "bot", text: reply }]);
  setLoading(false);
}
  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { 
      e.preventDefault(); 
      send(); 
    }
  }

  return (
    <>
      <button
        className={"chat-fab" + (open ? " open" : "")}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close assistant" : "Chat with Hajar's AI assistant"}
      >
        <span className="chat-fab-pulse" aria-hidden="true" />
        <span className="chat-online-dot" aria-hidden="true" />
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 3v-3z" />
          </svg>
        )}
      </button>

      <div className={"chat-window" + (open ? "" : " hidden")} role="dialog" aria-label="AI Assistant" aria-modal="false">
        <div className="chat-header">
          <div className="chat-header-avatar" aria-hidden="true">🤖</div>
          <div className="chat-header-info">
            <div className="chat-header-name">Hajar's AI Assistant</div>
            <div className="chat-header-sub">
              <span className="chat-sub-dot" aria-hidden="true" />
              Online · Ask me anything
            </div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="chat-messages" role="log" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={"chat-msg " + m.role}>
              <div className="chat-avatar" aria-hidden="true">{m.role === "bot" ? "HL" : "You"}</div>
              <div className="chat-bubble">{renderBubble(m.text)}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot">
              <div className="chat-avatar" aria-hidden="true">HL</div>
              <div className="chat-bubble" style={{ padding: "10px 14px" }}>
                <div className="chat-typing" style={{ padding: 0 }}>
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showSuggestions && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="chat-chip" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className="chat-input-row">
          <textarea
            ref={inputRef}
            className="chat-input"
            rows={1}
            placeholder="Ask about skills, projects, availability…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            aria-label="Type your message"
          />
          <button
            className="chat-send"
            onClick={() => send()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
<div className="chat-hint">AI Assistant · Knows everything about Hajar</div>

      </div>
    </>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */

export default function App() {
  const [activeTab, setActiveTab]   = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const [navOpen, setNavOpen]       = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [imgError, setImgError]     = useState(false);
  const [form, setForm]             = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [darkMode, setDarkMode]     = useState(() => {
    try { return JSON.parse(localStorage.getItem("darkMode")) || false; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("darkMode", JSON.stringify(darkMode)); } catch {}
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setNavOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const filtered = activeTab === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeTab);

  useEffect(() => { setVisibleCount(3); }, [activeTab]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }, []);

  function handleDownloadCV(lang) {
    const file = lang === "fr" ? "/Hajar_Lafdaoui_CV_FR.pdf" : "/Hajar_Lafdaoui_CV_EN.pdf";
    const name = lang === "fr" ? "Hajar_Lafdaoui_CV_FR.pdf" : "Hajar_Lafdaoui_CV_EN.pdf";
    const a = document.createElement("a");
    a.href = file;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const FORMSPREE_ID = "mpqnwpwr";
  const [formErrors, setFormErrors] = useState({});
  const [honeypot, setHoneypot] = useState("");

  function validateForm() {
    const errors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errors.name = "Please enter your name (at least 2 characters).";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Please enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10)
      errors.message = "Message must be at least 10 characters.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypot) return;
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setFormStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          message: form.message.trim(),
          _subject: `Portfolio message from ${form.name.trim()}`,
        }),
      });
      if (res.ok) {
        setFormStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 6000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 6000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 6000);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:          #fafaf8;
          --bg2:         #f3f2ee;
          --border:      #e0dfd9;
          --text:        #1c1c1a;
          --muted:       #68685f;
          --accent:      #2d5a3d;
          --accent-h:    #214430;
          --accent-lt:   #edf4ef;
          --pill-bg:     #eceae5;
          --pill-text:   #3a3a36;
          --max:         1080px;
          --r:           6px;
          --nav-h:       60px;
        }
        :root.dark {
          --bg:          #0f0f0d;
          --bg2:         #191917;
          --border:      #2c2c28;
          --text:        #e8e8e2;
          --muted:       #9a9a90;
          --accent:      #52b076;
          --accent-h:    #68c98a;
          --accent-lt:   #172a1f;
          --pill-bg:     #242420;
          --pill-text:   #d0d0c8;
        }

        html { scroll-behavior: smooth; font-size: 16px; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
          transition: background 0.25s, color 0.25s;
        }

        nav {
          position: fixed; top:0; left:0; right:0; z-index:200;
          background: rgba(250,250,248,0.9);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s, background 0.3s;
        }
        :root.dark nav { background: rgba(15,15,13,0.9); }
        nav.scrolled { border-color: var(--border); }

        .nav-inner {
          max-width: var(--max); margin: 0 auto;
          padding: 0 1.5rem;
          height: var(--nav-h);
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem; letter-spacing: 0.02em;
          color: var(--text); cursor: pointer; border: none; background: none;
          padding: 0;
        }
        .nav-logo span { color: var(--accent); }

        .nav-right { display: flex; align-items: center; gap: 0.25rem; }
        .nav-links { display: flex; gap: 0.1rem; list-style: none; align-items: center; }

        .nav-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 500;
          color: var(--muted);
          padding: 0.4rem 0.75rem; border-radius: var(--r);
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .nav-btn:hover { color: var(--text); background: var(--pill-bg); }

        .theme-btn {
          background: none; border: none; cursor: pointer;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: var(--r);
          color: var(--muted);
          transition: background 0.2s, color 0.2s;
          margin-left: 0.25rem; flex-shrink: 0;
        }
        .theme-btn:hover { background: var(--pill-bg); color: var(--text); }
        .theme-btn svg { width: 19px; height: 19px; }

        .hamburger {
          display: none; background: none; border: none; cursor: pointer;
          flex-direction: column; gap: 4px; padding: 6px; margin-left: 0.25rem;
        }
        .hamburger span {
          display: block; width: 20px; height: 1.5px;
          background: var(--text); border-radius: 2px;
          transition: transform 0.25s, opacity 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

        .mobile-menu {
          display: none;
          flex-direction: column;
          background: var(--bg);
          border-top: 1px solid var(--border);
          padding: 0.5rem 1.5rem 1.25rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu .nav-btn {
          text-align: left; padding: 0.7rem 0;
          border-bottom: 1px solid var(--border);
          border-radius: 0; font-size: 0.975rem;
        }
        .mobile-menu .nav-btn:last-child { border-bottom: none; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }

        section { padding: 6rem 1.5rem; }
        .container { max-width: var(--max); margin: 0 auto; }

        #home {
          min-height: 100vh;
          display: flex; align-items: center;
          padding-top: calc(var(--nav-h) + 2rem);
          padding-bottom: 4rem;
          background: var(--bg);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 1.5rem;
        }
        .hero-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        .hero-name {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 1.04; color: var(--text);
          margin-bottom: 0.6rem; letter-spacing: -0.01em;
        }
        .hero-name em { font-style: italic; color: var(--accent); }
        .hero-role {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          font-weight: 400; color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .hero-rule {
          width: 40px; height: 2.5px;
          background: var(--accent); border-radius: 2px;
          margin: 1.25rem 0;
        }
        .hero-desc {
          max-width: 480px; color: var(--muted);
          font-size: 0.975rem; line-height: 1.8;
          margin-bottom: 2rem;
        }
        .hero-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }

        .cv-group {
          display: inline-flex; align-items: stretch;
          border-radius: var(--r);
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .cv-main {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--accent); color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500;
          padding: 0.7rem 1.1rem;
          border: none; cursor: default;
          letter-spacing: 0.01em; white-space: nowrap;
        }
        .cv-main svg { width: 14px; height: 14px; flex-shrink: 0; }
        .cv-sep { width: 1px; background: rgba(255,255,255,0.22); flex-shrink: 0; }
        .cv-lang {
          background: var(--accent); border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          padding: 0 0.85rem;
          transition: background 0.18s, color 0.18s;
          white-space: nowrap;
        }
        .cv-lang:hover { background: var(--accent-h); color: #fff; }
        .cv-lang + .cv-lang { border-left: 1px solid rgba(255,255,255,0.18); }

        .hero-photo-wrap {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .hero-photo-frame {
          width: min(100%, 300px);
          aspect-ratio: 3 / 4;
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg2);
          border: 1px solid var(--border);
          position: relative;
        }
        .hero-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .hero-photo-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.75rem;
          color: var(--muted); font-size: 0.85rem;
          text-align: center; padding: 1.5rem;
        }
        .hero-photo-placeholder svg { opacity: 0.25; }

        .hero-badge {
          position: absolute;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
        }
        .hero-badge.b1 { bottom: 24px; left: -16px; }
        .hero-badge.b2 { top: 24px; right: -16px; }
        .badge-num {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem; color: var(--text); line-height: 1;
        }
        .badge-lbl { font-size: 0.72rem; color: var(--muted); margin-top: 2px; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
        }
        .stat-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.1rem 1rem 1rem;
          display: flex; flex-direction: column;
          align-items: flex-start;
          position: relative; overflow: hidden;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .stat-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--accent-lt) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stat-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(45,90,61,0.1); }
        :root.dark .stat-card:hover { box-shadow: 0 6px 20px rgba(82,176,118,0.12); }
        .stat-card:hover::before { opacity: 1; }

        .stat-icon {
          font-size: 1rem; color: var(--accent);
          margin-bottom: 0.5rem; line-height: 1;
          position: relative; z-index: 1;
          transition: transform 0.3s;
        }
        .stat-card:hover .stat-icon { transform: scale(1.2) rotate(15deg); }

        .stat-number {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: var(--text); line-height: 1;
          margin-bottom: 0.3rem;
          position: relative; z-index: 1;
          letter-spacing: -0.02em;
        }
        .stat-label {
          font-size: 0.72rem; color: var(--muted); font-weight: 500;
          letter-spacing: 0.03em; line-height: 1.3;
          position: relative; z-index: 1;
          margin-bottom: 0.75rem;
        }
        .stat-bar-wrap {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: var(--border);
        }
        .stat-bar {
          height: 100%; background: var(--accent);
          border-radius: 0 2px 2px 0;
        }

        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 540px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }

        .btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 500;
          padding: 0.7rem 1.4rem; border-radius: var(--r);
          cursor: pointer; text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
          border: 1.5px solid transparent;
          white-space: nowrap;
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }
        .btn-primary:hover { background: var(--accent-h); border-color: var(--accent-h); }
        .btn-outline { background: transparent; color: var(--text); border-color: var(--border); }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

        .sec-tag {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 0.6rem;
        }
        .sec-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.7rem, 4vw, 2.6rem);
          line-height: 1.1; color: var(--text); margin-bottom: 0.9rem;
        }
        .sec-title em { font-style: italic; color: var(--accent); }
        .sec-divider {
          width: 32px; height: 2px;
          background: var(--border); border-radius: 2px;
          margin-bottom: 3rem;
        }

        #about { background: var(--bg2); }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: start;
        }
        .info-label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 0.3rem;
        }
        .info-value { font-size: 0.95rem; color: var(--text); margin-bottom: 1.35rem; }

        .lang-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.35rem; }
        .lang-tag {
          background: var(--accent-lt); color: var(--accent);
          font-size: 0.8rem; font-weight: 500;
          padding: 0.28rem 0.75rem; border-radius: 99px;
        }

        .edu-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .edu-item {
          padding: 0.85rem 1rem;
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--r); font-size: 0.9rem; color: var(--text);
          transition: border-color 0.2s;
        }
        .edu-item:hover { border-color: var(--accent); }
        .edu-year {
          display: block; font-size: 0.75rem; font-weight: 700;
          color: var(--accent); margin-bottom: 0.25rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .skill-group-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.25rem 1.4rem;
          transition: border-color 0.2s;
        }
        .skill-group-card:hover { border-color: var(--accent); }
        .skill-group-label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 0.85rem;
        }
        .pills { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .pill {
          background: var(--pill-bg); color: var(--pill-text);
          font-size: 0.82rem; font-weight: 400;
          padding: 0.3rem 0.8rem; border-radius: 99px;
          border: 1px solid var(--border);
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          cursor: default;
        }
        .pill:hover { background: var(--accent-lt); color: var(--accent); border-color: var(--accent); }

        #projects { background: var(--bg2); }
        .tabs { display: flex; gap: 0.35rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .tab-btn {
          background: none; border: 1.5px solid var(--border); cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 500; color: var(--muted);
          padding: 0.42rem 1.1rem; border-radius: 99px;
          transition: all 0.2s;
        }
        .tab-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
        .tab-btn:not(.active):hover { border-color: var(--accent); color: var(--accent); }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }

        .proj-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px; overflow: hidden;
          display: flex; flex-direction: column;
          transition: border-color 0.2s, box-shadow 0.25s, transform 0.25s;
        }
        .proj-card:hover {
          border-color: #bdbdb5; transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.07);
        }
        :root.dark .proj-card:hover { border-color: #383832; box-shadow: 0 8px 28px rgba(0,0,0,0.35); }

        .proj-slideshow {
          position: relative; width: 100%;
          aspect-ratio: 16 / 8;
          overflow: hidden; background: var(--bg2);
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .slide-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: left top;
          opacity: 0;
          transition: opacity 0.75s ease;
        }
        .slide-img.active { opacity: 1; }

        .proj-img-placeholder {
          width: 100%; aspect-ratio: 16 / 8;
          background: var(--bg2); border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--muted); font-size: 0.78rem; font-weight: 500;
          flex-shrink: 0; letter-spacing: 0.05em;
        }

        .slide-dots {
          position: absolute; bottom: 9px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 5px; z-index: 10;
        }
        .slide-dot {
          width: 6px; height: 6px; border-radius: 50%;
          border: none; padding: 0; cursor: pointer;
          background: rgba(255,255,255,0.45);
          transition: background 0.25s;
        }
        .slide-dot.active { background: rgba(255,255,255,0.95); }
        :root.dark .slide-dot { background: rgba(255,255,255,0.25); }
        :root.dark .slide-dot.active { background: rgba(255,255,255,0.8); }

        .proj-body { padding: 1.1rem 1.2rem 1rem; display: flex; flex-direction: column; flex: 1; }
        .proj-cat {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 0.35rem;
        }
        .proj-title { font-size: 0.975rem; font-weight: 600; color: var(--text); margin-bottom: 0.4rem; line-height: 1.3; }
        .proj-desc { font-size: 0.855rem; color: var(--muted); line-height: 1.6; margin-bottom: 0.75rem; flex: 1; }
        .proj-tech { font-size: 0.76rem; color: var(--muted); margin-bottom: 0.7rem; font-style: italic; }

        .proj-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.85rem; }
        .proj-tag {
          background: var(--accent-lt); color: var(--accent);
          font-size: 0.68rem; font-weight: 500;
          padding: 0.22rem 0.6rem; border-radius: 99px;
        }
        .proj-link {
          margin-top: auto; font-size: 0.82rem; font-weight: 600;
          color: var(--accent); text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.18s; width: fit-content;
        }
        .proj-link:hover { border-color: var(--accent); }

        .show-more-wrap { display: flex; justify-content: center; margin-top: 2rem; }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 4rem; align-items: start;
        }
        .contact-item { margin-bottom: 1.35rem; }
        .contact-label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 0.3rem;
        }
        .contact-link {
          font-size: 0.92rem; color: var(--text);
          text-decoration: none; border-bottom: 1px solid transparent;
          transition: color 0.18s, border-color 0.18s;
        }
        .contact-link:hover { color: var(--accent); border-color: var(--accent); }

        .form-group { margin-bottom: 1rem; }
        .form-group label {
          display: block; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 0.4rem;
        }
        .form-ctrl {
          width: 100%; background: var(--bg2);
          border: 1.5px solid var(--border); border-radius: var(--r);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--text);
          padding: 0.65rem 0.9rem; outline: none; resize: vertical;
          transition: border-color 0.2s, background 0.2s;
        }
        .form-ctrl:focus { border-color: var(--accent); background: var(--bg); }
        textarea.form-ctrl { min-height: 110px; }
        .form-msg {
          margin-top: 0.75rem; font-size: 0.875rem; font-weight: 500;
          padding: 0.6rem 1rem; border-radius: var(--r);
        }
        .form-msg.success { background: var(--accent-lt); color: var(--accent); }
        .form-msg.error   { background: #fef2f2; color: #c0392b; }
        :root.dark .form-msg.error { background: #2a1515; color: #e07070; }

        .form-ctrl-err { border-color: #e74c3c !important; }
        .field-err {
          display: block; margin-top: 0.3rem;
          font-size: 0.75rem; color: #c0392b; font-weight: 500;
        }
        :root.dark .field-err { color: #e07070; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        footer {
          background: var(--text); color: #9a9a90;
          text-align: center; padding: 1.75rem 1.5rem;
          font-size: 0.82rem;
          transition: background 0.25s;
        }
        footer span { color: #fff; }
        :root.dark footer { background: #0a0a08; }
        :root.dark footer span { color: #e8e8e2; }

        .chat-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 300;
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--accent); color: #fff;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(45,90,61,0.38);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .chat-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(45,90,61,0.5); background: var(--accent-h); }
        .chat-fab svg { width: 24px; height: 24px; transition: transform 0.3s; }
        .chat-fab.open svg { transform: rotate(90deg); }
        .chat-fab-pulse {
          position: absolute; inset: -4px; border-radius: 50%;
          border: 2px solid var(--accent); opacity: 0;
          animation: pulse-ring 2.8s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.55; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .chat-online-dot {
          position: absolute; top: 1px; right: 1px;
          width: 13px; height: 13px; border-radius: 50%;
          background: #22c55e; border: 2px solid var(--bg);
        }
        .chat-window {
          position: fixed; bottom: 96px; right: 28px; z-index: 300;
          width: 370px; max-width: calc(100vw - 40px);
          height: 530px; max-height: calc(100vh - 120px);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06);
          display: flex; flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          transition: opacity 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.22s cubic-bezier(0.4,0,0.2,1);
        }
        .chat-window.hidden { opacity: 0; transform: scale(0.9) translateY(14px); pointer-events: none; }
        :root.dark .chat-window { box-shadow: 0 24px 64px rgba(0,0,0,0.55); }
        .chat-header {
          padding: 13px 15px 13px 14px;
          background: var(--accent);
          display: flex; align-items: center; gap: 10px;
          flex-shrink: 0;
        }
        .chat-header-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.05rem; flex-shrink: 0;
          border: 1.5px solid rgba(255,255,255,0.25);
        }
        .chat-header-info { flex: 1; min-width: 0; }
        .chat-header-name { font-size: 0.9rem; font-weight: 600; color: #fff; line-height: 1.2; }
        .chat-header-sub {
          font-size: 0.7rem; color: rgba(255,255,255,0.72);
          display: flex; align-items: center; gap: 5px; margin-top: 1px;
        }
        .chat-sub-dot { width: 6px; height: 6px; border-radius: 50%; background: #86efac; animation: blink 2s ease-in-out infinite; }
        .chat-close {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.7); padding: 5px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.18s, color 0.18s; flex-shrink: 0;
        }
        .chat-close:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .chat-close svg { width: 17px; height: 17px; }
        .chat-messages {
          flex: 1; overflow-y: auto; padding: 14px 13px 4px;
          display: flex; flex-direction: column; gap: 10px;
          scroll-behavior: smooth;
        }
        .chat-messages::-webkit-scrollbar { width: 3px; }
        .chat-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        .chat-msg { display: flex; gap: 8px; align-items: flex-end; animation: msg-in 0.25s ease; }
        @keyframes msg-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .chat-msg.user { flex-direction: row-reverse; }
        .chat-avatar {
          width: 27px; height: 27px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.68rem; font-weight: 700;
        }
        .chat-msg.bot  .chat-avatar { background: var(--accent-lt); color: var(--accent); }
        .chat-msg.user .chat-avatar { background: var(--pill-bg); color: var(--muted); }
        .chat-bubble {
          max-width: 80%; padding: 9px 13px; font-size: 0.845rem; line-height: 1.58; color: var(--text);
          border-radius: 14px; word-break: break-word;
        }
        .chat-msg.bot  .chat-bubble { background: var(--bg2); border: 1px solid var(--border); border-bottom-left-radius: 4px; }
        .chat-msg.user .chat-bubble { background: var(--accent); color: #fff; border-bottom-right-radius: 4px; }
        .chat-bubble a { color: inherit; text-decoration: underline; opacity: 0.85; }
        .chat-bubble strong { font-weight: 600; }
        .chat-typing { display: flex; gap: 5px; align-items: center; padding: 10px 13px; }
        .chat-typing span {
          width: 7px; height: 7px; border-radius: 50%; background: var(--muted); opacity: 0.45;
          animation: tdot 1.3s ease-in-out infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: 0.18s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.36s; }
        @keyframes tdot { 0%,60%,100%{transform:translateY(0);opacity:0.35;} 30%{transform:translateY(-5px);opacity:1;} }
        .chat-suggestions { padding: 2px 13px 10px; display: flex; flex-wrap: wrap; gap: 6px; flex-shrink: 0; }
        .chat-chip {
          background: var(--accent-lt); color: var(--accent);
          border: 1px solid transparent; border-radius: 99px;
          font-family: 'DM Sans', sans-serif; font-size: 0.74rem; font-weight: 500;
          padding: 5px 11px; cursor: pointer;
          transition: background 0.18s, border-color 0.18s; white-space: nowrap;
        }
        .chat-chip:hover { border-color: var(--accent); background: var(--bg); }
        .chat-input-row {
          padding: 9px 11px 11px;
          border-top: 1px solid var(--border);
          display: flex; gap: 7px; align-items: flex-end;
          flex-shrink: 0; background: var(--bg);
        }
        .chat-input {
          flex: 1; background: var(--bg2);
          border: 1.5px solid var(--border); border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.865rem; color: var(--text);
          padding: 8px 11px; outline: none; resize: none;
          max-height: 90px; line-height: 1.45;
          transition: border-color 0.2s;
        }
        .chat-input:focus { border-color: var(--accent); background: var(--bg); }
        .chat-input::placeholder { color: var(--muted); }
        .chat-send {
          width: 37px; height: 37px; border-radius: 10px;
          background: var(--accent); color: #fff; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.18s, transform 0.15s;
        }
        .chat-send:hover:not(:disabled) { background: var(--accent-h); transform: scale(1.06); }
        .chat-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .chat-send svg { width: 16px; height: 16px; }
        .chat-hint { text-align: center; font-size: 0.66rem; color: var(--muted); padding: 0 12px 7px; flex-shrink: 0; }
        @media (max-width: 480px) {
          .chat-fab { bottom: 18px; right: 18px; }
          .chat-window { bottom: 82px; right: 18px; width: calc(100vw - 36px); height: 480px; }
        }

        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          section { padding: 4rem 1.25rem; }
          .hero-grid { grid-template-columns: 1fr; }
          .hero-photo-wrap { order: -1; }
          .hero-photo-frame { width: min(100%, 240px); margin: 0 auto; }
          .hero-badge { display: none; }
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .projects-grid { grid-template-columns: 1fr; }
          .skills-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .hero-name { font-size: 2.4rem; }
          .hero-btns { flex-direction: column; }
          .btn { justify-content: center; }
        }
      `}</style>

      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => scrollTo("home")}>Hajar<span>.</span></button>
          <div className="nav-right">
            <ul className="nav-links">
              {NAV_LINKS.map(l => <li key={l}><button className="nav-btn" onClick={() => scrollTo(l.toLowerCase())}>{l}</button></li>)}
            </ul>
<button className="theme-btn" onClick={() => setDarkMode(d => !d)} aria-label="Toggle theme">
  {darkMode ? (
    // Sun icon (shown in dark mode → click to go light)
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="4"/>
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ) : (
    // Moon icon (shown in light mode → click to go dark)
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  )}
</button>



            <button className={`hamburger${navOpen ? " open" : ""}`} onClick={() => setNavOpen(o => !o)}><span /><span /><span /></button>
          </div>
        </div>
        <div className={`mobile-menu${navOpen ? " open" : ""}`}>
          {NAV_LINKS.map(l => <button key={l} className="nav-btn" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>)}
          <button className="nav-btn" onClick={() => { setDarkMode(d => !d); setNavOpen(false); }}>{darkMode ? "☀" : "🌙"}</button>
        </div>
      </nav>

      <section id="home">
        <div className="container">
          <FadeSection>
            <div className="hero-grid">
              <div>
                <div className="hero-eyebrow"><div className="hero-dot" />Available for freelance &amp; opportunities</div>
                <h1 className="hero-name">Hajar<br /><em>Lafdaoui</em></h1>
                <p className="hero-role">Full Stack Developer &amp; BI Engineer</p>
                <div className="hero-rule" />
                <p className="hero-desc">I build clean, purposeful digital products — from data-rich dashboards to full-stack web applications and AI-powered tools. Based in Agadir, Morocco.</p>
                <div className="hero-btns">
                  <div className="cv-group">
                    <span className="cv-main"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11" /></svg>Download CV</span>
                    <span className="cv-sep" />
                    <button className="cv-lang" onClick={() => handleDownloadCV("fr")}>FR</button>
                    <button className="cv-lang" onClick={() => handleDownloadCV("en")}>EN</button>
                  </div>
                  <button className="btn btn-outline" onClick={() => scrollTo("projects")}>View Projects</button>
                </div>
              </div>
              <div className="hero-photo-wrap">
                <div className="hero-photo-frame">
                  {imgError ? (
                    <div className="hero-photo-placeholder">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="18" r="10" stroke="currentColor" strokeWidth="2"/><path d="M4 44c0-11 8.95-20 20-20s20 8.95 20 20" stroke="currentColor" strokeWidth="2"/></svg>
                      <span>Add photo at public/profile.jpg</span>
                    </div>
                  ) : (
                    <img src="/profile.jpg" alt="Hajar" onError={() => setImgError(true)} />
                  )}
                </div>
                <HeroBadge1 /><HeroBadge2 />
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <section id="stats" style={{ padding: "3rem 1.5rem", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container"><div className="stats-grid">{STATS.map((s, i) => <AnimatedStat key={s.label} {...s} delay={i * 0.08} />)}</div></div>
      </section>

      <section id="about">
        <div className="container">
          <FadeSection><div className="sec-tag">About</div><h2 className="sec-title">A bit about <em>me</em></h2><div className="sec-divider" /></FadeSection>
          <FadeSection delay={0.1}>
            <div className="about-grid">
              <div>
                <div className="info-label">Full Name</div><div className="info-value">Hajar Lafdaoui</div>
                <div className="info-label">Age</div><div className="info-value">22 years old</div>
                <div className="info-label">Location</div><div className="info-value">Agadir, Morocco</div>
                <div className="info-label">Currently</div><div className="info-value">Pursuing Licence in Business Intelligence &amp; Big Data</div>
                <div className="info-label">Languages</div><LanguageBars />
              </div>
              <div>
                <div className="info-label" style={{ marginBottom: "0.75rem" }}>Education</div>
                <ul className="edu-list">
                  <li className="edu-item"><span className="edu-year">2026 – In Progress</span>Licence — Business Intelligence &amp; Big Data</li>
                  <li className="edu-item"><span className="edu-year">2025</span>Diplôme — Développement Digital, option Web (OFPPT)</li>
                  <li className="edu-item"><span className="edu-year">2022</span>Baccalauréat — Sciences Physiques, option Française</li>
                </ul>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <FadeSection><div className="sec-tag">Skills</div><h2 className="sec-title">What I work <em>with</em></h2><div className="sec-divider" /></FadeSection>
          <FadeSection delay={0.08}>
            <div className="skills-grid">{Object.entries(SKILLS).map(([group, skills]) => (<div key={group} className="skill-group-card"><div className="skill-group-label">{group}</div><div className="pills">{skills.map(s => <span key={s} className="pill">{s}</span>)}</div></div>))}</div>
          </FadeSection>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <FadeSection>
            <div className="sec-tag">Projects</div>
            <h2 className="sec-title">Selected <em>work</em></h2>
            <div className="sec-divider" />
            <div className="tabs">{TABS.map(t => <button key={t} className={`tab-btn${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>{t === "BI" ? "BI & Big Data" : t}</button>)}</div>
          </FadeSection>
          <div className="projects-grid">{visible.map((p, i) => (<FadeSection key={p.id} delay={i * 0.06} style={{ display: "flex", flexDirection: "column" }}><div className="proj-card"><Slideshow images={p.images} title={p.title} /><div className="proj-body"><div className="proj-cat">{p.category === "BI" ? "BI & Big Data" : p.category}</div><div className="proj-title">{p.title}</div><div className="proj-desc">{p.desc}</div><div className="proj-tech">{p.tech}</div>{p.tags && <div className="proj-tags">{p.tags.map(tag => <span key={tag} className="proj-tag">{tag}</span>)}</div>}<a href={p.github} className="proj-link" target="_blank" rel="noopener noreferrer">View on GitHub →</a></div></div></FadeSection>))}</div>
          {hasMore && <div className="show-more-wrap"><button className="btn btn-outline" onClick={() => setVisibleCount(c => c + 3)}>Show more projects ({filtered.length - visibleCount} remaining)</button></div>}
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <FadeSection><div className="sec-tag">Contact</div><h2 className="sec-title">Let's <em>connect</em></h2><div className="sec-divider" /></FadeSection>
          <FadeSection delay={0.1}>
            <div className="contact-grid">
              <div>
                <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>Open to freelance projects, internships, and full-time opportunities. I respond within 24 hours.</p>
                <div className="contact-item"><div className="contact-label">Email</div><a href="mailto:hajarlafdaoui@gmail.com" className="contact-link">hajarlafdaoui@gmail.com</a></div>
                <div className="contact-item"><div className="contact-label">GitHub</div><a href="https://github.com/hajarLafdaoui" target="_blank" rel="noopener noreferrer" className="contact-link">github.com/hajarLafdaoui</a></div>
                <div className="contact-item"><div className="contact-label">LinkedIn</div><a href="https://linkedin.com/in/hajar-lafdaoui" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/hajar-lafdaoui</a></div>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <input type="text" name="_gotcha" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{ display: "none" }} />
                <div className="form-group"><label htmlFor="name">Name</label><input id="name" type="text" className={`form-ctrl${formErrors.name ? " form-ctrl-err" : ""}`} placeholder="Your full name" value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); if (formErrors.name) setFormErrors(fe => ({ ...fe, name: "" })); }} disabled={formStatus === "sending"} />{formErrors.name && <span className="field-err">{formErrors.name}</span>}</div>
                <div className="form-group"><label htmlFor="email">Email</label><input id="email" type="email" className={`form-ctrl${formErrors.email ? " form-ctrl-err" : ""}`} placeholder="your@email.com" value={form.email} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); if (formErrors.email) setFormErrors(fe => ({ ...fe, email: "" })); }} disabled={formStatus === "sending"} />{formErrors.email && <span className="field-err">{formErrors.email}</span>}</div>
                <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" className={`form-ctrl${formErrors.message ? " form-ctrl-err" : ""}`} placeholder="Tell me about your project..." value={form.message} onChange={e => { setForm(f => ({ ...f, message: e.target.value })); if (formErrors.message) setFormErrors(fe => ({ ...fe, message: "" })); }} disabled={formStatus === "sending"} />{formErrors.message && <span className="field-err">{formErrors.message}</span>}</div>
                <button type="submit" className="btn btn-primary" disabled={formStatus === "sending"} style={{ width: "100%", justifyContent: "center" }}>{formStatus === "sending" ? (<span><span className="spinner" /> Sending…</span>) : "Send Message →"}</button>
                {formStatus === "success" && <div className="form-msg success">✓ Message sent! I'll reply within 24 hours.</div>}
                {formStatus === "error" && <div className="form-msg error">✗ Error. Please email me at hajarlafdaoui@gmail.com</div>}
              </form>
            </div>
          </FadeSection>
        </div>
      </section>

      <AiChat />

      <footer>© 2026 <span>Hajar Lafdaoui</span> — Built with simplicity &amp; care</footer>
    </>
  );
}