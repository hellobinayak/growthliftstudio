import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Cycles through `texts` with a typewriter type/delete effect.
 * The animated text is aria-hidden; the parent badge carries a stable aria-label.
 * Respects prefers-reduced-motion by rendering the first item statically.
 */
function Typewriter({ texts }: { texts: string[] }) {
  const shouldReduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    if (shouldReduce) {
      setDisplayText(texts[0] ?? "");
      return;
    }

    const handleType = () => {
      const fullText = texts[index];

      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setSpeed(100);

        if (displayText === fullText) {
          setIsDeleting(true);
          setSpeed(2000); // pause at full word
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setSpeed(50);

        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
          setSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, speed, shouldReduce]);

  return (
    <span aria-hidden="true">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[11px] bg-brand-cyan ml-1 mb-[-1px] rounded-full"
      />
    </span>
  );
}

type ProximityBadgeProps = {
  /** Static prefix, e.g. "Serving in" */
  label: string;
  /** Words to cycle through */
  items: string[];
  /** Stable label read by screen readers instead of the animating text */
  ariaLabel: string;
  /** Entrance delay (s) to stagger multiple badges */
  delay?: number;
};

/**
 * Light-theme pill badge with a live ping dot, a cursor-follow glow on hover,
 * and a typewriter that cycles `items`. Tuned for the (white) hero background.
 */
export function ProximityBadge({ label, items, ariaLabel, delay = 0 }: ProximityBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-white/60 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm relative overflow-hidden group cursor-default min-w-[240px] sm:min-w-[280px] max-w-full"
    >
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
        {/* Live ping dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
        </span>
        <span className="text-zinc-500">{label}</span>
        <span className="text-brand-navy font-black">
          <Typewriter texts={items} />
        </span>
      </span>

      {/* Cursor-follow glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 194, 224, 0.25), transparent)`,
        }}
      />
    </motion.div>
  );
}
