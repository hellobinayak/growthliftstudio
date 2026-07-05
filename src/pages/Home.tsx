import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  TrendingUp,
  Target,
  Layers,
  Calendar
} from "lucide-react";
import { DotGrid, LightBeam, BeamPattern, FloatingDots } from "../components/BackgroundEffects";
import { Button, InteractiveCard } from "../components/UI";
import { ProximityBadge } from "../components/ProximityBadge";
import { Link } from "react-router-dom";
import { useSurvey } from "../context/SurveyContext";
import TestimonialSlider from "../components/TestimonialSlider";
import { SEO } from "../components/SEO";

// Real brand marks for the "platforms we build on" bar.
// Exact single-path logos from Simple Icons (simpleicons.org), inlined so the
// live site has no external logo dependency. Rendered in brand color and
// desaturated at rest — see the marquee below. GoHighLevel has no Simple Icons
// mark, so it renders as a wordmark (path omitted).
const PLATFORM_LOGOS: { name: string; color: string; path?: string }[] = [
  {
    name: "Meta",
    color: "#0467DF",
    path: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z",
  },
  {
    name: "Google",
    color: "#4285F4",
    path: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  },
  {
    name: "Stripe",
    color: "#635BFF",
    path: "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z",
  },
  {
    name: "Twilio",
    color: "#F22F46",
    path: "M12 0C5.381-.008.008 5.352 0 11.971V12c0 6.64 5.359 12 12 12 6.64 0 12-5.36 12-12 0-6.641-5.36-12-12-12zm0 20.801c-4.846.015-8.786-3.904-8.801-8.75V12c-.014-4.846 3.904-8.786 8.75-8.801H12c4.847-.014 8.786 3.904 8.801 8.75V12c.015 4.847-3.904 8.786-8.75 8.801H12zm5.44-11.76c0 1.359-1.12 2.479-2.481 2.479-1.366-.007-2.472-1.113-2.479-2.479 0-1.361 1.12-2.481 2.479-2.481 1.361 0 2.481 1.12 2.481 2.481zm0 5.919c0 1.36-1.12 2.48-2.481 2.48-1.367-.008-2.473-1.114-2.479-2.48 0-1.359 1.12-2.479 2.479-2.479 1.361-.001 2.481 1.12 2.481 2.479zm-5.919 0c0 1.36-1.12 2.48-2.479 2.48-1.368-.007-2.475-1.113-2.481-2.48 0-1.359 1.12-2.479 2.481-2.479 1.358-.001 2.479 1.12 2.479 2.479zm0-5.919c0 1.359-1.12 2.479-2.479 2.479-1.367-.007-2.475-1.112-2.481-2.479 0-1.361 1.12-2.481 2.481-2.481 1.358 0 2.479 1.12 2.479 2.481z",
  },
  { name: "GoHighLevel", color: "#2A3EC4" },
];

