import { useParams, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { blogPosts } from "../data/blogPosts";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { useSurvey } from "../context/SurveyContext";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { openSurvey } = useSurvey();
  const post = blogPosts.find((p) => p.slug === slug);

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-brand-navy mb-4">Post not found</h1>
          <Link to="/blog" className="text-brand-cyan hover:underline font-bold">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        elements.push(<div key={key++} className="h-2" />);
        continue;
      }

      // IMAGE render — format: IMAGE::path::caption
      if (line.startsWith("IMAGE::")) {
        const parts = line.split("::");
        const src = parts[1];
        const caption = parts[2] || "";
        elements.push(
          <figure key={key++} className="my-10">
            <img
              src={src}
              alt={caption}
              className="w-full rounded-2xl border border-zinc-100 shadow-xl"
            />
            {caption && (
              <figcaption className="text-center text-zinc-400 text-sm mt-3 italic font-medium">
                {caption}
              </figcaption>
            )}
          </figure>
        );
        continue;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="text-2xl font-black text-brand-navy mt-12 mb-4 tracking-tight">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={key++} className="text-xl font-black text-brand-cyan mt-8 mb-3 tracking-tight">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={key++} className="font-black text-brand-navy mt-4 mb-2">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={key++} className="text-zinc-600 leading-relaxed ml-4 list-disc marker:text-brand-cyan font-medium mb-1">
            {line.replace("- ", "")}
          </li>
        );
      } else if (line === "---") {
        elements.push(<hr key={key++} className="border-zinc-100 my-10" />);
      } else {
        elements.push(
          <p key={key++} className="text-zinc-600 leading-relaxed text-lg font-medium">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand-cyan transition-colors mb-10 text-sm font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full">
              <Tag size={10} />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase tracking-wider">
              <Calendar size={10} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold uppercase tracking-wider">
              <Clock size={10} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tighter leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-zinc-500 leading-relaxed font-medium border-l-4 border-brand-cyan pl-5">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {renderContent(post.content)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-brand-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-4">
            Want this system built <span className="text-brand-cyan">for you?</span>
          </h2>
          <p className="text-zinc-400 font-medium mb-8 text-lg">
            First 5 qualified appointments free. You pay 1.5% only when you close a job.
          </p>
          <button
            onClick={openSurvey}
            className="inline-flex items-center gap-2 bg-brand-cyan text-brand-navy font-black px-8 py-4 rounded-2xl hover:bg-brand-cyan/90 transition-colors text-sm uppercase tracking-widest"
          >
            Book a Free Call
          </button>
        </div>
      </section>

      {/* Back link */}
      <div className="py-12 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand-cyan transition-colors text-sm font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>

    </div>
  );
}