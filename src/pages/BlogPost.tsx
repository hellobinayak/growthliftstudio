import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2,
  Bookmark,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import { Button } from "../components/UI";
import { DotGrid } from "../components/BackgroundEffects";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-brand-navy mb-4">Post Not Found</h1>
          <p className="text-zinc-500 mb-8 text-xl">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white pt-32 pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <DotGrid />
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-12">
          <Link to="/" className="hover:text-brand-cyan transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/blog" className="hover:text-brand-cyan transition-colors">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brand-navy truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/blog")}
          className="group flex items-center gap-2 text-xs font-black text-brand-navy uppercase tracking-widest mb-8 hover:text-brand-cyan transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan px-3 py-1 bg-brand-cyan/10 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black text-brand-navy mb-8 leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pb-12 border-b border-zinc-100 mb-12">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-navy/5 flex items-center justify-center border border-zinc-100">
                <User className="h-5 w-5 text-brand-navy" />
              </div>
              <div>
                <p className="text-sm font-black text-brand-navy uppercase tracking-tight">{post.author}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Founder & Strategist</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-zinc-100 hidden sm:block" />

            <div className="flex items-center gap-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {post.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative h-64 sm:h-[400px] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl shadow-brand-navy/5 border border-zinc-100"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-[1fr,250px] gap-16">
          <article className="prose prose-zinc prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-brand-navy prose-p:text-zinc-500 prose-p:leading-relaxed prose-li:text-zinc-500 prose-strong:text-brand-navy prose-a:text-brand-cyan">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* Tags */}
            <div className="mt-16 pt-8 border-t border-zinc-100">
              <div className="flex items-center gap-4 mb-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tagged In:</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-brand-navy bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-navy mb-6">Tools</h4>
              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-3 text-xs font-bold text-zinc-500 hover:text-brand-cyan transition-colors">
                  <Share2 className="h-4 w-4" /> Share Article
                </button>
                <button className="flex items-center gap-3 text-xs font-bold text-zinc-500 hover:text-brand-cyan transition-colors">
                  <Bookmark className="h-4 w-4" /> Save for Later
                </button>
                <button className="flex items-center gap-3 text-xs font-bold text-zinc-500 hover:text-brand-cyan transition-colors">
                  <MessageSquare className="h-4 w-4" /> Discuss
                </button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-navy mb-4">Need More Leads?</h4>
              <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                We help 16+ contractors scale through Facebook and Google Ads.
              </p>
              <Link to="/contact">
                <Button className="w-full text-[10px] py-4">Book Strategy Session</Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
