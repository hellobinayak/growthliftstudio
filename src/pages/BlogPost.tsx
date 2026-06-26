import { useParams, Link } from "react-router-dom";
import React, { useState } from "react";
import { blogPosts } from "../data/blogPosts";
import { ArrowLeft, Clock, Tag, Calendar, Linkedin, Youtube, Facebook, Link2, Check } from "lucide-react";
import { useSurvey } from "../context/SurveyContext";
import { SEO } from "../components/SEO";

/* ── X (Twitter) icon (not in lucide) ── */
function XIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Share buttons component ── */
function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://growthliftstudio.in/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-300 hover:text-brand-cyan transition-colors"
        aria-label="Share on X"
      >
        <XIcon size={20} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-300 hover:text-brand-cyan transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-300 hover:text-brand-cyan transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={20} />
      </a>
      <button
        onClick={handleCopy}
        className="text-zinc-300 hover:text-brand-cyan transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check size={20} className="text-green-500" /> : <Link2 size={20} />}
      </button>
    </div>
  );
}

/* ── Related posts mapping ── */
const relatedPostsMap: Record<string, string[]> = {
  "facebook-ads-bathroom-remodeling-contractors": [
    "google-ads-kitchen-remodeling-contractors",
    "google-ads-bathroom-remodeling-contractors",
  ],
  "google-ads-kitchen-remodeling-contractors": [
    "facebook-ads-bathroom-remodeling-contractors",
    "google-ads-bathroom-remodeling-contractors",
  ],
  "google-ads-bathroom-remodeling-contractors": [
    "facebook-ads-bathroom-remodeling-contractors",
    "google-ads-kitchen-remodeling-contractors",
  ],
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { openSurvey } = useSurvey();
  const post = blogPosts.find((p) => p.slug === slug);
  const [activeId, setActiveId] = useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleIds = entries.filter(e => e.isIntersecting).map(e => e.target.id);
        if (visibleIds.length > 0) {
          setActiveId(visibleIds[0]);
        }
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    const headingElements = document.querySelectorAll("h2[id]");
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [slug]);

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

  /* ── Extract H2 headings for TOC ── */
  const headings = post.content
    .trim()
    .split("\n")
    .filter((line) => line.trim().startsWith("## "))
    .map((line) => {
      const text = line.trim().replace("## ", "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      return { text, id };
    });

  /* ── Get related posts ── */
  const relatedSlugs = relatedPostsMap[post.slug] || [];
  const relatedPosts = relatedSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);

  /* ── Inline mid-post CTA (inserted after 3rd H2) ── */
  const MidPostCTA = () => (
    <div className="my-12 bg-[#0A0A0A] rounded-2xl p-8 sm:p-10 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00C2E0] mb-4">
        Free Strategy Call
      </p>
      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
        Running ads without a system is just burning money.
      </h3>
      <p className="text-zinc-400 font-medium mb-6 max-w-lg mx-auto">
        We build Google Ads campaigns exclusively for home improvement contractors.
        Book a free call — no pitch, just clarity.
      </p>
      <button
        onClick={openSurvey}
        className="inline-flex items-center gap-2 bg-[#00C2E0] text-[#0A0A0A] font-black px-8 py-4 rounded-2xl hover:bg-[#00C2E0]/90 transition-colors text-sm uppercase tracking-widest"
      >
        Book Your Free Consultation →
      </button>
    </div>
  );

  /* ── Content renderer (with anchor IDs on H2s + mid-post CTA) ── */
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.JSX.Element[] = [];
    let key = 0;
    let h2Count = 0;

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
        h2Count++;
        const headingText = line.replace("## ", "");
        const headingId = headingText
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");

        // Insert mid-post CTA after the 3rd H2
        if (h2Count === 4) {
          elements.push(<MidPostCTA key={key++} />);
        }

        elements.push(
          <h2
            key={key++}
            id={headingId}
            className="text-2xl font-black text-brand-navy mt-12 mb-4 tracking-tight scroll-mt-24"
          >
            {headingText}
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

    // If post has 3 or fewer H2s, insert CTA at the end
    if (h2Count <= 3 && h2Count > 0) {
      elements.push(<MidPostCTA key={key++} />);
    }

    return elements;
  };

  const blogPostSchema = [
    {
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://growthliftstudio.in/blog/${post.slug}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": "2026-05-24",
      "author": {
        "@type": "Person",
        "name": "Binayak Dey",
        "url": "https://www.linkedin.com/in/binayakdey/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Growth Lift Studio",
        "logo": {
          "@type": "ImageObject",
          "url": "https://growthliftstudio.in/GLS-icon-navy.svg.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://growthliftstudio.in/blog/${post.slug}`
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${post.title} | Growth Lift Studio`}
        description={post.metaDescription}
        schema={blogPostSchema}
      />

      {/* Hero */}
      <section className="pt-24 pb-12 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-sm font-bold">
              <li>
                <Link to="/" className="text-zinc-400 hover:text-brand-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-zinc-300">→</li>
              <li>
                <Link to="/blog" className="text-zinc-400 hover:text-brand-cyan transition-colors">
                  Blog
                </Link>
              </li>
              <li className="text-zinc-300">→</li>
              <li className="text-brand-navy truncate max-w-[280px] sm:max-w-none">
                {post.title}
              </li>
            </ol>
          </nav>

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

          <p className="text-xl text-zinc-500 leading-relaxed font-medium border-l-4 border-brand-cyan pl-5 mb-8">
            {post.excerpt}
          </p>

          {/* Share buttons — below title */}
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </section>

      {/* Content & Sidebars */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-12 xl:gap-16">

          {/* Left Sidebar: Table of Contents */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
            {headings.length > 0 && (
              <nav className="bg-zinc-50 border-l-4 border-[#00C2E0] rounded-r-2xl p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-navy mb-4">
                  In This Article
                </p>
                <ul className="space-y-3">
                  {headings.map((h, i) => (
                    <li key={i}>
                      <a
                        href={`#${h.id}`}
                        className={`flex items-start gap-2 text-[14px] leading-snug transition-colors ${
                          activeId === h.id
                            ? "text-brand-cyan font-black"
                            : "text-zinc-500 hover:text-brand-cyan font-medium"
                        }`}
                      >
                        <span className={`text-sm mt-0.5 ${activeId === h.id ? "text-brand-cyan" : "text-transparent"}`}>
                          →
                        </span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>

          {/* Center Content */}
          <div className="flex-1 min-w-0 max-w-3xl mx-auto w-full">
            {/* Mobile/Tablet TOC */}
            <div className="block lg:hidden mb-12">
              {headings.length > 0 && (
                <nav className="bg-zinc-50 border-l-4 border-[#00C2E0] rounded-r-2xl p-6 sm:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-navy mb-4">
                    In This Article
                  </p>
                  <ul className="space-y-2.5">
                    {headings.map((h, i) => (
                      <li key={i}>
                        <a
                          href={`#${h.id}`}
                          className="flex items-center gap-3 text-zinc-500 hover:text-brand-cyan transition-colors font-medium text-[15px] group"
                        >
                          <span className="text-[#00C2E0] text-sm group-hover:translate-x-1 transition-transform">→</span>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            <div className="prose prose-lg prose-zinc max-w-none">
              {renderContent(post.content)}
            </div>

          {/* Share buttons — above author block */}
          <div className="mt-16 pt-8 border-t border-zinc-100">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Share this article</p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* Author Block */}
          <hr className="mt-12 border-zinc-100" />
          <div className="py-8 flex flex-col sm:flex-row items-start gap-6">
            <img
              src="https://drive.google.com/thumbnail?id=1dK3OKxXZ2AT7cj_e8jFWNAZXji0B2tmX&sz=w200"
              alt="Binayak Dey - Founder of Growth Lift Studio"
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-lg font-black text-brand-navy mb-1">Binayak Dey</p>
              <p className="text-sm font-bold text-zinc-400 mb-3">
                Performance Marketing Strategist | Founder, Growth Lift Studio
              </p>
              <p className="text-zinc-500 font-medium text-sm leading-relaxed mb-4">
                Binayak helps US home improvement contractors build predictable lead pipelines using
                Google Ads and Facebook Ads. He's worked with bathroom remodelers, kitchen contractors,
                and window replacement companies across the US.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/binayakdey/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-brand-cyan transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@Growthliftstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-brand-cyan transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
          <hr className="border-zinc-100" />

          {/* Related Posts — Keep Reading (Mobile/Tablet fallback) */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 block xl:hidden">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-navy mb-6">Keep Reading</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related!.slug}
                    to={`/blog/${related!.slug}`}
                    className="group block p-6 rounded-2xl border border-zinc-100 hover:border-brand-cyan/30 hover:bg-zinc-50 transition-all"
                  >
                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan mb-3">
                      <Tag size={10} />
                      {related!.category}
                    </span>
                    <p className="font-black text-brand-navy text-base tracking-tight group-hover:text-brand-cyan transition-colors mb-2 leading-snug">
                      {related!.title}
                    </p>
                    <p className="text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2">
                      {related!.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-400 mt-3 uppercase tracking-wider">
                      <Clock size={10} /> {related!.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          </div> {/* End Center Content */}

          {/* Right Sidebar: Related Posts */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-24 self-start">
            {relatedPosts.length > 0 && (
              <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-navy mb-5">Related Articles</h3>
                <div className="flex flex-col gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related!.slug}
                      to={`/blog/${related!.slug}`}
                      className="group block border-b border-zinc-100 pb-4 last:border-0 last:pb-0 transition-all"
                    >
                      <p className="font-bold text-brand-navy text-[15px] tracking-tight group-hover:text-brand-cyan transition-colors mb-1.5 leading-snug">
                        {related!.title}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        <Clock size={10} /> {related!.readTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

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