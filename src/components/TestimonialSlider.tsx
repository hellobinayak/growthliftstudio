import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Tag } from "lucide-react";
import { cn } from "../lib/utils";

const testimonials = [
  {
    company: "James R.",
    location: "Kitchen & Bathroom Remodeler, Columbus, OH",
    quote: "We were getting inquiries before, but nothing consistent. Now we have booked jobs every week — 8 in the first 30 days. It's so much easier to plan crews and order materials when you actually know what's coming.",
    tag: "Verified Client"
  },
  {
    company: "Derek M.",
    location: "Residential Roofing, Charlotte, NC",
    quote: "The biggest difference is the quality of conversations. Before, half our calls were price-shoppers who ghosted after the quote. Now most people we talk to are ready to move. We booked 5 installs in the first 3 weeks.",
    tag: "Verified Client"
  },
  {
    company: "Tony V.",
    location: "HVAC & Plumbing, Phoenix, AZ",
    quote: "We used to rely on referrals and some seasons were completely dry. Now we have a steady flow coming in, which makes everything more predictable — payroll, scheduling, everything.",
    tag: "Verified Client"
  },
  {
    company: "Steve H.",
    location: "Window & Door Replacement, Tampa, FL",
    quote: "I was skeptical because we'd tried Facebook Ads on our own and burned money. This was completely different — they handled everything and we started seeing booked calls within the first two weeks.",
    tag: "Verified Client"
  },
  {
    company: "Carlos B.",
    location: "Residential Plumbing, Houston, TX",
    quote: "We went from 2–3 jobs a month with zero predictability to 10+ consistent bookings. The audit call alone showed us exactly where we were losing leads. That was worth it before we even started.",
    tag: "Verified Client"
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const testimonial = testimonials[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12">
      <div className="relative overflow-hidden min-h-[400px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <div className="bg-gradient-to-br from-white via-cyan-50/40 to-brand-cyan/5 border border-white shadow-2xl shadow-brand-cyan/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-[100px] -z-10 rounded-full" />
               
               <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                     <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-cyan/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan">
                        <Tag className="h-3 w-3" />
                        {testimonial.tag}
                     </span>
                     <Quote className="h-10 w-10 text-brand-cyan opacity-20" />
                  </div>

                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-navy leading-tight italic mb-10 text-balance">
                    "{testimonial.quote}"
                  </p>

                  <div className="mt-auto pt-8 border-t border-brand-cyan/10">
                     <div className="flex items-center justify-between">
                        <div>
                           <h3 className="text-lg font-black text-brand-navy uppercase tracking-widest mb-1">{testimonial.company}</h3>
                           <p className="text-xs font-bold text-brand-cyan uppercase tracking-wider opacity-80">{testimonial.location}</p>
                        </div>
                        
                        {/* Pagination indicator */}
                        <div className="flex gap-2">
                           {testimonials.map((_, i) => (
                              <div 
                                 key={i}
                                 className={cn(
                                    "h-1.5 transition-all duration-300 rounded-full",
                                    i === currentIndex ? "w-8 bg-brand-cyan" : "w-1.5 bg-zinc-200"
                                 )}
                              />
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none px-4 md:-mx-12 lg:-mx-20 flex justify-between">
        <button
          onClick={() => paginate(-1)}
          className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-white border border-zinc-100 shadow-xl shadow-brand-navy/5 flex items-center justify-center text-brand-navy hover:text-brand-cyan hover:scale-110 transition-all pointer-events-auto active:scale-95 group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-white border border-zinc-100 shadow-xl shadow-brand-navy/5 flex items-center justify-center text-brand-navy hover:text-brand-cyan hover:scale-110 transition-all pointer-events-auto active:scale-95 group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
