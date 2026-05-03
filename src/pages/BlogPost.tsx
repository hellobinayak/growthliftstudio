import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { blogPosts } from "../data/blogPosts";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  // Update meta tags for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Growth Lift Studio`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", post.metaDescription);
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-cyan-400 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  // Convert markdown-style content to JSX
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        elements.push(<div key={key++} className="h-4" />);
        continue;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={key++}
            className="text-2xl font-bold text-white mt-10 mb-4"
          >
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={key++}
            className="text-xl font-semibold text-cyan-400 mt-8 mb-3"
          >
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={key++} className="font-bold text-white mt-4 mb-2">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li
            key={key++}
            className="text-gray-300 leading-relaxed ml-4 list-disc marker:text-cyan-400"
          >
            {line.replace("- ", "")}
          </li>
        );
      } else if (line === "---") {
        elements.push(
          <hr key={key++} className="border-white/10 my-8" />
        );
      } else {
        elements.push(
          <p key={key++} className="text-gray-300 leading-relaxed text-lg">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          to="/blog"
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-10 text-sm"
        >
          <ArrowLeft size={16} /> Back to blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            <span className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Tag size={12} />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-gray-400 text-xl leading-relaxed border-l-2 border-cyan-400 pl-5">
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-10" />

        {/* Content */}
        <div className="space-y-4">
          {renderContent(post.content)}
        </div>

        {/* CTA Box */}
        <div className="mt-16 border border-cyan-400/30 rounded-2xl p-8 bg-cyan-400/5">
          <h3 className="text-xl font-bold mb-3">
            Ready to generate more leads for your business?
          </h3>
          <p className="text-gray-400 mb-6">
            Growth Lift Studio delivers the first 5 qualified appointments free. Performance-based pricing — you pay 1.5% only when you close a job.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-cyan-300 transition-colors"
          >
            Book a Free Call
          </Link>
        </div>

        {/* Back */}
        <div className="mt-10">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Back to blog
          </Link>
        </div>

      </div>
    </div>
  );
}
