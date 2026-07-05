import React from "react";
import { motion } from "motion/react";
import { 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  CheckCircle2
} from "lucide-react";
import { cn } from "../lib/utils";
import { SEO } from "../components/SEO";

export default function Contact() {
  const contactSchema = [
    {
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
          "name": "Contact",
          "item": "https://growthliftstudio.in/contact"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Growth Lift Studio",
      "description": "Ready to stabilize your home improvement contractor bookings? Schedule a free 30-minute Pipeline Audit call.",
      "url": "https://growthliftstudio.in/contact"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Book a Trade Pipeline Audit | Growth Lift Studio" 
        description="Ready to stop chasing leads and stabilize your B2B trade pipeline? Book a free 30-min strategy session to identify revenue gaps."
        schema={contactSchema}
      />
      <section className="py-16 md:py-24 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-sans font-black text-brand-navy mb-8 tracking-tighter">
              Let's build your <br />
              <span className="text-brand-cyan">pipeline.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-500 font-medium">
              Ready to stop chasing leads and start booking jobs? <br />
              Select a time for your <span className="text-brand-navy font-bold">Pipeline Audit</span> below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            
            {/* Booking Interface */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="bg-white p-2 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] border border-zinc-100 elev-cyan min-h-[500px] sm:min-h-[600px] flex flex-col overflow-hidden">
                  <iframe 
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3WQLsy4iqUWW3mXx-POE-rP0_oq5fbsQd3BghhvJYwVYXvfPILrApICS1xwGIx5Ws_M_D5T8i8?gv=true" 
                    style={{ border: 0 }} 
                    width="100%" 
                    height="600" 
                    frameBorder="0"
                    title="Schedule a Pipeline Audit"
                    className="rounded-[1.5rem] h-[500px] sm:h-[700px]"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="flex flex-col justify-center space-y-16">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">Direct Connect</h3>
                <p className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-md">
                  Most owners prefer to book a time that works for them. 
                  However, if you're in a rush or want to talk immediately, reach out through these channels.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-zinc-100 elev-soft group cursor-pointer transition-all hover:border-brand-cyan/20 hover:elev-cyan">
                  <div className="h-14 w-14 shrink-0 bg-brand-cyan/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-cyan/10 transition-colors">
                    <Mail className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:binayak@growthliftstudio.in" className="text-base sm:text-xl font-black text-brand-navy hover:text-brand-cyan transition-colors break-all">binayak@growthliftstudio.in</a>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-zinc-100 elev-soft group cursor-pointer transition-all hover:border-brand-cyan/20 hover:elev-cyan">
                  <div className="h-14 w-14 shrink-0 bg-brand-cyan/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-cyan/10 transition-colors">
                    <Phone className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Phone</p>
                    <a href="tel:+18884227901" className="text-lg sm:text-xl font-black text-brand-navy hover:text-brand-cyan transition-colors">+1 (888) 422-7901</a>
                  </div>
                </div>

                <div className="pt-12 border-t border-zinc-100">
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-8">Follow our builds</p>
                  <div className="flex gap-6">
                    <a href="https://www.instagram.com/growthliftstudio/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-6 w-6 text-brand-navy/20 hover:text-brand-cyan transition-colors" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61552669001037" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-6 w-6 text-brand-navy/20 hover:text-brand-cyan transition-colors" />
                    </a>
                    <a href="https://www.linkedin.com/in/binayakdey/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-6 w-6 text-brand-navy/20 hover:text-brand-cyan transition-colors" />
                    </a>
                    <a href="https://www.youtube.com/@Growthliftstudio" target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-6 w-6 text-brand-navy/20 hover:text-brand-cyan transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-8 bg-white rounded-3xl border border-zinc-100 elev-soft flex items-start gap-5">
                 <div className="h-10 w-10 shrink-0 bg-white rounded-xl shadow-sm border border-zinc-100 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-brand-cyan" />
                 </div>
                 <p className="text-sm font-bold text-zinc-500 leading-relaxed italic">
                   "Growth Lift completely stabilized our workflow. The Audit was the first step to seeing where we were leaking revenue."
                 </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
