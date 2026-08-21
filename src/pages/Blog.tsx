import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import { SEO } from "../components/SEO";

export default function Blog() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://growthliftstudio.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://growthliftstudio.in/blog"
      }
    ]
  };

  return (
    <div className="relative min-h-screen bg-white">
      <SEO 
        title="The Growth Archive & B2B Strategy Blog | Growth Lift Studio" 
        description="Read standard performance ads strategy breakdowns, niche industry case studies, and insights on growing home improvement contractor bookings."
        schema={breadcrumbSchema}
      />
      {/* Header */}
      <section className="relative py-16 md:py-24 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-cyan-ink font-black mb-4 inline-block">
              The Growth Archive
            </span>
            <h1 className="text-4xl sm:text-6xl font-sans font-black tracking-tighter text-brand-navy mb-6 leading-tight">
              Paid Ads. Real Results. <br />
              <span className="text-brand-cyan">No Fluff.</span>
            </h1>
            <p className="text-lg text-zinc-500 font-medium max-w-xl mx-auto">
              Strategies, systems, and breakdowns for home improvement contractors who want a predictable pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          {blogPosts.length === 0 ? (
            <div className="text-center py-16 md:py-24">
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured latest post */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/blog/${blogPosts[0].slug}`} className="group block">
                  <div className="grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden elev-cyan hover:-translate-y-1 transition-all duration-300">
                    {blogPosts[0].coverImage && (
                      <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-brand-navy">
                        <img
                          src={blogPosts[0].coverImage}
                          alt={blogPosts[0].title}
                          loading="lazy"
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="mb-5 flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy bg-brand-cyan px-3 py-1 rounded-full">Latest</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan-ink bg-brand-cyan/10 px-3 py-1 rounded-full">{blogPosts[0].category}</span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black text-brand-navy mb-4 leading-tight tracking-tight group-hover:text-brand-cyan transition-colors">
                        {blogPosts[0].title}
                      </h2>
                      <p className="text-base text-zinc-500 font-medium leading-relaxed mb-8">
                        {blogPosts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{blogPosts[0].date}</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-300" />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{blogPosts[0].readTime}</span>
                        <ArrowRight className="h-4 w-4 text-brand-cyan ml-auto group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Rest of the posts */}
              {blogPosts.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.slice(1).map((post, i) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link to={`/blog/${post.slug}`} className="group block h-full">
                        <div className="h-full bg-white rounded-3xl overflow-hidden elev-soft hover:elev-cyan hover:-translate-y-1 transition-all duration-300 flex flex-col">
                          {post.coverImage && (
                            <div className="aspect-[16/9] overflow-hidden bg-brand-navy">
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                loading="lazy"
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="p-8 flex flex-col flex-1">
                            <div className="mb-6">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan-ink bg-brand-cyan/10 px-3 py-1 rounded-full">
                                {post.category}
                              </span>
                            </div>
                            <h2 className="text-xl font-black text-brand-navy mb-4 leading-tight tracking-tight group-hover:text-brand-cyan transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8 flex-1">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{post.date}</span>
                                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{post.readTime}</span>
                              </div>
                              <ArrowRight className="h-4 w-4 text-brand-cyan group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}