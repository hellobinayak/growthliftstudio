import React from "react";
import { motion } from "motion/react";
import { 
  Play, 
  ArrowRight, 
  CheckCircle2,
  Quote,
  TrendingUp,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { InteractiveCard } from "../components/UI";

export default function Testimonials() {
  const testimonials = [
    {
      company: "Remodeling Business",
      quote: "We were getting inquiries before, but nothing consistent. Now we have booked jobs every week. It's easier to plan and manage the crew.",
      author: "Owner, Remodeling Company"
    },
    {
      company: "Roofing Contractor",
      quote: "The biggest difference is the quality. We're not wasting time on calls that go nowhere. Most conversations actually move forward.",
      author: "Owner, Roofing Business"
    },
    {
      company: "HVAC Business",
      quote: "We used to rely on referrals and slow seasons were stressful. Now we have a steady flow coming in, which makes everything more predictable.",
      author: "Owner, HVAC Company"
    },
    {
      company: "Local Service Business",
      quote: "It's simple. We get calls, we book jobs, we stay busy. That's all we needed.",
      author: "Owner, Home Service Business"
    },
    {
      company: "Plumbing Company",
      quote: "Before this, marketing felt confusing. Now it's clear what's coming in and what's booked. That makes a big difference.",
      author: "Owner, Plumbing Business"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header & Video Player Section */}
      <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-100 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">Testimonials</h2>
              <h1 className="text-5xl md:text-7xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight text-balance">
                What it looks like when <br />
                <span className="text-brand-cyan underline decoration-8 decoration-brand-cyan/10">the pipeline is working.</span>
              </h1>
              
              <div className="space-y-6 max-w-2xl">
                <p className="text-2xl text-brand-navy font-bold leading-tight">
                  Most decisions come down to one question— <br />
                  <span className="text-brand-cyan italic font-extrabold">does this actually work?</span>
                </p>
                <p className="text-xl text-zinc-500 leading-relaxed font-medium">
                  These are experiences from home service businesses using the system in real markets.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="group relative aspect-video rounded-[2.5rem] bg-brand-navy overflow-hidden shadow-2xl shadow-brand-navy/20 cursor-pointer">
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-500">
                  <div className="h-20 w-20 bg-brand-cyan rounded-full flex items-center justify-center shadow-2xl shadow-brand-cyan/40">
                    <Play className="h-8 w-8 text-brand-navy fill-current ml-1" />
                  </div>
                </div>
                
                {/* Gloss Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-white/10 z-10" />
                
                {/* Placeholder Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,183,212,0.2),transparent)]" />
                <div className="h-full w-full flex items-center justify-center">
                   <TrendingUp className="h-32 w-32 text-brand-cyan/10" />
                </div>
                
                {/* Label */}
                <div className="absolute bottom-8 left-8 z-20">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-cyan mb-1 block">Featured Build</span>
                   <p className="text-xl font-black text-white">System Implementation walkthrough</p>
                </div>
              </div>
              
              {/* Background Glow for Video */}
              <div className="absolute -inset-4 bg-brand-cyan/10 blur-3xl -z-10 rounded-full opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-32 px-6 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <InteractiveCard 
                key={i} 
                delay={i * 0.1}
                className="flex-1 group relative p-10 rounded-[2.5rem] bg-gradient-to-br from-white via-cyan-50/40 to-brand-cyan/5 border border-white shadow-xl shadow-brand-cyan/5 flex flex-col overflow-hidden cursor-default min-w-0 h-full"
              >
                {/* Process Card Gloss */}
                <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -rotate-45 group-hover:left-[100%] transition-all duration-1000 pointer-events-none" />
                
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-cyan mb-6 block relative z-10 transition-transform group-hover:translate-x-1 underline decoration-brand-cyan/20 underline-offset-4">Verified Experience</span>
                
                <div className="mb-6 relative z-10">
                  <Quote className="h-8 w-8 text-brand-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="text-xl text-brand-navy leading-relaxed font-bold flex-grow italic mb-10 text-balance relative z-10">
                  "{t.quote}"
                </p>

                <div className="pt-6 border-t border-brand-cyan/10 relative z-10">
                   <h3 className="text-sm font-black text-brand-navy uppercase tracking-widest mb-1">{t.company}</h3>
                   <p className="text-xs text-brand-cyan font-black tracking-tight uppercase opacity-60 group-hover:opacity-100 transition-opacity">{t.author}</p>
                </div>

                {/* Subtle Background Icon Decoration */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <Quote className="h-32 w-32 text-brand-navy rotate-12" />
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section / Consistency */}
      <section className="py-32 px-6 bg-white">
         <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-6">Consistency</h2>
                  <p className="text-4xl md:text-6xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
                    Different businesses. <br />
                    Different markets. <br />
                    <span className="text-brand-cyan">Same outcome.</span>
                  </p>
               </div>
               <div className="grid sm:grid-cols-1 gap-6">
                  {[
                    { title: "More predictable workflow", icon: <Calendar className="h-6 w-6 text-brand-cyan" /> },
                    { title: "Better quality conversations", icon: <TrendingUp className="h-6 w-6 text-brand-cyan" /> },
                    { title: "Clearer visibility into the pipeline", icon: <ShieldCheck className="h-6 w-6 text-brand-cyan" /> }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-8 bg-zinc-50 border border-zinc-100 rounded-2xl group transition-all hover:bg-white hover:border-brand-cyan hover:shadow-xl">
                       <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-zinc-50 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/20">
                          {item.icon}
                       </div>
                       <p className="text-lg font-black text-brand-navy uppercase tracking-wider">{item.title}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-32 bg-brand-navy text-white px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,212,0.1),transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight leading-tight">
            If the system works, it shows <br />
            <span className="shimmer-text font-black">in the calendar.</span>
          </h2>
          
          <Link to="/contact">
            <button className="h-24 px-16 text-2xl bg-brand-cyan text-brand-navy font-black rounded-2xl hover:scale-105 hover:bg-white transition-all shadow-2xl shadow-brand-cyan/20 group">
              <span className="flex items-center gap-3">
                Book a Call
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
