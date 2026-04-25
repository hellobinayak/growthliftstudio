import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "../components/UI";
import { useSurvey } from "../context/SurveyContext";

export default function FAQ() {
  const { openSurvey } = useSurvey();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "I've tried Facebook Ads before and wasted money. Why would this be different?",
      a: "Most ad campaigns fail because they're built to generate leads — not booked jobs. Anyone can get a form filled out. The difference is in what happens after the click: how the lead is qualified, how fast they're followed up with, and whether there's a booking system in place to convert that interest into a confirmed appointment. We build the entire pipeline — not just the ad. If your last agency handed you leads and walked away, that's exactly what we don't do."
    },
    {
      q: "What if it doesn't work for my market?",
      a: "Before we touch a single ad, we run a Pipeline Audit on your market — your service area, your competition, your current conversion gaps. We only move forward if we believe the system will work in your specific area. We're not interested in taking on clients we can't get results for. If your market isn't a fit, we'll tell you on the call."
    },
    {
      q: "How long before I start seeing booked jobs?",
      a: "Most clients see their first booked appointments within the first 2–3 weeks of the system going live. The first 30 days are focused on building and launching. By day 30–45, the pipeline is running and optimizing based on real data from your market."
    },
    {
      q: "What's the contract commitment?",
      a: "We work on a month-to-month basis after an initial 90-day build period. The first 90 days are needed to properly build, launch, and optimize your pipeline — results don't happen overnight and anyone who tells you otherwise is selling you something. After that, you stay because it's working — not because you're locked in."
    },
    {
      q: "Do I need a big budget to get started?",
      a: "You don't need a massive budget — but you do need enough to run meaningful campaigns in your market. Ad spend that's too thin produces data too slowly to optimize. We'll give you a clear recommended starting budget based on your service area and niche on the audit call. We'd rather set realistic expectations upfront than overpromise."
    },
    {
      q: "Will I have to manage any of this myself?",
      a: "No. That's the point. You run the crew — we handle the pipeline. Campaign setup, targeting, copy, follow-up sequences, booking system — all of it is done for you. You'll get visibility into what's happening without having to manage it yourself."
    },
    {
      q: "How is Growth Lift Studio different from other agencies?",
      a: "Most agencies measure success in leads. We measure it in confirmed jobs on your calendar. We work exclusively with home service businesses in the US, which means we understand your seasonality, your margins, your crew scheduling, and what a quality job actually looks like for your niche. We're not a generalist agency running ads for dentists and e-commerce on the side."
    },
    {
      q: "What happens on the free Pipeline Audit call?",
      a: "It's a 30-minute working session — not a sales pitch. We look at your current pipeline, your market, and where leads are being lost. You'll leave with a clear picture of what's broken and what it would take to fix it, whether you work with us or not. If there's a fit, we'll walk you through exactly what we'd build for your business."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="mx-auto max-w-4xl pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">FAQ</h2>
            <h1 className="text-4xl sm:text-6xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
              Honest answers to <br />
              <span className="text-brand-cyan">honest questions.</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">
              Everything you need to know about our pipeline systems and how we help contractors scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${openFaq === index ? 'text-brand-cyan' : 'text-brand-navy group-hover:text-brand-cyan'}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 ml-4 h-8 w-8 rounded-full border flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-brand-cyan border-brand-cyan text-white' : 'border-zinc-200 text-zinc-400'}`}>
                    {openFaq === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-zinc-500 font-medium leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,212,0.1),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black mb-12 tracking-tight leading-tight">
            Still have questions? <br />
            <span className="text-brand-cyan">Let's talk on a call.</span>
          </h2>
          <Button 
            onClick={openSurvey}
            size="xl"
            className="bg-brand-cyan text-brand-navy hover:bg-white rounded-2xl shadow-xl shadow-brand-cyan/20 group"
          >
            <span className="flex items-center gap-3">
              Book Your Free Audit Call
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        </div>
      </section>
    </div>
  );
}
