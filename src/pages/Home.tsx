import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  TrendingUp, 
  Target, 
  CheckCircle2,
  Layers,
  Calendar
} from "lucide-react";
import { DotGrid, LightBeam, BeamPattern, FloatingDots } from "../components/BackgroundEffects";
import { Button, InteractiveCard } from "../components/UI";
import { Link } from "react-router-dom";
import { useSurvey } from "../context/SurveyContext";
import TestimonialSlider from "../components/TestimonialSlider";

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
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-bold border border-zinc-200 px-4 py-1.5 rounded-full bg-white/50 mb-8 inline-block shadow-sm">
              For Home Service Businesses
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-sans font-extrabold tracking-tighter mb-8 leading-[0.95] text-balance text-brand-navy">
              Your calendar shouldn’t <br />
              <span className="shimmer-text text-brand-cyan">have empty slots.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-6 text-balance leading-relaxed">
              We build systems that bring in <span className="text-brand-navy font-bold">booked, confirmed jobs</span>—not inquiries you have to chase.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
              <p className="text-sm font-bold text-zinc-600 tracking-tight">
                370+ confirmed jobs booked for our clients in 2025.
              </p>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-cyan mb-12">
              You run the crew. We handle the pipeline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button 
                onClick={openSurvey}
                size="xl" 
                className="bg-brand-navy text-white hover:bg-brand-navy/90 shadow-xl shadow-brand-navy/20 w-full sm:w-auto"
              >
                Book a Call
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

      {/* Credibility Section - Logos */}
      <section className="relative z-10 py-20 bg-white border-y border-zinc-200/50 overflow-hidden">
        {/* Blue-Shaded Gloss Layering */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,183,212,0.1),transparent)] opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/10 to-white pointer-events-none" />
        
        {/* Diagonal Gloss Streak with Blue Tint */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -inset-[100%] aspect-square bg-[linear-gradient(45deg,transparent_25%,rgba(0,183,212,0.15)_50%,transparent_75%)] opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-[shimmer_15s_infinite] pointer-events-none" />
        </div>

        {/* Top Specular Highlight with Blue shadow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_1px_15px_rgba(0,183,212,0.3)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-100/50 to-transparent" />
        
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="text-center mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-navy/30 mb-2">Industry Leaders</p>
            <h2 className="text-xs md:text-sm font-sans font-black text-brand-navy/60 uppercase tracking-[0.2em]">Brand we closely work with</h2>
            <div className="h-px w-8 bg-brand-cyan/30 mx-auto mt-4" />
          </div>
          <div className="flex flex-wrap justify-center items-start gap-x-24 gap-y-12 transition-all duration-700">
            {[
              { src: "https://cdn.simpleicons.org/meta/0D1B2A", alt: "Meta", name: "Meta" },
              { src: "https://cdn.simpleicons.org/google/0D1B2A", alt: "Google", name: "Google" },
              { src: "https://cdn.simpleicons.org/instagram/0D1B2A", alt: "Instagram", name: "Instagram" },
              { src: "https://cdn.simpleicons.org/stripe/0D1B2A", alt: "Stripe", name: "Stripe" },
              { icon: <Layers className="h-6 w-6 text-brand-cyan" />, alt: "GoHighLevel", name: "GoHighLevel" }
            ].map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                whileHover={{ opacity: 1, scale: 1.1, y: -6 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="flex flex-col items-center gap-4 justify-center filter grayscale group/logo text-center relative"
              >
                <div className="h-10 flex items-center justify-center transition-all duration-300 transform group-hover/logo:filter-none">
                  {logo.src ? (
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="h-8 md:h-10 w-auto transition-all"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-brand-navy rounded-lg flex items-center justify-center shadow-xl shadow-brand-navy/10 relative overflow-hidden group-hover/logo:bg-brand-cyan transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                      {logo.icon}
                    </div>
                  )}
                </div>
                <span className="font-sans font-black text-[11px] tracking-[0.25em] text-brand-navy/40 group-hover/logo:text-brand-navy transition-all uppercase">
                  {logo.name}
                </span>
                <div className="absolute -inset-4 bg-white/40 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative z-10 py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-6">The Outcome</h2>
              <p className="text-3xl sm:text-4xl md:text-6xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
                Stop chasing inquiries. <br />
                <span className="text-brand-cyan">Start booking jobs.</span>
              </p>
              <p className="text-xl text-zinc-500 leading-relaxed font-medium max-w-xl">
                Most agencies measure success in 'leads'. We measure it in confirmed appointments and work on your crew's schedule.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <InteractiveCard className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl group">
                 <div className="h-10 w-10 bg-brand-cyan/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-cyan transition-colors">
                    <Target className="h-5 w-5 text-brand-cyan group-hover:text-brand-navy transition-colors" />
                 </div>
                 <h4 className="text-lg font-black text-brand-navy mb-2">High Intent Only</h4>
                 <p className="text-sm text-zinc-500 font-medium">We filter for intent so you don't waste time on price-shoppers.</p>
              </InteractiveCard>
              <InteractiveCard className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl group">
                 <div className="h-10 w-10 bg-brand-cyan/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-cyan transition-colors">
                    <TrendingUp className="h-5 w-5 text-brand-cyan group-hover:text-brand-navy transition-colors" />
                 </div>
                 <h4 className="text-lg font-black text-brand-navy mb-2">Predictable Flow</h4>
                 <p className="text-sm text-zinc-500 font-medium">Stabilize your income with a pipeline that doesn't go silent.</p>
              </InteractiveCard>
              <InteractiveCard className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl group sm:col-span-2">
                 <div className="h-10 w-10 bg-brand-cyan/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-cyan transition-colors">
                    <Layers className="h-5 w-5 text-brand-cyan group-hover:text-brand-navy transition-colors" />
                 </div>
                 <h4 className="text-lg font-black text-brand-navy mb-2">Turnkey Operation</h4>
                 <p className="text-sm text-zinc-500 font-medium max-w-xs">We handle the tech and targeting while you handle the tools. No extra management needed.</p>
              </InteractiveCard>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section Preview */}
      <section id="process" className="relative z-10 py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20 text-balance">
            <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">Process</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight">
              Simple system. Clear outcome.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 lg:gap-2">
            {[
              { step: "01", title: "Audit", desc: "We study your service area, your competition, and exactly where your current pipeline is losing jobs. No guesswork — just a clear picture of what needs to be built." },
              { step: "02", title: "Build", desc: "Your ad campaigns, booking system, and follow-up sequences are built and launched — fully done for you. You don't touch a single setting." },
              { step: "03", title: "Optimize", desc: "Every week, we refine targeting, copy, and conversion points based on real data from your market. The system gets sharper the longer it runs." },
              { step: "04", title: "Book", desc: "Qualified homeowners land directly on your calendar. You show up, run the estimate, and close the job. That's your only job." }
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  className="flex-1 group relative p-8 rounded-2xl bg-gradient-to-br from-white via-cyan-50/40 to-brand-cyan/5 border border-white shadow-xl shadow-brand-cyan/5 flex flex-col overflow-hidden cursor-default min-w-0"
                >
                  <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -rotate-45 group-hover:left-[100%] transition-all duration-1000 pointer-events-none" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-cyan mb-4 block relative z-10 transition-transform group-hover:translate-x-1">Phase {item.step}</span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy mb-4 relative z-10 tracking-tighter transition-all group-hover:text-brand-cyan group-hover:scale-[1.02] origin-left">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed relative z-10 font-medium">
                    {item.desc}
                  </p>
                </motion.div>
                {i < arr.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center z-20">
                    <ArrowRight className="h-6 w-6 text-brand-cyan/30" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="relative z-10 py-32 bg-brand-navy overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,212,0.15),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">What We Handle</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tighter leading-tight">
                Systems built for <br />
                <span className="text-brand-cyan">owner-operators.</span>
              </p>
            </div>
            <Link to="/services">
              <Button variant="outline" className="border-white/10 hover:border-brand-cyan text-white font-bold px-8 h-14 bg-white/5 backdrop-blur-sm">
                View All Services <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Advertising", desc: "Local targeting where homeowners are looking.", icon: <Target className="h-5 w-5" /> },
              { title: "Booking Systems", desc: "Turning interest into scheduled appointments.", icon: <Calendar className="h-5 w-5" /> },
              { title: "Follow-Up", desc: "Automated sequences so no lead is missed.", icon: <TrendingUp className="h-5 w-5" /> },
              { title: "Pipeline Management", desc: "Visibility into your revenue future.", icon: <Layers className="h-5 w-5" /> }
            ].map((s, i) => (
              <InteractiveCard key={i} className="flex-1 group relative p-8 rounded-2xl bg-gradient-to-br from-white via-cyan-50/40 to-brand-cyan/5 border border-white shadow-xl shadow-brand-cyan/5 flex flex-col overflow-hidden transition-all hover:-translate-y-2">
                <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -rotate-45 group-hover:left-[100%] transition-all duration-1000 pointer-events-none" />
                
                <div className="h-10 w-10 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-cyan transition-colors border border-brand-cyan/20 relative z-10">
                  <div className="text-brand-cyan group-hover:text-brand-navy transition-colors">
                    {s.icon}
                  </div>
                </div>
                
                <h4 className="text-xl font-black text-brand-navy mb-3 tracking-tight relative z-10 group-hover:text-brand-cyan transition-colors">{s.title}</h4>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed relative z-10">{s.desc}</p>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview Section */}
      <section className="relative z-10 py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">Case Studies</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-brand-navy tracking-tighter">
              Proof the system <span className="text-brand-cyan">performs.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
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
              <InteractiveCard key={i} className="p-10 bg-white border border-zinc-100 rounded-[2.5rem] group hover:border-brand-cyan transition-all shadow-sm hover:shadow-xl relative overflow-hidden flex flex-col">
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
                  <p className="text-7xl font-sans font-black text-brand-navy group-hover:text-brand-cyan transition-colors leading-none mb-2">{cs.metric}</p>
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
      <section className="relative z-10 py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">Testimonials</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-brand-navy tracking-tighter">
              A predictable pipeline means <br />
              <span className="text-brand-cyan">predictable growth.</span>
            </p>
          </div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* Latest Intel (Blog) Section */}
      <section className="relative z-10 py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">Latest Intel</h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-brand-navy tracking-tighter leading-tight text-balance">
                The growth <span className="text-brand-cyan">archive.</span>
              </p>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white px-8 h-14 font-black uppercase tracking-widest text-xs">
                View All Insights <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <InteractiveCard className="group flex flex-col sm:flex-row overflow-hidden bg-white border border-zinc-100 transition-all hover:border-brand-cyan/30">
              <div className="w-full sm:w-2/5 relative h-48 sm:h-auto">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="NYC Case Study" />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan mb-4 block">Case Study</span>
                  <h4 className="text-xl font-black text-brand-navy mb-4 group-hover:text-brand-cyan transition-colors leading-tight">21 Qualified Leads in 30 Days: The NYC Breakdown</h4>
                  <p className="text-sm text-zinc-500 font-medium line-clamp-2">How we achieved a $55 cost-per-lead for a bathroom remodeler in New York City.</p>
                </div>
                <Link to="/blog" className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-navy">
                  Read Story <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </InteractiveCard>

            <InteractiveCard className="group flex flex-col sm:flex-row overflow-hidden bg-white border border-zinc-100 transition-all hover:border-brand-cyan/30">
              <div className="w-full sm:w-2/5 relative h-48 sm:h-auto">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="1.5% Model" />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan mb-4 block">Strategy</span>
                  <h4 className="text-xl font-black text-brand-navy mb-4 group-hover:text-brand-cyan transition-colors leading-tight">Why Monthly Retainers are a Relic of the Past</h4>
                  <p className="text-sm text-zinc-500 font-medium line-clamp-2">Understanding the 1.5% performance model and how it aligns with your profit.</p>
                </div>
                <Link to="/blog" className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-navy">
                  Read Story <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </section>

      {/* Featured CTA */}
      <section className="relative z-10 py-32 bg-white">
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
