import React, { useState, useEffect } from "react";
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "./UI";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useSurvey } from "../context/SurveyContext";
import { motion, AnimatePresence } from "motion/react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { openSurvey } = useSurvey();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/results" },
    { name: "About Us", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div className="relative min-h-screen font-body text-brand-navy bg-white">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 transition-colors duration-300",
        isMenuOpen ? "bg-white" : "bg-white/80 backdrop-blur-xl"
      )}>
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden flex items-center justify-center group-hover:rotate-6 transition-transform">
              <img 
                src="/GLS-icon-navy.svg.png" 
                alt="Growth Lift Studio Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-sans font-extrabold text-lg sm:text-xl tracking-tight text-brand-navy whitespace-nowrap">
              Growth Lift <span className="hidden sm:inline">Studio</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-zinc-500 font-bold uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href} 
                className={cn(
                  "hover:text-brand-cyan transition-colors",
                  location.pathname === link.href ? "text-brand-cyan underline decoration-2 underline-offset-4" : ""
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              onClick={openSurvey} 
              size="sm" 
              className="bg-brand-navy text-white hover:bg-brand-navy/90"
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-brand-navy focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-0 bg-white z-[60] px-6 pt-32 pb-12 flex flex-col items-center overflow-y-auto"
            >
              <div className="absolute top-0 left-0 right-0 h-20 px-6 flex items-center justify-between border-b border-zinc-100">
                <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={() => setIsMenuOpen(false)}>
                  <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden flex items-center justify-center">
                    <img 
                      src="/GLS-icon-navy.svg.png" 
                      alt="Growth Lift Studio Logo" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-sans font-extrabold text-lg sm:text-xl tracking-tight text-brand-navy whitespace-nowrap">
                    Growth Lift <span className="hidden sm:inline">Studio</span>
                  </span>
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-brand-navy hover:text-brand-cyan transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-8 items-center w-full">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link 
                      to={link.href} 
                      className={cn(
                        "text-3xl font-sans font-black uppercase tracking-widest transition-all",
                        location.pathname === link.href ? "text-brand-cyan scale-110" : "text-brand-navy hover:text-brand-cyan"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-12 flex flex-col gap-6 w-full max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="h-px w-12 bg-zinc-100 mx-auto" />
                <Button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openSurvey();
                  }} 
                  className="w-full bg-brand-navy text-white py-6 text-lg hover:bg-[#0d1b2a] transition-all"
                >
                  Book a Call
                </Button>
                
                <div className="flex justify-center gap-10 mt-6">
                  <a href="https://www.instagram.com/growthliftstudio/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="p-3 bg-zinc-50 rounded-full hover:bg-brand-cyan/10 transition-colors">
                    <Instagram className="h-6 w-6 text-zinc-400 hover:text-brand-cyan" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61552669001037" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="p-3 bg-zinc-50 rounded-full hover:bg-brand-cyan/10 transition-colors">
                    <Facebook className="h-6 w-6 text-zinc-400 hover:text-brand-cyan" />
                  </a>
                  <a href="https://www.linkedin.com/in/binayakdey/" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn profile" className="p-3 bg-zinc-50 rounded-full hover:bg-brand-cyan/10 transition-colors">
                    <Linkedin className="h-6 w-6 text-zinc-400 hover:text-brand-cyan" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-100 pt-24 pb-12 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 overflow-hidden flex items-center justify-center">
                  <img 
                    src="/GLS-icon-navy.svg.png" 
                    alt="Growth Lift Studio Logo" 
                    className="h-full w-full object-cover"
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </div>
                <span className="font-sans font-black text-xl tracking-tight text-brand-navy">Growth Lift Studio</span>
              </div>
              <p className="text-zinc-500 max-w-xs leading-relaxed mb-8">
                Building predictable, high-velocity revenue pipelines for home service businesses across the US.
              </p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/growthliftstudio/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">
                  <Instagram className="h-5 w-5 text-zinc-400 hover:text-brand-cyan transition-colors cursor-pointer" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61552669001037" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
                  <Facebook className="h-5 w-5 text-zinc-400 hover:text-brand-cyan transition-colors cursor-pointer" />
                </a>
                <a href="https://www.linkedin.com/in/binayakdey/" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn profile">
                  <Linkedin className="h-5 w-5 text-zinc-400 hover:text-brand-cyan transition-colors cursor-pointer" />
                </a>
                <a href="https://www.youtube.com/@Growthliftstudio" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                  <Youtube className="h-5 w-5 text-zinc-400 hover:text-brand-cyan transition-colors cursor-pointer" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-sans font-black text-xs uppercase tracking-[0.2em] text-brand-navy mb-6">Expertise</h3>
              <ul className="space-y-4 text-sm font-bold text-zinc-500">
                <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Services</Link></li>
                <li><Link to="/results" className="hover:text-brand-cyan transition-colors">Case Studies</Link></li>
                <li><Link to="/testimonials" className="hover:text-brand-cyan transition-colors">Testimonials</Link></li>
                <li><a href="/#process" className="hover:text-brand-cyan transition-colors">Our Process</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans font-black text-xs uppercase tracking-[0.2em] text-brand-navy mb-6">Resources</h3>
             <ul className="space-y-4 text-sm font-bold text-zinc-500">
                <li><Link to="/about" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
                <li><Link to="/faq" className="hover:text-brand-cyan transition-colors">FAQ</Link></li>
                <li><Link to="/blog" className="hover:text-brand-cyan transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-brand-cyan transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans font-black text-xs uppercase tracking-[0.2em] text-brand-navy mb-6">Legal</h3>
              <ul className="space-y-4 text-sm font-bold text-zinc-500">
                <li><Link to="/privacy-policy" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-brand-cyan transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">Growth Lift Studio © 2026</p>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">System Operational v4.2</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
