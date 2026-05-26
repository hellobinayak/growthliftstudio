import React from "react";
import { motion } from "motion/react";
import { 
  Play, 
  ArrowRight, 
  CheckCircle2,
  Quote,
  TrendingUp,
  ShieldCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Tag,
  MapPin,
  Building
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button, InteractiveCard } from "../components/UI";
import { useSurvey } from "../context/SurveyContext";
import TestimonialSlider from "../components/TestimonialSlider";
import { SEO } from "../components/SEO";

export default function Testimonials() {
  const { openSurvey } = useSurvey();

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
        "name": "Testimonials",
        "item": "https://growthliftstudio.in/testimonials"
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Client Reviews & Verified Results | Growth Lift Studio" 
        description="See what remodeling and roofing business owners say about the Growth Lift Studio booked appointment systems and campaigns."
        schema={breadcrumbSchema}
      />
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
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight text-balance">
                What it looks like when <br />
                <span className="text-brand-cyan underline decoration-8 decoration-brand-cyan/10">the pipeline is working.</span>
              </h1>
              
              <div className="space-y-6 max-w-2xl">
                <p className="text-xl sm:text-2xl text-brand-navy font-bold leading-tight">
                  Most decisions come down to one question— <br />
                  <span className="text-brand-cyan italic font-extrabold">does this actually work?</span>
                </p>
                <p className="text-lg sm:text-xl text-zinc-500 leading-relaxed font-medium">
                  These are experiences from home service businesses using the system in real markets.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-col items-center gap-6"
            >
              <div className="group relative aspect-[9/16] w-full max-w-[360px] rounded-[2.5rem] bg-brand-navy overflow-hidden shadow-2xl shadow-brand-navy/20">
                <iframe 
                  src="https://drive.google.com/file/d/18Cfd8VKLoY4-OZu3kPXW2gpD0LpagfL-/preview" 
                  className="absolute inset-0 w-full h-full border-0" 
                  allow="autoplay"
                ></iframe>
                
                {/* Overlay Label */}
                <div className="absolute top-6 right-6 z-20">
                   <div className="h-10 px-4 bg-brand-navy/80 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Full Walkthrough</span>
                   </div>
                </div>
              </div>

              {/* Client Info Badge */}
              <div className="w-full max-w-[360px] bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-brand-navy/5 relative z-10 transition-transform hover:-translate-y-1">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.4em] mb-1">Success Story</p>
                    <h3 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tighter">DAMAINE HARRISON</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 shrink-0">
                        <Building className="h-4 w-4 text-brand-cyan" />
                      </div>
                      <p className="text-xs font-bold text-brand-navy uppercase tracking-tight leading-tight">Rose-Starr Construction Enhancement LLC</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 shrink-0">
                        <MapPin className="h-4 w-4 text-brand-cyan" />
                      </div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Brooklyn, New York</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Glow for Video */}
              <div className="absolute -inset-10 bg-brand-cyan/20 blur-3xl -z-10 rounded-full opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section className="py-32 px-6 bg-zinc-50 border-y border-zinc-100 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-4">Success Stories</h3>
            <p className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-brand-navy tracking-tighter">
              Verified outcomes from <br />
              <span className="text-brand-cyan">real business owners.</span>
            </p>
          </div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* Trust Section / Consistency */}
      <section className="py-32 px-6 bg-white">
         <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-sm font-bold text-brand-cyan uppercase tracking-[0.2em] mb-6">Consistency</h2>
                  <p className="text-2xl sm:text-4xl md:text-6xl font-sans font-black text-brand-navy mb-8 tracking-tighter leading-tight">
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
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black mb-12 tracking-tight leading-tight text-white">
            If the system works, it shows <br />
            <span className="shimmer-text font-black">in the calendar.</span>
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
