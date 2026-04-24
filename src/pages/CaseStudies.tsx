import React from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  TrendingUp, 
  Hammer, 
  Home, 
  Construction,
  CheckCircle2,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button, InteractiveCard } from "../components/UI";
import { useSurvey } from "../context/SurveyContext";

export default function CaseStudies() {
  const { openSurvey } = useSurvey();
  const caseStudies = [
    {
      icon: <Hammer className="h-8 w-8 text-brand-cyan" />,
      title: "Kitchen & Bathroom Remodeling",
      location: "Columbus, OH",
      adSpend: "$1,200/mo",
      timeline: "30 days",
      situation: "1–2 jobs booked per month. Calendar had gaps every other week. Owner was relying on word-of-mouth and occasional referrals.",
      changed: "Structured ad campaigns targeting high-intent homeowners + automated booking system to convert inquiries into confirmed appointments.",
      outcomes: [
        "8 confirmed jobs in 30 days",
        "Steady weekly bookings from week 2 onward"
      ]
    },
    {
      icon: <Home className="h-8 w-8 text-brand-cyan" />,
      title: "Residential Roofing",
      location: "Charlotte, NC",
      adSpend: "$900/mo",
      timeline: "3 weeks",
      situation: "High volume of inquiries coming in, but less than 20% converted. Team was spending hours on calls that went nowhere.",
      changed: "Tightened audience targeting to filter out price-shoppers + follow-up sequence to re-engage warm leads automatically.",
      outcomes: [
        "5 booked installs in 3 weeks",
        "Unqualified calls dropped significantly — more time on actual jobs"
      ]
    },
    {
      icon: <Construction className="h-8 w-8 text-brand-cyan" />,
      title: "HVAC & Plumbing",
      location: "Phoenix, AZ",
      adSpend: "$800/mo",
      timeline: "45 days",
      situation: "2–3 jobs per month with no predictability. Some months full, others completely dry. No system in place to maintain consistent flow.",
      changed: "Full pipeline built from scratch — ads, booking system, and follow-up working together so no lead falls through.",
      outcomes: [
        "10+ monthly bookings consistently",
        "Owner can now plan crew schedules and cash flow 3–4 weeks ahead"
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
            <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">Case Studies</h2>
            <h1 className="text-5xl md:text-7xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
              Real businesses. <br />
              <span className="text-brand-cyan underline decoration-8 decoration-brand-cyan/10">Real booking outcomes.</span>
            </h1>
            
            <p className="text-xl text-zinc-500 leading-relaxed font-medium max-w-2xl">
              These are examples of what happens when the pipeline is structured correctly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <InteractiveCard 
                key={i} 
                delay={i * 0.1}
                className="bg-white border border-zinc-100 p-10 flex flex-col h-full group hover:shadow-2xl hover:border-brand-cyan/20 transition-all duration-500 rounded-[2.5rem]"
              >
                <div className="w-16 h-16 bg-brand-cyan/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-cyan/10 transition-colors">
                  {study.icon}
                </div>
                
                <h3 className="text-2xl font-black text-brand-navy mb-2 tracking-tight">Case Study {i+1} — {study.title}</h3>
                <p className="text-xs font-bold text-brand-cyan mb-8 tracking-wide flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> {study.location}  ·  Ad Spend: ~{study.adSpend}  ·  Timeline: {study.timeline}
                </p>
                
                <div className="space-y-8 flex-grow">
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 px-3 py-1 bg-zinc-50 rounded-md inline-block">Situation</p>
                    <p className="text-brand-navy font-bold leading-snug">{study.situation}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 px-3 py-1 bg-zinc-50 rounded-md inline-block">What Changed</p>
                    <p className="text-zinc-500 font-medium leading-relaxed">{study.changed}</p>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-50">
                    <p className="text-xs font-black text-brand-navy uppercase tracking-[0.2em] mb-4">Outcome</p>
                    <ul className="space-y-3 font-bold text-brand-navy">
                      {study.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-brand-cyan shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-32 bg-brand-navy text-white px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,212,0.1),transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight leading-tight text-white">
            The difference isn't more effort. <br />
            <span className="shimmer-text">It's a better system.</span>
          </h2>
          
          <Button 
            onClick={openSurvey}
            size="xl"
            className="bg-brand-cyan text-brand-navy hover:bg-white rounded-2xl shadow-2xl shadow-brand-cyan/20 group"
          >
            <span className="flex items-center gap-3">
              Book a Call
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        </div>
      </section>
    </div>
  );
}
