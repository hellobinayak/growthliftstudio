import React from "react";
import { motion } from "motion/react";
import { Shield, Lock, Eye, RefreshCw, Mail, Phone, Globe } from "lucide-react";
import { SEO } from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-white">
      <SEO title="Privacy Policy | Growth Lift Studio" description="How Growth Lift Studio collects, uses, and protects your personal information. Written in plain English." />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,183,212,0.1),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-black text-brand-navy mb-6 tracking-tighter">
              Privacy <span className="text-brand-cyan">Policy</span>
            </h1>
            <p className="text-lg text-zinc-500 font-medium mb-12">
              Last Updated: April 2026
            </p>
            <div className="p-6 bg-brand-navy/5 rounded-2xl border border-brand-navy/10 inline-flex items-center gap-3">
              <Shield className="h-5 w-5 text-brand-cyan" />
              <p className="text-brand-navy font-bold text-sm uppercase tracking-wider">
                Written in plain English, not legal jargon.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-32 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose prose-zinc max-w-none space-y-16"
          >
            {/* 1. Who We Are */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">01</span> Who We Are
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>
                  Growth Lift Studio is a client acquisition agency that builds revenue pipelines for home service businesses across the United States. We operate the website growthliftstudio.in and all associated booking, contact, and inquiry forms.
                </p>
                <p>
                  When we say "we," "us," or "our" in this policy — we mean Growth Lift Studio. When we say "you" — we mean anyone who visits our website or submits their information through any form on it.
                </p>
              </div>
            </div>

            {/* 2. What Information We Collect */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">02</span> What Information We Collect
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy mb-4">Information you give us directly:</h3>
                  <p className="text-zinc-500 text-lg mb-4">When you fill out our contact form, booking form, or Pipeline Audit survey, we collect:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Your full name", "Your business name", "Your email address", "Your phone number", "Your answers to qualification questions"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-500 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-cyan flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy mb-4">Information collected automatically:</h3>
                  <p className="text-zinc-500 text-lg mb-4">When you visit our website, we may automatically collect:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Your IP address", "Browser type and version", "Pages visited and time spent", "Referring URL", "Device type"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-500 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-navy flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-zinc-400 text-sm">This data is collected through standard website analytics tools and cookies.</p>
                </div>
              </div>
            </div>

            {/* 3. How We Use */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">03</span> How We Use Your Information
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>We use the information you provide to:</p>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Contact you to confirm and prepare for your Pipeline Audit call",
                    "Understand your business situation before the call so we come prepared",
                    "Send you relevant information about our services if you've requested it",
                    "Improve how our website and booking process works",
                    "Respond to any questions or messages you send us"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50">
                      <RefreshCw className="h-5 w-5 text-brand-cyan mt-1 flex-shrink-0" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 italic font-bold text-brand-navy">We do not use your information for anything you wouldn't expect based on why you gave it to us.</p>
              </div>
            </div>

            {/* 4. Who We Share */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">04</span> Who We Share Your Information With
              </h2>
              <div className="text-zinc-500 space-y-6 text-lg leading-relaxed font-medium">
                <div className="p-8 rounded-[2rem] bg-brand-navy text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Lock className="h-24 w-24" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 relative z-10 text-brand-cyan">We do not sell your data. Ever.</h3>
                  <p className="relative z-10 opacity-80">
                    We may share your information with a small number of trusted third-party tools that help us operate — such as calendar software, CRM tools, and analytics platforms.
                  </p>
                </div>
                <p>
                  These tools only receive the information they need to perform their specific function. They are not permitted to use your data for their own marketing purposes.
                </p>
                <p>
                  We may also disclose your information if required to do so by law or in response to a valid legal request.
                </p>
              </div>
            </div>

            {/* 5. Cookies */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">05</span> Cookies
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>Our website uses cookies to understand how visitors interact with the site and to improve your experience.</p>
                <div className="space-y-4">
                  {[
                    { title: "Essential cookies", desc: "Required for the website to function correctly" },
                    { title: "Analytics cookies", desc: "Help us understand page visits and user behaviour" },
                    { title: "Marketing cookies", desc: "Used by platforms like Meta and Google to track performance" }
                  ].map((cookie, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 border border-zinc-100 rounded-xl">
                      <span className="font-black text-brand-navy whitespace-nowrap min-w-[150px]">{cookie.title} —</span>
                      <span className="opacity-80">{cookie.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Advertising */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">06</span> Facebook & Google Advertising
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>
                  We run advertising campaigns and may use tracking pixels to measure ad performance and retarget visitors. If you have interacted with one of our ads, the respective platform's privacy policy also applies.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-zinc-100 rounded-xl font-bold hover:bg-zinc-200 transition-colors">Meta Privacy Policy</a>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-zinc-100 rounded-xl font-bold hover:bg-zinc-200 transition-colors">Google Privacy Policy</a>
                </div>
              </div>
            </div>

            {/* 7. Retention */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">07</span> How Long We Keep Your Data
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>We retain your information for as long as it is relevant to the purpose for which it was collected:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-brand-cyan" /> Inquiry and booking data: up to 24 months</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-brand-cyan" /> Analytics data: platform default settings</li>
                  <li className="flex items-center gap-3 font-bold text-brand-navy italic">Request deletion: processed within 30 days</li>
                </ul>
              </div>
            </div>

            {/* 8. Your Rights */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">08</span> Your Rights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Access the personal data we hold",
                  "Correct any inaccurate information",
                  "Request deletion of your data",
                  "Opt out of marketing communications",
                  "Request a portable copy of your data"
                ].map((right, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-50 text-brand-navy font-bold">
                    <Eye className="h-5 w-5 text-brand-cyan" />
                    {right}
                  </div>
                ))}
              </div>
            </div>

            {/* 13. Contact Us (Moved for flow) */}
            <div className="space-y-6 pt-12 border-t border-zinc-100">
               <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">Contact Us</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-brand-cyan mt-1" />
                      <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Email</p>
                        <p className="text-lg font-black text-brand-navy">hello@growthliftstudio.in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-brand-cyan mt-1" />
                      <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Phone</p>
                        <p className="text-lg font-black text-brand-navy">+1 (706) - 372-6405</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Globe className="h-6 w-6 text-brand-cyan mt-1" />
                      <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Website</p>
                        <p className="text-lg font-black text-brand-navy">growthliftstudio.in</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
