import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Search, Home, Wrench, BarChart3, Phone } from "lucide-react";
import { SEO } from "../components/SEO";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <SEO
        title="Page Not Found | Growth Lift Studio"
        description="The page you're looking for doesn't exist or has been moved."
        noindex
      />
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,183,212,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 text-center px-6 py-20 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="relative mb-8">
            <span className="text-[10rem] sm:text-[14rem] font-black text-brand-navy/5 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-16 w-16 text-brand-cyan/40" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tighter mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-zinc-500 font-medium mb-12 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
            <Link
              to="/"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-brand-navy/5 hover:bg-brand-cyan/10 transition-colors group"
            >
              <Home className="h-6 w-6 text-brand-navy/30 group-hover:text-brand-cyan transition-colors" />
              <span className="text-sm font-bold text-brand-navy">Home</span>
            </Link>
            <Link
              to="/services"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-brand-navy/5 hover:bg-brand-cyan/10 transition-colors group"
            >
              <Wrench className="h-6 w-6 text-brand-navy/30 group-hover:text-brand-cyan transition-colors" />
              <span className="text-sm font-bold text-brand-navy">Services</span>
            </Link>
            <Link
              to="/results"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-brand-navy/5 hover:bg-brand-cyan/10 transition-colors group"
            >
              <BarChart3 className="h-6 w-6 text-brand-navy/30 group-hover:text-brand-cyan transition-colors" />
              <span className="text-sm font-bold text-brand-navy">Results</span>
            </Link>
            <Link
              to="/contact"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-brand-navy/5 hover:bg-brand-cyan/10 transition-colors group"
            >
              <Phone className="h-6 w-6 text-brand-navy/30 group-hover:text-brand-cyan transition-colors" />
              <span className="text-sm font-bold text-brand-navy">Contact</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
