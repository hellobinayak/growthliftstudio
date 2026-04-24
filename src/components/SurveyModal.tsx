import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 'success';

export default function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactData, setContactData] = useState({
    name: "",
    biz: "",
    email: "",
    phone: "",
  });

  const totalSteps = 6;
  const progress = step === 'success' ? 100 : (Number(step) / totalSteps) * 100;

  const selectOpt = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 'success') return;
    if (step < 6) setStep((step + 1) as Step);
    else handleFinalSubmit();
  };

  const handleBack = () => {
    if (step === 'success') return;
    if (step > 1) setStep((step - 1) as Step);
  };

  const handleFinalSubmit = () => {
    setStep('success');
  };

  const handleGoToBooking = () => {
    onClose();
    navigate("/contact");
    // Reset survey state for next time
    setTimeout(() => setStep(1), 500);
  };

  const isNextDisabled = () => {
    if (step === 'success') return false;
    if (step < 6) return !answers[`step${step}`];
    return !contactData.name || !contactData.email || !contactData.phone || !contactData.biz;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[560px] bg-[#111f30] rounded-2xl border border-[#1e3a50] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0d1b2a] px-8 py-5 border-bottom border-[#1e3a50] flex items-center justify-between">
              <div className="font-sans font-bold text-sm text-brand-cyan tracking-tight">
                Growth<span className="text-white">Lift</span> Studio
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#1e3a50] text-[#5a7a95] flex items-center justify-center hover:border-brand-cyan hover:text-brand-cyan transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-8 pt-6">
              <div className="text-[11px] text-[#5a7a95] font-black uppercase tracking-widest mb-2">
                {step === 'success' ? 'Submitted' : `Step ${step} of ${totalSteps}`}
              </div>
              <div className="h-[3px] bg-[#1e3a50] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-brand-cyan transition-all duration-500"
                />
              </div>
            </div>

            {/* Body */}
            <div className="p-8 flex-grow">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="font-sans text-xl font-bold text-white mb-2 leading-tight">What type of home service business do you run?</p>
                    <p className="text-sm text-[#5a7a95] mb-6">Select the one that best describes your primary work.</p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {[
                        { label: 'Bathroom Remodeling', icon: '🛁' },
                        { label: 'Kitchen Remodeling', icon: '🍳' },
                        { label: 'Window / Door Replacement', icon: '🪟' },
                        { label: 'Roofing', icon: '🏠' },
                        { label: 'HVAC / Plumbing', icon: '🔧' },
                        { label: 'Other Home Service', icon: '🏗️' }
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => selectOpt('step1', opt.label)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border transition-all text-left group",
                            answers.step1 === opt.label 
                              ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan" 
                              : "border-[#1e3a50] text-[#c8dae8] hover:bg-brand-cyan/5 hover:border-brand-cyan/30"
                          )}
                        >
                          <span className={cn(
                            "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                            answers.step1 === opt.label ? "bg-brand-cyan/20" : "bg-[#1e3a50]"
                          )}>{opt.icon}</span>
                          <span className="text-[13px] font-medium leading-tight">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="font-sans text-xl font-bold text-white mb-2 leading-tight">How many jobs are you booking per month right now?</p>
                    <p className="text-sm text-[#5a7a95] mb-6">Be honest — this helps us understand your current pipeline.</p>
                    <div className="grid grid-cols-1 gap-3 mb-8">
                      {[
                        { label: '0–2 jobs/month', sub: 'just getting started or very inconsistent', icon: '📉' },
                        { label: '3–6 jobs/month', sub: 'some traction but gaps in the calendar', icon: '📊' },
                        { label: '7–12 jobs/month', sub: 'decent volume, want to scale', icon: '📈' },
                        { label: '12+ jobs/month', sub: 'scaling and need better quality leads', icon: '🚀' }
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => selectOpt('step2', opt.label)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                            answers.step2 === opt.label 
                              ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan" 
                              : "border-[#1e3a50] text-[#c8dae8] hover:bg-brand-cyan/5 hover:border-brand-cyan/30"
                          )}
                        >
                          <span className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                            answers.step2 === opt.label ? "bg-brand-cyan/20" : "bg-[#1e3a50]"
                          )}>{opt.icon}</span>
                          <div>
                            <span className="text-[13px] font-bold block mb-0.5">{opt.label}</span>
                            <span className={cn("text-[11px] font-medium opacity-60", answers.step2 === opt.label ? "text-brand-cyan" : "text-[#5a7a95]")}>{opt.sub}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="font-sans text-xl font-bold text-white mb-2 leading-tight">What's your biggest challenge right now?</p>
                    <p className="text-sm text-[#5a7a95] mb-6">Pick the one that feels most true today.</p>
                    <div className="grid grid-cols-1 gap-3 mb-8">
                      {[
                        { label: 'Not enough leads coming in', icon: '🎯' },
                        { label: "Leads come in but don't convert", icon: '📞' },
                        { label: 'Inconsistent — feast or famine', icon: '🔄' },
                        { label: 'No time to manage marketing', icon: '⏱️' }
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => selectOpt('step3', opt.label)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                            answers.step3 === opt.label 
                              ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan" 
                              : "border-[#1e3a50] text-[#c8dae8] hover:bg-brand-cyan/5 hover:border-brand-cyan/30"
                          )}
                        >
                          <span className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                            answers.step3 === opt.label ? "bg-brand-cyan/20" : "bg-[#1e3a50]"
                          )}>{opt.icon}</span>
                          <span className="text-[13px] font-bold">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="font-sans text-xl font-bold text-white mb-2 leading-tight">Have you run paid ads before?</p>
                    <p className="text-sm text-[#5a7a95] mb-6">Facebook Ads, Google Ads, or any other paid platform.</p>
                    <div className="grid grid-cols-1 gap-3 mb-8">
                      {[
                        { label: 'Yes — and it worked', icon: '✅' },
                        { label: 'Yes — but wasted money', icon: '💸' },
                        { label: 'No — never tried paid ads', icon: '🆕' },
                        { label: 'Currently running ads', icon: '▶️' }
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => selectOpt('step4', opt.label)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                            answers.step4 === opt.label 
                              ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan" 
                              : "border-[#1e3a50] text-[#c8dae8] hover:bg-brand-cyan/5 hover:border-brand-cyan/30"
                          )}
                        >
                          <span className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                            answers.step4 === opt.label ? "bg-brand-cyan/20" : "bg-[#1e3a50]"
                          )}>{opt.icon}</span>
                          <span className="text-[13px] font-bold">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="font-sans text-xl font-bold text-white mb-2 leading-tight">What's your monthly marketing budget?</p>
                    <p className="text-sm text-[#5a7a95] mb-6">This helps us know if we're a fit before wasting either of our time.</p>
                    <div className="grid grid-cols-1 gap-3 mb-8">
                      {[
                        { label: 'Under $500/mo' },
                        { label: '$500–$1,500/mo' },
                        { label: '$1,500–$3,000/mo' },
                        { label: '$3,000+/mo — ready to scale aggressively' }
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => selectOpt('step5', opt.label)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                            answers.step5 === opt.label 
                              ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan" 
                              : "border-[#1e3a50] text-[#c8dae8] hover:bg-brand-cyan/5 hover:border-brand-cyan/30"
                          )}
                        >
                          <span className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors font-bold text-sm",
                            answers.step5 === opt.label ? "bg-brand-cyan/20" : "bg-[#1e3a50]"
                          )}>💰</span>
                          <span className="text-[13px] font-bold">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="font-sans text-xl font-bold text-white mb-2 leading-tight">Last step — where should we send your audit?</p>
                    <p className="text-sm text-[#5a7a95] mb-8">We'll review your answers before the call so we come prepared.</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#5a7a95]">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Mike Thompson"
                          value={contactData.name}
                          onChange={(e) => setContactData({...contactData, name: e.target.value})}
                          className="w-full bg-[#0d1b2a] border border-[#1e3a50] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#5a7a95]">Business Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Thompson Remodeling"
                          value={contactData.biz}
                          onChange={(e) => setContactData({...contactData, biz: e.target.value})}
                          className="w-full bg-[#0d1b2a] border border-[#1e3a50] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#5a7a95]">Work Email</label>
                          <input 
                            type="email" 
                            placeholder="you@biz.com"
                            value={contactData.email}
                            onChange={(e) => setContactData({...contactData, email: e.target.value})}
                            className="w-full bg-[#0d1b2a] border border-[#1e3a50] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#5a7a95]">Phone Number</label>
                          <input 
                            type="tel" 
                            placeholder="+1 (555) 000-0000"
                            value={contactData.phone}
                            onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                            className="w-full bg-[#0d1b2a] border border-[#1e3a50] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-cyan/10 border-2 border-brand-cyan flex items-center justify-center mx-auto mb-6">
                      <Check className="h-8 w-8 text-brand-cyan" />
                    </div>
                    <p className="font-sans text-2xl font-black text-white mb-3">You're on the list.</p>
                    <p className="text-[#5a7a95] text-sm leading-relaxed mb-8 max-w-[400px] mx-auto">
                      We'll review your answers and reach out within 24 hours to confirm your Pipeline Audit call. No pressure, no pitch — just a clear look at where your pipeline is leaking.
                    </p>

                    <div className="bg-[#0d1b2a] border border-[#1e3a50] rounded-2xl p-6 text-left space-y-3">
                      {[
                        { label: 'Name', value: contactData.name },
                        { label: 'Business', value: contactData.biz },
                        { label: 'Niche', value: answers.step1 },
                        { label: 'Monthly Jobs', value: answers.step2 },
                        { label: 'Main Challenge', value: answers.step3 },
                        { label: 'Ads Experience', value: answers.step4 },
                        { label: 'Budget', value: answers.step5 },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-start gap-4 pb-3 border-b border-[#1e3a50]/50 last:border-0 last:pb-0">
                          <span className="text-[11px] font-black text-[#5a7a95] uppercase tracking-wider">{item.label}</span>
                          <span className="text-[13px] font-bold text-[#c8dae8] text-right">{item.value || '—'}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="bg-[#0d1b2a]/50 p-8 pt-0 border-t border-[#1e3a50]/20">
              <div className="flex items-center justify-between mt-8">
                {step !== 'success' && (
                  <>
                    <button
                      onClick={handleBack}
                      disabled={step === 1}
                      className="px-6 py-3 rounded-xl border border-[#1e3a50] text-[#5a7a95] text-sm font-bold flex items-center gap-2 hover:border-[#5a7a95] hover:text-[#c8dae8] transition-all disabled:opacity-0"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={isNextDisabled()}
                      className="px-8 py-3 rounded-xl bg-brand-cyan text-brand-navy text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#33ddff] transition-all disabled:opacity-20 disabled:grayscale"
                    >
                      {step === 6 ? 'Book My Audit' : 'Continue'} <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                {step === 'success' && (
                  <button
                    onClick={handleGoToBooking}
                    className="w-full py-4 rounded-xl bg-brand-cyan text-brand-navy text-sm font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 group"
                  >
                    Go to Booking Calendar
                    <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