// Kept at module scope so its array identity is stable across renders
// (prevents the typewriter effect from resetting on every parent re-render).
const TRADES = [
  "Remodelers",
  "Landscapers",
  "HVAC Pros",
  "Plumbers",
  "Roofers",
  "Window & Door Pros",
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { openSurvey } = useSurvey();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <SEO 
        title="Growth Lift Studio | Lead Generation for Home Improvement Contractors" 
        description="We build high-velocity booked appointment pipelines for B2B home improvement contractors. Pay only when you close jobs. First 5 appointments free."
      />
      {/* Global Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden min-h-screen">
        <motion.div style={{ y: backgroundY }} className="h-full w-full relative">
          <DotGrid />
          <FloatingDots count={60} className="opacity-40" />
          <LightBeam className="opacity-40" />
          
          {/* Subtle Cursor Follow Glow */}
          <motion.div 
            animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }}
            transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
            className="absolute h-[600px] w-[600px] rounded-full bg-brand-cyan/5 blur-[100px] pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-12 px-6 overflow-hidden">
        {/* Moving Dots restricted to Hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <FloatingDots count={40} className="opacity-60" />
          <BeamPattern className="opacity-10" />
        </div>
        
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <ProximityBadge
                label="Built for"
                items={TRADES}
                ariaLabel="Built for home improvement pros"
              />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-sans font-extrabold tracking-tighter mb-6 leading-[0.95] text-balance text-brand-navy">
              Your calendar shouldn’t <br />
              <span className="shimmer-text text-brand-cyan">have empty slots.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-10 text-balance leading-relaxed">
              We build systems that bring in <span className="text-brand-navy font-bold">booked, confirmed jobs</span>—not inquiries you have to chase.
            </p>

            {/* Proof stat strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 gap-y-5 mb-10">
              {[
                { value: "370+", label: "Jobs booked in 2025" },
                { value: "First 5", label: "Appointments free" },
                { value: "Pay on close", label: "Only when you win" },
              ].map((stat, i) => (
                <React.Fragment key={stat.value}>
                  {i > 0 && <div className="hidden sm:block h-9 w-px bg-zinc-200/80" aria-hidden="true" />}
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-brand-navy">{stat.value}</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 mt-0.5">{stat.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button
                onClick={openSurvey}
                size="xl"
                className="bg-brand-navy text-white hover:bg-brand-navy/90 shadow-xl shadow-brand-navy/20 w-full sm:w-auto"
              >
                Book a Call
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Link to="/results">
                <Button variant="outline" size="xl" className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 w-full sm:w-auto">
                  See case studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credibility Section - Trusted By Bar */}
      <section className="relative z-10 py-16 md:py-24 bg-white border-y border-zinc-200/50 overflow-hidden">
        {/* Ambient cyan glow */}
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,194,224,0.08),transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 relative">
          {/* Eyebrow pill */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-white px-4 py-1.5 elev-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-navy/70">The platforms we build on</span>
            </motion.div>
          </div>

          {/* Elevated marquee trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group/bar relative mx-auto max-w-4xl rounded-2xl bg-white border border-zinc-200/80 overflow-hidden elev-soft"
          >
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-[marquee_28s_linear_infinite] group-hover/bar:[animation-play-state:paused] py-6">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center gap-10 sm:gap-14 px-5 sm:px-7 shrink-0" aria-hidden={dup === 1}>
                  {PLATFORM_LOGOS.map((logo, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
                    >
                      {logo.path && (
                        <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill={logo.color} aria-hidden="true">
                          <path d={logo.path} />
                        </svg>
                      )}
                      <span className="font-sans font-black text-sm tracking-tight text-brand-navy/70 whitespace-nowrap">
                        {logo.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative z-10 py-20 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-brand-cyan-ink uppercase tracking-[0.2em] mb-6">The Outcome</h2>
            <p className="text-3xl sm:text-4xl md:text-6xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
              Stop chasing inquiries. <br />
              <span className="text-brand-cyan">Start booking jobs.</span>
            </p>
            <p className="text-xl text-zinc-500 leading-relaxed font-medium max-w-xl">
              Most agencies measure success in 'leads'. We measure it in confirmed appointments that fit your crew's schedule.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Feature card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="sm:col-span-2 sm:row-span-2 relative overflow-hidden rounded-3xl bg-brand-navy p-8 md:p-10 elev-cyan"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(0,194,224,0.22),transparent_55%)] pointer-events-none" />
              <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-11 w-11 bg-brand-cyan rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-5 w-5 text-brand-navy" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">High-Intent Only</h3>
                <p className="text-zinc-300 leading-relaxed font-medium max-w-sm mb-8">
                  We filter for buying intent, so your crew spends time on homeowners ready to book—not price-shoppers.
                </p>
                <div className="mt-auto flex items-end gap-3 pt-6 border-t border-white/10">
                  <span className="text-5xl md:text-6xl font-sans font-black text-brand-cyan leading-none">370+</span>
                  <span className="text-sm text-zinc-400 pb-1 leading-tight">confirmed jobs booked<br />for our clients in 2025</span>
                </div>
              </div>
            </motion.div>

            {/* Small card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-white border border-zinc-200/70 p-6 md:p-7 elev-soft"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/5 flex items-center justify-center mb-4 group-hover:from-brand-cyan group-hover:to-brand-cyan transition-colors">
                <TrendingUp className="h-5 w-5 text-brand-cyan-ink group-hover:text-brand-navy transition-colors" />
              </div>
              <h3 className="text-lg font-black text-brand-navy mb-1.5">Predictable Flow</h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">A pipeline that doesn't go silent between seasons.</p>
            </motion.div>

            {/* Small card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl bg-white border border-zinc-200/70 p-6 md:p-7 elev-soft"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/5 flex items-center justify-center mb-4 group-hover:from-brand-cyan group-hover:to-brand-cyan transition-colors">
                <Layers className="h-5 w-5 text-brand-cyan-ink group-hover:text-brand-navy transition-colors" />
              </div>
              <h3 className="text-lg font-black text-brand-navy mb-1.5">Turnkey Build</h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">We run the tech and targeting. You run the crew.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section Preview */}
      <section id="process" className="relative z-10 py-20 md:py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-20 text-balance">
            <h2 className="text-sm font-bold text-brand-cyan-ink uppercase tracking-[0.2em] mb-4">Process</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight">
              Simple system. Clear outcome.
            </p>
          </div>

          <div className="relative">
            {/* Connector rail (desktop) — ties the four steps into one journey */}
            <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-cyan/10 via-brand-cyan/50 to-brand-cyan/10" />

            <div className="grid lg:grid-cols-4 gap-6 lg:gap-5">
              {[
                { step: "01", title: "Audit", desc: "We study your service area, your competition, and exactly where your current pipeline is losing jobs. No guesswork — just a clear picture of what needs to be built." },
                { step: "02", title: "Build", desc: "Your ad campaigns, booking system, and follow-up sequences are built and launched — fully done for you. You don't touch a single setting." },
                { step: "03", title: "Optimize", desc: "Every week, we refine targeting, copy, and conversion points based on real data from your market. The system gets sharper the longer it runs." },
                { step: "04", title: "Book", desc: "Qualified homeowners land directly on your calendar. You show up, run the estimate, and close the job. That's your only job." }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col">
                  {/* Numbered node on the rail */}
                  <div className="hidden lg:flex mx-auto mb-8 h-10 w-10 items-center justify-center rounded-full bg-brand-cyan text-brand-navy font-sans font-black text-xs relative z-10 ring-4 ring-zinc-50 shadow-[0_0_0_1px_rgba(0,194,224,0.4)]">
                    {item.step}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                    className="flex-1 group relative p-8 rounded-2xl bg-gradient-to-br from-white via-cyan-50/40 to-brand-cyan/5 border border-white shadow-xl shadow-brand-cyan/5 flex flex-col overflow-hidden cursor-default min-w-0"
                  >
                    {/* Ghost numeral — adds depth without touching the box style */}
                    <span className="pointer-events-none absolute -top-4 right-2 text-8xl font-sans font-black text-brand-cyan/[0.06] leading-none select-none">{item.step}</span>
                    <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -rotate-45 group-hover:left-[100%] transition-all duration-1000 pointer-events-none" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-cyan-ink mb-4 block relative z-10 transition-transform group-hover:translate-x-1 lg:hidden">Phase {item.step}</span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy mb-4 relative z-10 tracking-tighter transition-all group-hover:text-brand-cyan group-hover:scale-[1.02] origin-left">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed relative z-10 font-medium">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="relative z-10 py-20 md:py-32 bg-brand-navy overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,212,0.15),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">What We Handle</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tighter leading-tight">
                Systems built for <br />
                <span className="text-brand-cyan">owner-operators.</span>
              </p>
              <p className="text-zinc-400 mt-5 text-base sm:text-lg leading-relaxed max-w-md font-medium">
                Four connected stages&mdash;one system that turns ad spend into booked jobs.
              </p>
            </div>
            <Link to="/services" className="w-full sm:w-auto lg:flex-shrink-0">
              <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:border-brand-cyan text-white font-bold px-8 h-14 bg-white/5 backdrop-blur-sm">
                View All Services <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", title: "Advertising", desc: "Local targeting that puts you in front of homeowners actively looking.", icon: <Target className="h-6 w-6" /> },
              { n: "02", title: "Booking Systems", desc: "Turning that interest into scheduled, confirmed appointments.", icon: <Calendar className="h-6 w-6" /> },
              { n: "03", title: "Follow-Up", desc: "Automated sequences so no lead ever slips through the cracks.", icon: <TrendingUp className="h-6 w-6" /> },
              { n: "04", title: "Pipeline Management", desc: "Full visibility—know every job and every stage that's coming.", icon: <Layers className="h-6 w-6" /> }
            ].map((s, i) => (
              <InteractiveCard key={i} className="group relative p-8 rounded-2xl bg-gradient-to-br from-white via-cyan-50/40 to-brand-cyan/5 border border-white shadow-xl shadow-brand-cyan/5 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-cyan/10">
                <Link to="/services" className="absolute inset-0 z-20" aria-label={`${s.title} — view all services`} />
                <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -rotate-45 group-hover:left-[100%] transition-all duration-1000 pointer-events-none" />

                <span className="absolute top-6 right-7 text-3xl font-black text-brand-navy/[0.07] group-hover:text-brand-cyan/25 transition-colors tracking-tight tabular-nums z-10">{s.n}</span>

                <div className="h-12 w-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-cyan transition-colors border border-brand-cyan/20 relative z-10">
                  <div className="text-brand-cyan group-hover:text-brand-navy transition-colors">
                    {s.icon}
                  </div>
                </div>

                <h3 className="text-xl font-black text-brand-navy mb-3 tracking-tight relative z-10 group-hover:text-brand-cyan transition-colors">{s.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed relative z-10 mb-6">{s.desc}</p>

                <div className="mt-auto pt-2 relative z-10 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-400 group-hover:text-brand-cyan-ink transition-colors">
                  See how it works
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview Section */}
      <section className="relative z-10 py-20 md:py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-sm font-bold text-brand-cyan-ink uppercase tracking-[0.2em] mb-4">Case Studies</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-brand-navy tracking-tighter">
              Proof the system <span className="text-brand-cyan">performs.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10 md:mb-16">
            {[
              { 
                tag: "Verified Result",
                niche: "Kitchen & Bathroom Remodeling",
                location: "Columbus, OH",
                metric: "8",
                unit: "confirmed jobs",
                timeline: "in 30 days",
                before: "1–2 jobs/month, gaps every week",
                fix: "Structured campaigns + booking system"
              },
              { 
                tag: "Verified Result",
                niche: "Residential Roofing",
                location: "Charlotte, NC",
                metric: "5",
                unit: "booked installs",
                timeline: "in 3 weeks",
                before: "High inquiries, low conversion",
                fix: "Targeted ads + follow-up system"
              },
              { 
                tag: "Verified Result",
                niche: "HVAC & Plumbing",
                location: "Phoenix, AZ",
                metric: "10+",
                unit: "monthly bookings",
                timeline: "every month",
                before: "2–3 unpredictable jobs/month",
                fix: "Full pipeline system built from scratch"
              }
            ].map((cs, i) => (
              <InteractiveCard key={i} className="p-7 sm:p-10 bg-white border border-zinc-100 rounded-3xl sm:rounded-[2.5rem] group hover:border-brand-cyan transition-all shadow-sm hover:shadow-xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                   <TrendingUp className="h-24 w-24 text-brand-navy" />
                </div>
                
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 block">{cs.tag}</span>
                  <p className="text-[13px] text-zinc-500 leading-tight">
                    {cs.niche} <br />
                    {cs.location}
                  </p>
                </div>

                <div className="py-6 border-y border-zinc-100 mb-6 text-center">
                  <p className="text-6xl sm:text-7xl font-sans font-black text-brand-navy group-hover:text-brand-cyan transition-colors leading-none mb-2">{cs.metric}</p>
                  <p className="text-lg font-medium text-brand-navy leading-none mb-1">{cs.unit}</p>
                  <p className="text-sm text-zinc-400">{cs.timeline}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Before:</p>
                    <p className="text-[13px] text-zinc-600 font-medium leading-relaxed">{cs.before}</p>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Fix:</p>
                    <p className="text-[13px] text-zinc-600 font-medium leading-relaxed">{cs.fix}</p>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>

          <div className="text-center">
            <Link to="/results">
              <Button size="lg" variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white px-12 h-16 font-black uppercase tracking-widest text-xs">
                View Full Studies <ArrowRight className="h-4 w-4 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section className="relative z-10 py-20 md:py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-sm font-bold text-brand-cyan-ink uppercase tracking-[0.2em] mb-4">Testimonials</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-brand-navy tracking-tighter">
              A predictable pipeline means <br />
              <span className="text-brand-cyan">predictable growth.</span>
            </p>
          </div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* Featured CTA */}
      <section className="relative z-10 py-20 md:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-sans font-extrabold mb-8 tracking-tighter leading-[1.1] text-brand-navy">
            Your next booked jobs are <br />
            <span className="shimmer-text font-italic italic">already in your market.</span>
          </h2>
          <Button 
            onClick={openSurvey}
            size="xl" 
            className="bg-brand-navy text-white hover:bg-brand-navy/90 rounded-2xl group transition-all"
          >
            <div className="flex items-center gap-3">
              Book a Call
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        </div>
      </section>
    </div>
  );
}
