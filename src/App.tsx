import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  BarChart3, 
  Bot, 
  Hammer, 
  MessageSquare, 
  CheckCircle2, 
  TrendingUp, 
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ShieldCheck,
  Calendar,
  Layers,
  Search,
  Target
} from "lucide-react";
import { DotGrid, LightBeam, BeamPattern, Particles } from "./components/BackgroundEffects";
import { Button, InteractiveCard } from "./components/UI";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "./lib/utils";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SurveyProvider } from "./context/SurveyContext";

// Page Imports
import Home from "./pages/Home";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);
  
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SurveyProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/results" element={<CaseStudies />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} /> 
	    <Route path="/blog" element={<Blog />} />
	    <Route path="/blog/:slug" element={<BlogPost />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </SurveyProvider>
    </Router>
  );
}
