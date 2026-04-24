import React from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Settings, 
  Target, 
  Layers,
  ArrowRight,
  Hammer,
  TrendingUp,
  Instagram,
  Facebook,
  Linkedin,
  Youtube
} from "lucide-react";
import { Link } from "react-router-dom";
import { InteractiveCard } from "../components/UI";
import { useSurvey } from "../context/SurveyContext";

export default function AboutUs() {
  const { openSurvey } = useSurvey();
  const sections = [
    {
      icon: <Users className="h-8 w-8 text-brand-cyan" />,
      title: "Understanding",
      intro: "We work with home service businesses across the U.S.—remodeling, roofing, HVAC, plumbing, landscaping.",
      details: [
        "Different trades. Same challenge.",
        "Keeping a steady flow of booked work without adding more to your plate."
      ]
    },
    {
      icon: <Settings className="h-8 w-8 text-brand-cyan" />,
      title: "Role",
      intro: "You don't need another system to manage. You need something that runs in the background.",
      details: [
        "Campaign setup",
        "Pipeline structure",
        "Ongoing optimization"
      ]
    },
    {
      icon: <Target className="h-8 w-8 text-brand-cyan" />,
      title: "Approach",
      intro: "We keep things simple. Clear setup. Measurable outcomes. No unnecessary complexity.",
      details: [
        "Everything is built around one outcome—jobs booked on your calendar."
      ]
    },
    {
      icon: <Layers className="h-8 w-8 text-brand-cyan" />,
      title: "Difference",
      intro: "We don't try to fit your business into a generic process. We build around your area and capacity.",
      details: [
        "Your service area",
        "Your job types",
        "Your capacity"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">About Us</h2>
              <h1 className="text-5xl md:text-7xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
                Built around how home service <br />
                <span className="text-brand-cyan underline decoration-8 decoration-brand-cyan/10">businesses actually operate.</span>
              </h1>
              
              <div className="space-y-8 max-w-2xl">
                <p className="text-2xl text-brand-navy font-bold leading-tight text-balance">
                  Binayak Dey founded Growth Lift Studio to solve one problem — home service businesses doing great work but losing revenue to an inconsistent pipeline.
                </p>
                <p className="text-xl text-zinc-500 leading-relaxed font-medium">
                  Every system we build is focused on one outcome: confirmed jobs on your calendar, consistently.
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-brand-cyan" />
                  <p className="text-brand-navy font-black uppercase tracking-widest text-sm">— Binayak D., Founder</p>
                </div>
              </div>
            </motion.div>

            {/* Founder Profile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-col gap-6"
            >
              <div className="relative z-10 p-2 bg-white rounded-[2.5rem] shadow-2xl shadow-brand-navy/10 border border-zinc-100 overflow-hidden group max-w-[400px]">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-brand-navy relative">
                  <img 
                    src="https://drive.google.com/uc?export=view&id=1dK3OKxXZ2AT7cj_e8jFWNAZXji0B2tmX" 
                    alt="Binayak Dey - Founder of Growth Lift Studio" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-6 pt-8">
                   <p className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.3em] mb-1">FOUNDER</p>
                   <h3 className="text-3xl font-black text-brand-navy tracking-tight mb-4">Binayak Dey</h3>
                   <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8">
                     Focusing on one outcome: confirmed jobs on your calendar, consistently.
                   </p>

                   <div className="space-y-4">
                      {/* Experience Badge */}
                      <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-xl shadow-sm">
                        <div className="h-8 w-8 bg-brand-cyan/10 rounded-lg flex items-center justify-center shrink-0">
                           <TrendingUp className="h-4 w-4 text-brand-cyan" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-brand-navy uppercase tracking-widest leading-none mb-1">Experience</p>
                          <p className="text-sm font-black text-brand-cyan leading-none">6 Years in Market</p>
                        </div>
                      </div>

                      {/* Socials */}
                      <div className="flex items-center gap-3">
                        <a 
                          href="https://www.linkedin.com/in/binayakdey/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-10 w-10 flex items-center justify-center bg-zinc-100 rounded-xl border border-zinc-200/50 text-brand-navy/40 hover:text-brand-cyan hover:bg-white hover:border-brand-cyan transition-all"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <a 
                          href="https://www.instagram.com/growthliftstudio/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-10 w-10 flex items-center justify-center bg-zinc-100 rounded-xl border border-zinc-200/50 text-brand-navy/40 hover:text-brand-cyan hover:bg-white hover:border-brand-cyan transition-all"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                        <a 
                          href="https://www.facebook.com/profile.php?id=61552669001037" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-10 w-10 flex items-center justify-center bg-zinc-100 rounded-xl border border-zinc-200/50 text-brand-navy/40 hover:text-brand-cyan hover:bg-white hover:border-brand-cyan transition-all"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                        <a 
                          href="https://www.youtube.com/@Growthliftstudio" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-10 w-10 flex items-center justify-center bg-zinc-100 rounded-xl border border-zinc-200/50 text-brand-navy/40 hover:text-brand-cyan hover:bg-white hover:border-brand-cyan transition-all"
                        >
                          <Youtube className="h-4 w-4" />
                        </a>
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Background Accents */}
              <div className="absolute -top-12 -right-12 h-64 w-64 bg-brand-cyan/5 blur-3xl -z-10 rounded-full" />
              <div className="absolute -bottom-12 -left-12 h-64 w-64 bg-brand-navy/5 blur-3xl -z-10 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section, i) => (
              <InteractiveCard 
                key={i} 
                delay={i * 0.1}
                className="bg-white border border-zinc-100 p-8 flex flex-col items-start group hover:border-brand-cyan transition-all duration-500 rounded-3xl shadow-sm hover:shadow-xl h-full"
              >
                <div className="w-12 h-12 bg-brand-cyan/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-cyan/10 transition-colors">
                  {/* Scale icon down slightly for smaller cards */}
                  <div className="scale-75">
                    {section.icon}
                  </div>
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-3 tracking-tight group-hover:text-brand-cyan transition-colors">{section.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium italic">
                  {section.intro}
                </p>
                <ul className="space-y-3 mt-auto">
                  {section.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-brand-navy text-[13px] font-bold">
                      <div className="mt-1.5 h-1 w-1 rounded-full bg-brand-cyan flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-32 bg-brand-navy text-white px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,212,0.1),transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight leading-tight">
            If it works, you'll see it <br />
            <span className="shimmer-text italic">in your calendar.</span>
          </h2>
          
          <button 
            onClick={openSurvey}
            className="h-24 px-16 text-2xl bg-brand-cyan text-brand-navy font-black rounded-2xl hover:scale-105 hover:bg-white transition-all shadow-2xl shadow-brand-cyan/20 group"
          >
            <span className="flex items-center gap-3">
              Book a Call
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
