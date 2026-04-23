import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X
} from "lucide-react";
import { Button } from "../components/UI";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore, 
  startOfDay 
} from "date-fns";
import { cn } from "../lib/utils";

export default function Contact() {
  const [step, setStep] = useState<'date' | 'details' | 'success'>('date');
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Plumbing'
  });

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  const handleDateClick = (day: Date) => {
    if (isBefore(day, startOfDay(new Date()))) return;
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      setStep('details');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-black text-brand-navy uppercase tracking-widest">
          {format(currentMonth, "MMMM yyyy")}
        </h4>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-zinc-100 hover:bg-zinc-50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-zinc-400" />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-zinc-100 hover:bg-zinc-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 mb-4">
        {days.map((day) => (
          <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isPast = isBefore(day, startOfDay(new Date()));

        days.push(
          <div
            key={day.toString()}
            className={cn(
              "relative aspect-square flex items-center justify-center cursor-pointer text-sm font-bold rounded-xl transition-all",
              !isCurrentMonth ? "text-zinc-200 pointer-events-none" : "",
              isPast ? "text-zinc-300 pointer-events-none" : "text-brand-navy hover:bg-brand-cyan/10 hover:text-brand-cyan",
              isSelected ? "bg-brand-navy text-white hover:bg-brand-navy hover:text-white shadow-lg shadow-brand-navy/20" : ""
            )}
            onClick={() => handleDateClick(cloneDay)}
          >
            {formattedDate}
            {isSelected && (
              <motion.div 
                layoutId="activeDay"
                className="absolute inset-0 border-2 border-brand-cyan rounded-xl pointer-events-none"
              />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-2">{rows}</div>;
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-8xl font-sans font-black text-brand-navy mb-8 tracking-tighter">
              Let's build your <br />
              <span className="text-brand-cyan">pipeline.</span>
            </h1>
            <p className="text-xl text-zinc-500 font-medium">
              Ready to stop chasing leads and start booking jobs? <br />
              Select a time for your <span className="text-brand-navy font-bold">Pipeline Audit</span> below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            
            {/* Booking Interface */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-zinc-100 shadow-2xl shadow-brand-navy/5 min-h-[600px] flex flex-col">
                  
                  <AnimatePresence mode="wait">
                    {step === 'date' && (
                      <motion.div 
                        key="date-step"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-grow"
                      >
                        <div className="flex items-center gap-4 mb-8">
                          <div className="h-12 w-12 bg-brand-cyan/10 rounded-2xl flex items-center justify-center">
                            <CalendarIcon className="h-6 w-6 text-brand-cyan" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-brand-navy tracking-tight">Select a Date</h3>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">30-Min Pipeline Strategy Session</p>
                          </div>
                        </div>

                        {renderHeader()}
                        {renderDays()}
                        {renderCells()}

                        <div className="mt-12">
                          <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6">Available Times</h4>
                          <div className="flex flex-wrap gap-3">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={cn(
                                  "px-6 py-3 rounded-xl border text-sm font-bold transition-all",
                                  selectedTime === time 
                                    ? "bg-brand-cyan border-brand-cyan text-brand-navy shadow-lg shadow-brand-cyan/20" 
                                    : "border-zinc-100 text-zinc-500 hover:border-brand-cyan hover:text-brand-cyan"
                                )}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-zinc-50">
                          <Button 
                            disabled={!selectedDate || !selectedTime}
                            onClick={handleNext}
                            className="w-full h-16 bg-brand-navy text-white text-lg font-bold group disabled:opacity-50 disabled:grayscale"
                          >
                            Enter Your Details <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 'details' && (
                      <motion.div 
                        key="details-step"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-grow"
                      >
                        <button onClick={() => setStep('date')} className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-brand-cyan transition-colors mb-8">
                          <ChevronLeft className="h-4 w-4" /> Back to Calendar
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                          <div className="h-12 w-12 bg-brand-cyan/10 rounded-2xl flex items-center justify-center">
                            <Clock className="h-6 w-6 text-brand-cyan" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-brand-navy tracking-tight">Audit Details</h3>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                              {format(selectedDate, "MMM d, yyyy")} @ {selectedTime}
                            </p>
                          </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Your Name</label>
                              <input 
                                required
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-4 focus:border-brand-cyan outline-none transition-colors" 
                                placeholder="Enter name" 
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Business Name</label>
                              <input 
                                required
                                type="text" 
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-4 focus:border-brand-cyan outline-none transition-colors" 
                                placeholder="e.g. Sullivan Plumbing" 
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Work Email</label>
                            <input 
                              required
                              type="email" 
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-4 focus:border-brand-cyan outline-none transition-colors" 
                              placeholder="john@business.com" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Service Category</label>
                            <select 
                              className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-4 focus:border-brand-cyan outline-none transition-colors appearance-none"
                              value={formData.service}
                              onChange={(e) => setFormData({...formData, service: e.target.value})}
                            >
                              <option>Plumbing</option>
                              <option>HVAC</option>
                              <option>Roofing</option>
                              <option>Remodeling</option>
                              <option>Electrical</option>
                              <option>Other</option>
                            </select>
                          </div>
                          
                          <div className="pt-8">
                             <Button type="submit" className="w-full h-16 bg-brand-navy text-white text-lg font-bold group">
                                Confirm Booking <CheckCircle2 className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
                             </Button>
                          </div>
                        </form>
                      </motion.div>
                    )}

                    {step === 'success' && (
                      <motion.div 
                        key="success-step"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center flex-grow py-12"
                      >
                        <div className="h-24 w-24 bg-brand-cyan/10 rounded-full flex items-center justify-center mb-10">
                          <CheckCircle2 className="h-12 w-12 text-brand-cyan" />
                        </div>
                        <h3 className="text-4xl font-black text-brand-navy mb-4 tracking-tighter">You're Booked.</h3>
                        <p className="text-zinc-500 mb-10 max-w-sm font-medium">
                          Check your inbox. We've sent the meeting invite and a few things to prep for our session on <span className="text-brand-navy font-bold">{format(selectedDate, "MMM d")} at {selectedTime}</span>.
                        </p>
                        <Button 
                          onClick={() => setStep('date')}
                          variant="outline"
                          className="px-10 h-14 border-zinc-200 text-zinc-500 rounded-xl font-bold uppercase tracking-widest text-xs"
                        >
                          Book another <CalendarIcon className="h-4 w-4 ml-2" />
                        </Button>
                        
                        <div className="mt-16 w-full pt-10 border-t border-zinc-50 flex items-center justify-center gap-8">
                           <div className="text-center">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-1">Status</p>
                              <p className="text-sm font-bold text-brand-cyan">Confirmed</p>
                           </div>
                           <div className="text-center">
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-1">Duration</p>
                              <p className="text-sm font-bold text-brand-navy">30 Mins</p>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="flex flex-col justify-center space-y-16">
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-brand-navy tracking-tight">Direct Connect</h3>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                  Most owners prefer to book a time that works for them. 
                  However, if you're in a rush or want to talk immediately, reach out through these channels.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="h-16 w-16 bg-brand-cyan/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-cyan/10 transition-colors">
                    <Mail className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-xl font-black text-brand-navy">hello@growthlift.studio</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="h-16 w-16 bg-brand-cyan/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-cyan/10 transition-colors">
                    <Phone className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-xl font-black text-brand-navy">+1 (888) 422-7901</p>
                  </div>
                </div>

                <div className="pt-12 border-t border-zinc-100">
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-8">Follow our builds</p>
                  <div className="flex gap-6">
                    <Instagram className="h-6 w-6 text-brand-navy/20 hover:text-brand-cyan transition-colors" />
                    <Facebook className="h-6 w-6 text-brand-navy/20 hover:text-brand-cyan transition-colors" />
                    <Linkedin className="h-6 w-6 text-brand-navy/20 hover:text-brand-cyan transition-colors" />
                    <Youtube className="h-6 w-6 text-brand-navy/20 hover:text-brand-cyan transition-colors" />
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-start gap-5">
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
