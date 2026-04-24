import React from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(var(--color-brand-navy) 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(var(--color-brand-cyan) 1.5px, transparent 1.5px)`,
          backgroundSize: "64px 64px",
          backgroundPosition: "16px 16px"
        }}
      />
    </div>
  );
}

export function LightBeam({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[60px] pointer-events-none z-1",
        "bg-[radial-gradient(circle,rgba(0,194,224,0.15)_0%,transparentBase_70%)]",
        className
      )}
    />
  );
}

export function AnimatedGradient({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden opacity-10 mx-auto", className)}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] h-[100%] w-[100%] rounded-full bg-gradient-to-br from-brand-cyan/20 to-transparent blur-[120px]"
      />
    </div>
  );
}

export function BeamPattern({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none opacity-10", className)}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C2E0" stopOpacity="0" />
            <stop offset="50%" stopColor="#00C2E0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00C2E0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="-20" y1="0" x2="120" y2="120"
          stroke="url(#beam-grad)"
          strokeWidth="0.5"
          animate={{ x: [0, 50, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className
      )}
    >
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className={cn(
            "animate-grid-shimmer h-[200vh] w-[200vw] -ml-[50vw] -mt-[50vh]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]",
            "[background-size:60px_60px]"
          )}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
}

export function Spotlight({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute -top-[20%] left-[10%] h-[1000px] w-[600px] rounded-full bg-white/5 blur-[120px] [transform:rotate(-15deg)]"
      />
      <div
        className="absolute top-[10%] right-[10%] h-[800px] w-[500px] rounded-full bg-white/5 blur-[100px] [transform:rotate(25deg)]"
      />
    </motion.div>
  );
}

export function FloatingDots({ count = 20, className }: { count?: number; className?: string }) {
  const dots = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      duration: Math.random() * 15 + 10,
      delay: -Math.random() * 20,
      moveX: (Math.random() - 0.5) * 150,
      moveY: (Math.random() - 0.5) * 150,
    }));
  }, [count]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-brand-cyan/30"
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.left,
            top: dot.top,
          }}
          animate={{
            x: [0, dot.moveX, 0],
            y: [0, dot.moveY, 0],
            opacity: [0.1, 0.4, 0.2],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

export function Particles({ count = 30 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [null, "-100vh"],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: -Math.random() * 20,
          }}
        />
      ))}
    </div>
  );
}
