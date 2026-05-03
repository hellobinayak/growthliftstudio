import React from "react";
import { motion } from "motion/react";
import { 
  Search, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowUpRight,
  TrendingUp,
  Brain,
  Target,
  Rocket
} from "lucide-react";
import { Button, InteractiveCard } from "../components/UI";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How to Generate 21 Qualified Leads in 30 Days: The NYC Case Study",
    excerpt: "See how we achieved a $55 cost-per-lead for a bathroom remodeling contractor in New York City using the 'High-Intent' targeting system.",
    category: "Case Study",
    date: "May 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    icon: <Target className="h-5 w-5" />
  },
  {
    id: 2,
    title: "The 1.5% Performance Model: Why Monthly Retainers are Outdated",
    excerpt: "Why paying for effort is a relic of the past. Learn how aligning incentives with closed job value ensures maximum contractor growth.",
    category: "Strategy",
    date: "May 08, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: 3,
    title: "From 2 Monthly Jobs to 8 Confirmed Bookings in 30 Days (Columbus, OH)",
    excerpt: "James R. went from a gapped calendar to 8 high-ticket remodeling jobs within a month. Here is the exact pipeline breakdown.",
    category: "Execution",
    date: "May 01, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
    icon: <Rocket className="h-5 w-5" />
  },
  {
    id: 4,
    title: "The 'Invisible Drain': How Most Websites Kill Google Ad ROI",
    excerpt: "It's not just the traffic—it's the friction. See the 3 conversion elements your landing page must have to close high-ticket roofing and HVAC jobs.",
    category: "Conversion",
    date: "April 24, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=800&auto=format&fit=crop",
    icon: <Brain className="h-5 w-5" />
  }
];

export default function Blog() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#00f5ff10,transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-cyan/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan mb-8">
              <TrendingUp className="h-3 w-3" />
              Performance Insights
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-black text-brand-navy tracking-tighter mb-8 leading-[0.9]">
              The Growth <br />
              <span className="text-brand-cyan">Archive.</span>
            </h1>
            <p className="text-xl text-zinc-500 font-medium leading-relaxed max-w-2xl">
              Advanced strategies, industry data, and direct insights into scaling home improvement businesses through performance-based lead generation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Search/Filter Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex gap-8">
            <button className="text-xs font-black uppercase tracking-[0.2em] text-brand-cyan border-b-2 border-brand-cyan pb-1">Latest</button>
            <button className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-brand-navy transition-colors pb-1">Industry</button>
            <button className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-brand-navy transition-colors pb-1">Ads Strategy</button>
            <button className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-brand-navy transition-colors pb-1">Scaling</button>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Search className="h-4 w-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="SEARCH INSIGHTS..." 
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0 placeholder:text-zinc-300 w-48"
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <InteractiveCard className="group flex flex-col md:flex-row h-full overflow-hidden border border-zinc-100 bg-white hover:border-brand-cyan/30 transition-colors shadow-2xl shadow-brand-navy/[0.02]">
                  {/* Image Container */}
                  <div className="w-full md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 left-4 p-2 bg-white rounded-lg shadow-xl text-brand-navy">
                      {post.icon}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-cyan">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-zinc-200" />
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-2xl font-sans font-black text-brand-navy tracking-tight leading-tight mb-4 group-hover:text-brand-cyan transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm font-medium text-zinc-500 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">{post.date}</span>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy group/btn">
                        Read Story
                        <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button variant="outline" className="px-12 py-8 text-xs font-black uppercase tracking-widest border-2 hover:bg-brand-navy hover:text-white transition-all">
              Load More Insights
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-brand-navy relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-sans font-black text-white tracking-tight mb-8">
            Growth Intel, <br />
            <span className="text-brand-cyan">Delivered Monthly.</span>
          </h2>
          <p className="text-zinc-400 font-medium mb-10 max-w-lg mx-auto">
            Join 450+ high-growth contractors receiving our raw campaign data and lead performance reports.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="ENTER WORK EMAIL" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan transition-all outline-none"
            />
            <Button className="bg-brand-cyan text-brand-navy font-black py-4 px-8 whitespace-nowrap hover:bg-[#00e1eb]">
              Join Archive
            </Button>
          </div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-6">Exclusive to US Remodelers. No spam. Ever.</p>
        </div>
      </section>
    </div>
  );
}
