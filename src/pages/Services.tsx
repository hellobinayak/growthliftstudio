import React from "react";
import { motion } from "motion/react";
import { 
  Target, 
  Calendar, 
  MessageSquare, 
  BarChart3,
  ArrowRight,
  TrendingUp,
  Bot
} from "lucide-react";
import { Button, InteractiveCard } from "../components/UI";
import { Link } from "react-router-dom";
import { useSurvey } from "../context/SurveyContext";
import { SEO } from "../components/SEO";

export default function Services() {
  const { openSurvey } = useSurvey();
  const serviceCategories = [
    {
      icon: <Target className="h-8 w-8 text-brand-cyan" />,
      title: "Advertising",
      intro: "We run targeted campaigns across platforms where homeowners are actively looking.",
      items: [
        "Local targeting based on your service area",
        "Campaigns structured for qualified inquiries",
        "Continuous adjustments based on performance"
      ]
    },
    {
      icon: <Calendar className="h-8 w-8 text-brand-cyan" />,
      title: "Booking Systems",
      intro: "Interest doesn't matter unless it turns into a scheduled job. We implement systems that:",
      items: [
        "Guide prospects toward booking",
        "Reduce back-and-forth",
        "Keep your calendar organized"
      ]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-brand-cyan" />,
      title: "Follow-Up",
      intro: "Most opportunities are lost after the first contact. We build structured follow-up so:",
      items: [
        "No opportunity is missed",
        "Prospects stay engaged",
        "More conversations turn into confirmed jobs"
      ]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-brand-cyan" />,
      title: "Pipeline Management",
      intro: "You should know what's coming in. We provide visibility into:",
      items: [
        "Incoming opportunities",
        "Booking rates",
        "Overall pipeline health"
      ]
    }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://growthliftstudio.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://growthliftstudio.in/services"
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Our Trade Pipeline Services | Growth Lift Studio" 
        description="We handle the B2B marketing and booked appointment pipeline for home improvement contractors: Facebook Ads, Google Ads, booking systems, and lead follow-up."
        schema={breadcrumbSchema}
      />
      {/* Header Section */}
      <section className="py-16 md:py-24 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-sm font-bold text-brand-cyan-ink uppercase tracking-[0.2em] mb-4">Our Services</h2>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
              What we handle—so your <br />
              <span className="text-brand-cyan underline decoration-8 decoration-brand-cyan/10">calendar stays consistent.</span>
            </h1>
            
            <div className="space-y-6 max-w-2xl">
              <p className="text-xl sm:text-2xl text-brand-navy font-bold leading-tight">
                Most contractors don't have time to manage marketing systems.
              </p>
              <p className="text-lg sm:text-xl text-zinc-500 leading-relaxed font-medium">
                That's where we come in. We build and manage the pipeline that brings in qualified opportunities and booked jobs—so you can stay focused on the work.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            {serviceCategories.map((service, i) => (
              <InteractiveCard 
                key={i} 
                delay={i * 0.1}
                className="bg-white border border-zinc-100 p-12 flex flex-col items-start group hover:border-brand-cyan transition-all duration-500 elev-soft hover:elev-cyan h-full"
              >
                <div className="w-16 h-16 bg-brand-cyan/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-cyan/10 transition-colors relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {service.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-navy mb-4 tracking-tight group-hover:text-brand-cyan transition-colors">{service.title}</h3>
                <p className="text-zinc-500 text-lg leading-relaxed mb-8 font-medium italic">
                  {service.intro}
                </p>
                <ul className="space-y-4 w-full">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-brand-navy font-bold">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-20 md:py-32 bg-brand-navy text-white px-6 relative overflow-hidden text-center">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,212,0.1),transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black mb-12 tracking-tight leading-tight text-white">
            Everything is built around one outcome— <br />
            <span className="shimmer-text">a steady flow of work on your calendar.</span>
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
