import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { ArrowRight, Clock, Tag } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Lead Generation Insights for Home Improvement Contractors
          </h1>
          <p className="text-gray-400 text-lg">
            Real strategies, real numbers. No fluff — just what actually works for bathroom remodeling, kitchen remodeling, and window replacement businesses.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300 hover:bg-white/5">

                {/* Meta */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                    <Tag size={12} />
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* CTA */}
                <span className="flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                  Read article <ArrowRight size={16} />
                </span>

              </article>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {blogPosts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No posts yet. Check back soon.
          </div>
        )}

      </div>
    </div>
  );
}
