import React from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Settings, 
  Target, 
  Layers,
  ArrowRight,
  Hammer
} from "lucide-react";
import { Link } from "react-router-dom";
import { InteractiveCard } from "../components/UI";

export default function AboutUs() {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">About Us</h2>
            <h1 className="text-5xl md:text-7xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
              Built around how home service <br />
              <span className="text-brand-cyan underline decoration-8 decoration-brand-cyan/10">businesses actually operate.</span>
            </h1>
            
            <div className="space-y-6 max-w-2xl text-xl text-zinc-500 leading-relaxed font-medium">
              <p>
                Most contractors didn't start their business to manage marketing systems. They started to do the work.
              </p>
              <p>
                Over time, one problem shows up again and again— <span className="text-brand-navy font-bold">an inconsistent pipeline.</span> Some months are full. Others are quiet. <span className="text-brand-navy underline decoration-brand-cyan/30">That's the gap we focus on.</span>
              </p>
            </div>
          </motion.div>
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
