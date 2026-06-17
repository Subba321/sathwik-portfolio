import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Google Font ─── */
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { background: #0C0C0C; font-family: 'Kanit', sans-serif; }
    .hero-heading {
      background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `}</style>
);

/* ─── FadeIn ─── */
function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnet ─── */
function Magnet({ children, padding = 150, strength = 3 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;
      if (dist < threshold) { setActive(true); setPos({ x: dx / strength, y: dy / strength }); }
      else { setActive(false); setPos({ x: 0, y: 0 }); }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [padding, strength]);
  return (
    <div ref={ref} style={{ display: "inline-block", willChange: "transform" }}>
      <div style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}>{children}</div>
    </div>
  );
}

/* ─── ContactButton ─── */
function ContactButton({ href = "mailto:Sathwiksubba04@gmail.com" }) {
  return (
    <a href={href}>
      <button style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white", outlineOffset: "-3px", borderRadius: "9999px",
        border: "none", cursor: "pointer", color: "white",
        fontFamily: "'Kanit', sans-serif", fontWeight: 500,
        textTransform: "uppercase", letterSpacing: "0.15em",
      }} className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base">
        Contact Me
      </button>
    </a>
  );
}

/* ─── AnimatedText ─── */
function CharSpan({ char, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <span style={{ position: "relative", display: "inline" }}>
      <span style={{ opacity: 0.15 }}>{char}</span>
      <motion.span style={{ opacity, position: "absolute", left: 0, top: 0 }}>{char}</motion.span>
    </span>
  );
}
function AnimatedText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const chars = text.split("");
  return (
    <p ref={ref} className={className} style={{ position: "relative", color: "#D7E2EA" }}>
      {chars.map((char, i) => (
        <CharSpan key={i} char={char} progress={scrollYProgress}
          start={i / chars.length} end={(i + 1) / chars.length} />
      ))}
    </p>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  return (
    <section className="h-screen flex flex-col"
      style={{ overflowX: "clip", background: "#0C0C0C", position: "relative" }}>
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
          {["About", "Skills", "Projects", "Contact"].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-sm md:text-lg font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
              style={{ color: "#D7E2EA", textDecoration: "none" }}>{link}</a>
          ))}
        </nav>
      </FadeIn>
      <div style={{ overflow: "hidden" }}>
  <FadeIn delay={0.15} y={40}>
    <h1
      className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-2"
      style={{ display: "block" }}
    >
      Sathwik
    </h1>
  </FadeIn>
  <FadeIn delay={0.35} y={30}>
    <motion.h2
      className="font-black uppercase tracking-widest whitespace-nowrap w-full text-[6vw] sm:text-[6.5vw] md:text-[7vw] lg:text-[7.5vw]"
      style={{
        color: "#D7E2EA",
        opacity: 0.55,
        letterSpacing: "0.25em",
        paddingLeft: "0.15em",
      }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      Subba
    </motion.h2>
  </FadeIn>
</div>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 0, zIndex: 10 }}
        className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[500px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
              <defs>
                <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#B600A8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0C0C0C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="200" cy="300" rx="180" ry="160" fill="url(#glow1)" />
              {[[200,100],[120,180],[280,180],[80,280],[200,260],[320,280],[140,370],[260,370]].map(([cx,cy],i) => (
                <motion.circle key={i} cx={cx} cy={cy} r={i===4?22:14} fill="none"
                  stroke={i===4?"#B600A8":"#7621B0"} strokeWidth={i===4?3:2}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2+(i%3)*0.5, repeat: Infinity, delay: i*0.3 }} />
              ))}
              {["200,100 120,180","200,100 280,180","120,180 80,280","120,180 200,260",
                "280,180 200,260","280,180 320,280","80,280 140,370","200,260 140,370",
                "200,260 260,370","320,280 260,370"].map((pts,i) => (
                <motion.polyline key={i} points={pts} fill="none" stroke="#BBCCD7" strokeWidth="1"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i*0.2 }} />
              ))}
              <motion.circle cx="200" cy="260" r="8" fill="#B600A8"
                animate={{ scale: [1,1.4,1], opacity: [0.7,1,0.7] }}
                transition={{ duration: 2, repeat: Infinity }} />
              <text x="200" y="440" textAnchor="middle" fill="#D7E2EA"
                fontFamily="Kanit,sans-serif" fontSize="13" fontWeight="300" opacity="0.6"
                letterSpacing="4">AI · ML · CLOUD</text>
            </svg>
          </Magnet>
        </FadeIn>
      </div>
      <div className="flex justify-between items-end mt-auto pb-7 sm:pb-8 md:pb-10 px-6 md:px-10"
        style={{ position: "relative", zIndex: 20 }}>
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px] font-light uppercase tracking-wide leading-snug"
            style={{ color: "#D7E2EA", fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}>
            AI & ML Engineer crafting intelligent, scalable systems
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}><ContactButton /></FadeIn>
      </div>
    </section>
  );
}

/* ─── SKILLS TICKER ─── */
const SKILLS = ["Python","PySpark","AWS EC2","S3","Lambda","Databricks","Delta Lake",
  "MLflow","scikit-learn","Pandas","NumPy","Power BI","Random Forest","ARIMA",
  "SVM","KNN","n8n","Spark SQL","PyTorch","GitHub","Linear Regression","Time Series"];

function SkillPill({ label }) {
  return (
    <div className="flex-shrink-0 px-5 py-3 rounded-full border font-medium uppercase tracking-widest text-sm"
      style={{ borderColor:"rgba(187,204,215,0.3)", color:"#BBCCD7", background:"rgba(187,204,215,0.05)", whiteSpace:"nowrap" }}>
      {label}
    </div>
  );
}
function MarqueeSection() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const tripled = [...SKILLS, ...SKILLS, ...SKILLS];
  const row2 = [...SKILLS, ...SKILLS, ...SKILLS].slice(SKILLS.length);
  return (
    <div ref={sectionRef} className="pt-16 sm:pt-24 pb-10 overflow-hidden" style={{ background: "#0C0C0C" }}>
      <div style={{ overflow:"hidden", marginBottom:"12px" }}>
        <div className="flex gap-3" style={{ transform:`translateX(${offset-200}px)`, willChange:"transform" }}>
          {tripled.map((s,i) => <SkillPill key={i} label={s} />)}
        </div>
      </div>
      <div style={{ overflow:"hidden" }}>
        <div className="flex gap-3" style={{ transform:`translateX(${-(offset-200)}px)`, willChange:"transform" }}>
          {row2.map((s,i) => <SkillPill key={i} label={s} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── ABOUT ─── */
function AboutSection() {
  return (
    <section id="about" className="relative flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 md:px-10 py-20"
      style={{ background: "#0C0C0C" }}>
      {/* Corner decorations */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[4%]">
        <svg width="160" height="160" viewBox="0 0 160 160" className="w-[100px] sm:w-[160px]">
          <circle cx="80" cy="80" r="60" fill="none" stroke="#B600A8" strokeWidth="1.5" opacity="0.35"/>
          <circle cx="80" cy="80" r="40" fill="none" stroke="#7621B0" strokeWidth="1" opacity="0.25"/>
          <motion.circle cx="80" cy="80" r="5" fill="#B600A8"
            animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:2, repeat:Infinity }}/>
        </svg>
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[4%]">
        <svg width="160" height="160" viewBox="0 0 160 160" className="w-[100px] sm:w-[160px]">
          {[[40,40],[120,40],[80,110]].map(([x,y],i) => (
            <motion.circle key={i} cx={x} cy={y} r="10" fill="none" stroke="#BBCCD7" strokeWidth="1.5"
              animate={{ scale:[1,1.3,1], opacity:[0.3,0.7,0.3] }}
              transition={{ duration:2.5, repeat:Infinity, delay:i*0.4 }}/>
          ))}
          <polyline points="40,40 120,40 80,110 40,40" fill="none" stroke="#BBCCD7" strokeWidth="1" opacity="0.3"/>
        </svg>
      </FadeIn>
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-10 max-w-4xl w-full">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize:"clamp(3rem, 12vw, 140px)" }}>About me</h2>
        </FadeIn>
        <AnimatedText
          text="Final-year B.Tech student in Artificial Intelligence & Machine Learning. Experienced with end-to-end AWS pipelines, Databricks big data engineering, and production-grade ML systems. I build intelligent, scalable solutions that turn raw data into real business impact."
          className="text-center font-medium leading-relaxed max-w-[560px]"
          style={{ fontSize:"clamp(1rem, 2vw, 1.35rem)" }}
        />
        <div className="mt-8 sm:mt-12 md:mt-16"><ContactButton /></div>
      </div>
    </section>
  );
}

/* ─── SKILLS SECTION ─── */
const SKILL_ITEMS = [
  { num:"01", name:"Machine Learning", desc:"SVM, Random Forest, KNN, Linear & Logistic Regression, K-Means, ARIMA, and time series forecasting for real-world prediction challenges." },
  { num:"02", name:"Cloud — AWS", desc:"EC2, S3, Lambda, RDS, IAM — provisioning, monitoring, auto-scaling, and event-driven serverless pipelines on AWS." },
  { num:"03", name:"Big Data & Databricks", desc:"Production PySpark pipelines, Delta Lake ACID transactions, Spark SQL analytics, and MLflow for reproducible experiment tracking." },
  { num:"04", name:"Automation & Pipelines", desc:"n8n and AWS Lambda orchestration — reducing DevOps overhead by 70% with intelligent scheduling, alerting, and event-driven triggers." },
  { num:"05", name:"Data Analysis & Viz", desc:"Pandas, NumPy, Matplotlib, Seaborn, Power BI — from EDA and feature engineering to interactive BI dashboards." },
];
function SkillsSection() {
  return (
    <section id="skills" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background:"#FFFFFF", borderRadius:"40px 40px 0 0" }}>
      <FadeIn delay={0}>
        <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ color:"#0C0C0C", fontSize:"clamp(3rem, 12vw, 140px)", lineHeight:1 }}>Skills</h2>
      </FadeIn>
      <div className="max-w-5xl mx-auto">
        {SKILL_ITEMS.map((item, i) => (
          <FadeIn key={item.num} delay={i * 0.1}>
            <div className="flex gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{ borderTop: i===0?"1px solid rgba(12,12,12,0.15)":"none", borderBottom:"1px solid rgba(12,12,12,0.15)" }}>
              <span className="font-black flex-shrink-0"
                style={{ fontSize:"clamp(3rem, 10vw, 120px)", color:"#0C0C0C", lineHeight:1 }}>{item.num}</span>
              <div className="flex flex-col justify-center gap-1">
                <span className="font-medium uppercase" style={{ fontSize:"clamp(1rem, 2.2vw, 2rem)", color:"#0C0C0C" }}>{item.name}</span>
                <span className="font-light leading-relaxed max-w-2xl"
                  style={{ fontSize:"clamp(0.85rem, 1.6vw, 1.2rem)", color:"#0C0C0C", opacity:0.6 }}>{item.desc}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
const PROJECTS = [
  { num:"01", name:"AWS Automation Pipeline", category:"Cloud · DevOps", link:"https://github.com/Subba321",
    desc:"n8n orchestration of EC2, S3, Lambda & RDS — auto-scaling on CPU thresholds, PyTorch time-series models. Reduced DevOps overhead 70%.",
    tags:["n8n","AWS EC2","Lambda","S3","PyTorch"], color:"#B600A8" },
  { num:"02", name:"Time Series Forecasting", category:"Big Data · ML", link:"https://github.com/Subba321",
    desc:"Production PySpark pipeline on Databricks, ARIMA + RSI/MACD/EMA indicators, Delta Lake ACID compliance, MLflow experiment tracking.",
    tags:["Databricks","PySpark","Delta Lake","MLflow","ARIMA"], color:"#7621B0" },
  { num:"03", name:"House Price Prediction", category:"Supervised Learning", link:"https://github.com/Subba321/House_price_pred",
    desc:"Linear Regression with feature engineering, outlier handling, imputation. Evaluated via R², MAE, RMSE; visualized in Power BI dashboards.",
    tags:["scikit-learn","Pandas","Power BI","Matplotlib"], color:"#BE4C00" },
];
function ProjectCard({ project, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0,1], [1, 1-(total-1-index)*0.03]);
  return (
    <div ref={ref} style={{ height:"85vh", position:"relative" }}>
      <motion.div style={{ scale, position:"sticky", top:`${96+index*28}px`,
        background:"#0C0C0C", borderRadius:"40px", border:"2px solid #D7E2EA",
        padding:"clamp(16px,3vw,32px)", overflow:"hidden" }}>
        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
          <div className="flex items-end gap-4">
            <span className="font-black leading-none" style={{ fontSize:"clamp(3rem,8vw,110px)",
              background:`linear-gradient(180deg,${project.color}80 0%,${project.color} 100%)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              {project.num}
            </span>
            <div className="flex flex-col pb-2">
              <span className="font-light uppercase tracking-widest"
                style={{ color:"#D7E2EA", opacity:0.5, fontSize:"clamp(0.65rem,1.2vw,0.9rem)" }}>{project.category}</span>
              <span className="font-black uppercase"
                style={{ color:"#D7E2EA", fontSize:"clamp(1rem,2.5vw,2.2rem)", lineHeight:1.1 }}>{project.name}</span>
            </div>
          </div>
          <a href={project.link} target="_blank" rel="noreferrer">
            <button style={{ borderRadius:"9999px", border:"2px solid #D7E2EA", color:"#D7E2EA",
              background:"transparent", fontFamily:"'Kanit',sans-serif", fontWeight:500,
              textTransform:"uppercase", letterSpacing:"0.15em", cursor:"pointer" }}
              className="px-6 py-2 sm:px-8 sm:py-2.5 text-xs sm:text-sm hover:bg-white/10">
              View on GitHub
            </button>
          </a>
        </div>
        <p className="font-light leading-relaxed mb-5"
          style={{ color:"#D7E2EA", opacity:0.75, fontSize:"clamp(0.85rem,1.5vw,1.1rem)", maxWidth:"700px" }}>
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest"
              style={{ border:`1px solid ${project.color}60`, color:project.color, background:`${project.color}10` }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ position:"absolute", bottom:-60, right:-60, width:200, height:200,
          borderRadius:"50%", background:`radial-gradient(circle,${project.color}25 0%,transparent 70%)`,
          pointerEvents:"none" }}/>
      </motion.div>
    </div>
  );
}
function ProjectsSection() {
  return (
    <section id="projects" className="px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
      style={{ background:"#0C0C0C", borderRadius:"40px 40px 0 0", marginTop:"-40px", position:"relative", zIndex:10 }}>
      <FadeIn delay={0}>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize:"clamp(3rem, 12vw, 140px)" }}>Projects</h2>
      </FadeIn>
      <div className="max-w-5xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function ContactSection() {
  return (
    <section id="contact" className="px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 flex flex-col items-center gap-12"
      style={{ background: "#0C0C0C" }}>
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize:"clamp(3rem, 12vw, 140px)" }}>Let's Build</h2>
      </FadeIn>
      <FadeIn delay={0.2} y={20}>
        <p className="text-center font-light uppercase tracking-widest"
          style={{ color:"#D7E2EA", opacity:0.6, fontSize:"clamp(0.8rem, 1.5vw, 1.1rem)" }}>
          Open to opportunities & collaborations
        </p>
      </FadeIn>
      <FadeIn delay={0.35} y={20}><ContactButton /></FadeIn>
      <FadeIn delay={0.5} y={20}>
        <div className="flex gap-8 mt-4">
          {[
            { label:"GitHub", href:"https://github.com/Subba321" },
            { label:"LinkedIn", href:"https://www.linkedin.com/in/subbasathwik" },
            { label:"Email", href:"mailto:Sathwiksubba04@gmail.com" },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
              className="font-medium uppercase tracking-widest transition-opacity duration-200 hover:opacity-70"
              style={{ color:"#D7E2EA", fontSize:"clamp(0.8rem,1.3vw,1rem)", textDecoration:"none" }}>
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>
      <div className="mt-20 font-light tracking-widest uppercase"
        style={{ color:"#D7E2EA", opacity:0.2, fontSize:"0.75rem" }}>
        © 2025 Subba Sathwik · Hyderabad, India
      </div>
    </section>
  );
}

/* ─── APP ─── */
export default function App() {
  return (
    <div style={{ background:"#0C0C0C", overflowX:"clip" }}>
      <FontLink />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}