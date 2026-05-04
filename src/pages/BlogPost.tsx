import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import { Button } from "../components/UI";
import { useSurvey } from "../context/SurveyContext";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { openSurvey } = useSurvey();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-zinc-400 font-black uppercase tracking-widest text-sm mb-6">Post not found.</p>
          <Link to="/blog">
            <Button variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content
      .trim()
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-2xl font-black text-brand-navy mt-12 mb-4 tracking-tight">{line.replace("## ", "")}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={i} className="text-xl font-black text-brand-navy mt-8 mb-3 tracking-tight">{line.replace("### ", "")}</h3>;
        }
        if (line.startsWith("- **")) {
          const parts = line.replace("- **", "").split("**");
          return <li key={i} className="text-zinc-600 font-medium mb-2"><strong className="text-brand-navy">{parts[0]}</strong>{parts[1]}</li>;
        }
        if (line.startsWith("- ")) {
          return <li key={i} className="text-zinc-600 font-medium mb-2">{line.replace("- ", "")}</li>;
        }
        if (line.trim() === "") return <br key={i} />;
        return <p key={i} className="text-zinc-600 font-medium leading-relaxed mb-4">{line}</p>;
      });
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 px-6 bg-zinc-50 border-b border-zinc-100">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-brand-cyan transition-colors mb-8">
              <ArrowLeft className="h-3 w-3" /> Back to Blog
            </Link>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tighter text-brand-navy mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ul className="list-none">
              {formatContent(post.content)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-brand-navy">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-4">
            Want this system built <span className="text-brand-cyan">for you?</span>
          </h2>
          <p className="text-zinc-400 font-medium mb-8">Performance-based. You don't pay until jobs are confirmed.</p>
          <Button
            onClick={openSurvey}
            className="bg-brand-cyan text-brand-navy font-black hover:bg-brand-cyan/90"
            size="lg"
          >
            Book a Free Call <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}