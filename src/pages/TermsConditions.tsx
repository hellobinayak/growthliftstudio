import React from "react";
import { motion } from "motion/react";
import { FileText, CheckCircle, AlertCircle, Scale, Shield, Mail, Phone, Globe } from "lucide-react";
import { SEO } from "../components/SEO";

export default function TermsConditions() {
  return (
    <div className="relative min-h-screen bg-white">
      <SEO title="Terms & Conditions | Growth Lift Studio" description="Terms and conditions for Growth Lift Studio services. Performance-based lead generation for home improvement contractors." />
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
              Terms & <span className="text-brand-cyan">Conditions</span>
            </h1>
            <p className="text-lg text-zinc-500 font-medium mb-12">
              Last Updated: April 2026
            </p>
            <div className="p-6 bg-brand-navy/5 rounded-2xl border border-brand-navy/10 inline-flex items-center gap-3">
              <FileText className="h-5 w-5 text-brand-cyan" />
              <p className="text-brand-navy font-bold text-sm uppercase tracking-wider">
                Our commitment to transparency and clear expectations.
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
            {/* 1. Overview */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">01</span> Overview
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>
                  These Terms & Conditions govern your use of the Growth Lift Studio website located at growthliftstudio.in and any services provided by Growth Lift Studio.
                </p>
                <p>
                  By accessing our website, submitting an inquiry, booking a call, or entering into a service agreement with us, you confirm that you have read, understood, and agreed to these terms.
                </p>
                <p>
                  If you do not agree with any part of these terms, please do not use our website or services.
                </p>
              </div>
            </div>

            {/* 2. About Our Services */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">02</span> About Our Services
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>Growth Lift Studio provides done-for-you client acquisition services for home service businesses in the United States. Our services include:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Paid advertising campaign management",
                    "Booking system setup and management",
                    "Lead qualification and follow-up pipeline",
                    "Pipeline audits and strategy consultations",
                    "Ongoing campaign optimisation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-500 font-medium">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-cyan flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-zinc-400 text-sm italic">Full scope of services for each client is defined in a separate Service Agreement signed prior to engagement.</p>
              </div>
            </div>

            {/* 3. The Pipeline Audit Call */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">03</span> The Pipeline Audit Call
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>The free Pipeline Audit call offered on this website is a no-obligation 30-minute consultation. By booking a call you agree to:</p>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Show up at the scheduled time or provide at least 24 hours notice to reschedule",
                    "Provide accurate information about your business during the call",
                    "Understand that the call is a working consultation — not a guaranteed proposal"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50">
                      <CheckCircle className="h-5 w-5 text-brand-cyan mt-1 flex-shrink-0" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Payment Terms */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">05</span> Payment Terms
              </h2>
              <div className="text-zinc-500 space-y-6 text-lg leading-relaxed font-medium">
                <div className="p-8 rounded-[2rem] bg-brand-navy text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Shield className="h-24 w-24" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 relative z-10 text-brand-cyan">Ad spend is separate from agency fees.</h3>
                  <p className="relative z-10 opacity-80">
                    Paid directly by the client to the respective ad platform (Facebook / Google). Growth Lift Studio does not hold client ad spend funds.
                  </p>
                </div>
                <p>
                  Service fees are typically invoiced monthly in advance and due within 7 days. Late payments may result in a pause of active campaigns.
                </p>
              </div>
            </div>

            {/* 6. Results Disclaimer */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">06</span> Results Disclaimer
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <div className="flex items-start gap-4 p-6 bg-red-50 border border-red-100 rounded-2xl text-red-900">
                  <AlertCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-2">No contractual guarantees of specific results.</p>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Results vary based on market conditions, competition, and client responsiveness. Past results reflect real client outcomes but are not a guarantee of identical results for your business.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Intellectual Property */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">08</span> Intellectual Property
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>
                  All content on this website — including text, graphics, logos, and the overall design — is the property of Growth Lift Studio. Work product created for clients during an engagement becomes the client's property upon full payment.
                </p>
              </div>
            </div>

            {/* 10. Limitation of Liability */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">10</span> Limitation of Liability
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <div className="flex items-start gap-4 p-6 border border-zinc-100 rounded-2xl">
                  <Scale className="h-6 w-6 text-brand-navy flex-shrink-0 mt-1" />
                  <p>
                    Our total liability in any circumstance shall not exceed the total amount paid to Growth Lift Studio in the 30 days preceding the claim.
                  </p>
                </div>
              </div>
            </div>

            {/* 14. Governing Law */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-4">
                <span className="text-brand-cyan text-lg">14</span> Governing Law
              </h2>
              <div className="text-zinc-500 space-y-4 text-lg leading-relaxed font-medium">
                <p>
                  These Terms & Conditions are governed by the laws of India. For US-based clients, we aim to operate in alignment with standard US business practices and applicable consumer protection standards.
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="space-y-6 pt-12 border-t border-zinc-100">
               <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">Contact Us</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-brand-cyan mt-1" />
                      <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Email</p>
                        <p className="text-lg font-black text-brand-navy">binayak@growthliftstudio.in</p>
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
