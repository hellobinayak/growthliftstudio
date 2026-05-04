import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  Search,
  Calendar,
  Clock,
  User
} from "lucide-react";
import { DotGrid, LightBeam, FloatingDots } from "../components/BackgroundEffects";
import { Button, InteractiveCard } from "../components/UI";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden min-h-screen">
        <motion.div style={{ y: backgroundY }} className="h-full w-full relative">
          <DotGrid />
          <FloatingDots count={40} className="opacity-30" />
          <LightBeam className="opacity-20" />
        </motion.div>
      </div>

      {/* Header Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-brand-cyan font-black border border-brand-cyan/20 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm mb-8 inline-block shadow-sm">
              Insights & Intelligence
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-sans font-black tracking-tighter mb-8 leading-[0.9] text-brand-navy">
              Growth <span className="shimmer-text">Insights.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-12 text-balance leading-relaxed">
              Strategies, data, and hard truths about scaling home improvement businesses through performance-based marketing.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-brand-cyan transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search articles, tactics, or categories..." 
                className="w-full bg-white border border-zinc-200 h-16 pl-14 pr-6 rounded-2xl text-brand-navy font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan/10 focus:border-brand-cyan transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post (only if no search) */}
      {!searchTerm && filteredPosts.length > 0 && (
        <section className="relative z-10 px-6 mb-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[3rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-brand-navy/5 bg-white group cursor-pointer"
            >
              <Link to={`/blog/${filteredPosts[0].slug}`} className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent opacity-60" />
                </div>
                <div className="p-8 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan px-3 py-1 bg-brand-cyan/10 rounded-full">
                      Featured Article
                    </span>
                    <span className="h-1 w-1 rounded-full bg-zinc-300" />
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{filteredPosts[0].category}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-sans font-black text-brand-navy mb-6 tracking-tight leading-tight group-hover:text-brand-cyan transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-lg text-zinc-500 mb-8 leading-relaxed line-clamp-3">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-zinc-100">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-brand-navy/5 flex items-center justify-center border border-zinc-100">
                        <User className="h-5 w-5 text-brand-navy" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-brand-navy uppercase tracking-tight">{filteredPosts[0].author}</p>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{filteredPosts[0].date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-brand-navy font-black tracking-widest text-[10px] uppercase gap-3">
                       Read Full Strategy <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="relative z-10 px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          {searchTerm && (
            <div className="mb-12">
              <p className="text-zinc-500 font-medium">
                Found {filteredPosts.length} results for <span className="text-brand-navy font-black">"{searchTerm}"</span>
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(searchTerm ? 0 : 1).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <Link to={`/blog/${post.slug}`}>
                  <InteractiveCard className="h-full bg-white border border-zinc-100 rounded-[2rem] overflow-hidden group/card hover:shadow-2xl hover:shadow-brand-navy/5 transition-all flex flex-col cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white px-3 py-1 bg-brand-navy/80 backdrop-blur-md rounded-full border border-white/20">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {post.date}</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-300" />
                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-sans font-black text-brand-navy mb-4 tracking-tight group-hover/card:text-brand-cyan transition-colors leading-snug">
                        {post.title}
                      </h3>
                      
                      <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                        <div className="flex gap-2">
                          {post.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[9px] font-black uppercase tracking-wider text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-100">
                              #{tag.replace(/\s+/g, '')}
                            </span>
                          ))}
                        </div>
                        <ArrowRight className={cn(
                          "h-5 w-5 text-brand-cyan transition-all duration-300 transform",
                          hoveredPost === post.id ? "translate-x-1 opacity-100" : "translate-x-0 opacity-40"
                        )} />
                      </div>
                    </div>
                  </InteractiveCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <div className="h-20 w-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search className="h-8 w-8 text-zinc-300" />
              </div>
              <h3 className="text-2xl font-black text-brand-navy mb-2">No articles found</h3>
              <p className="text-zinc-500">Try adjusting your search terms or filters.</p>
              <Button 
                variant="ghost" 
                className="mt-6 text-brand-cyan font-bold"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Floating CTA */}
      <section className="relative z-10 py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
           <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Start Growing</p>
           <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-brand-navy mb-8 tracking-tight">
             Looking for leads, not reading material?
           </h2>
           <Link to="/contact">
             <Button size="xl" className="bg-brand-navy text-white hover:bg-brand-navy/90 rounded-2xl group">
               Book Your Strategy Session <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
             </Button>
           </Link>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

