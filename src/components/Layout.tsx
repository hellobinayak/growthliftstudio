import React from "react";
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube,
  ArrowRight
} from "lucide-react";
import { Button } from "./UI";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useSurvey } from "../context/SurveyContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { openSurvey } = useSurvey();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/results" },
    { name: "About Us", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  return (
    <div className="relative min-h-screen font-body text-brand-navy bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 overflow-hidden flex items-center justify-center group-hover:rotate-6 transition-transform">
              <img 
                src="https://lh3.googleusercontent.com/d/1KqrKpekKkYsgY6QR-WzzF_QEwaxhswBM" 
                alt="Growth Lift Studio Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-sans font-extrabold text-xl tracking-tight text-brand-navy">Growth Lift Studio</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-500 font-bold uppercase tracking-wider">
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
        </div>
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
                    src="https://lh3.googleusercontent.com/d/1KqrKpekKkYsgY6QR-WzzF_QEwaxhswBM" 
                    alt="Growth Lift Studio Logo" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-sans font-black text-xl tracking-tight text-brand-navy">Growth Lift Studio</span>
              </div>
              <p className="text-zinc-500 max-w-xs leading-relaxed mb-8">
                Building predictable, high-velocity revenue pipelines for home service businesses across the US.
              </p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/growthliftstudio/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-zinc-400 hover:text-brand-cyan transition-colors cursor-pointer" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61552669001037" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-zinc-400 hover:text-brand-cyan transition-colors cursor-pointer" />
                </a>
                <a href="https://www.linkedin.com/in/binayakdey/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-zinc-400 hover:text-brand-cyan transition-colors cursor-pointer" />
                </a>
                <a href="https://www.youtube.com/@Growthliftstudio" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5 text-zinc-400 hover:text-brand-cyan transition-colors cursor-pointer" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-sans font-black text-xs uppercase tracking-[0.2em] text-brand-navy mb-6">Expertise</h4>
              <ul className="space-y-4 text-sm font-bold text-zinc-500">
                <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Services</Link></li>
                <li><Link to="/results" className="hover:text-brand-cyan transition-colors">Case Studies</Link></li>
                <li><Link to="/testimonials" className="hover:text-brand-cyan transition-colors">Testimonials</Link></li>
                <li><a href="/#process" className="hover:text-brand-cyan transition-colors">Our Process</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-black text-xs uppercase tracking-[0.2em] text-brand-navy mb-6">Resources</h4>
              <ul className="space-y-4 text-sm font-bold text-zinc-500">
                <li><Link to="/about" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
                <li><Link to="/about#faq" className="hover:text-brand-cyan transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-brand-cyan transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-black text-xs uppercase tracking-[0.2em] text-brand-navy mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-bold text-zinc-500">
                <li><Link to="/privacy" className="hover:text-brand-cyan transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-brand-cyan transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em]">Growth Lift Studio © 2026</p>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">System Operational v4.2</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
