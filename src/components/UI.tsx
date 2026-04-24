import { motion } from "motion/react";
import { cn } from "../lib/utils";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "border border-zinc-800 text-white hover:bg-zinc-900",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs font-bold",
    md: "h-11 px-8 py-3 text-sm font-bold",
    lg: "h-14 px-10 py-4 text-base font-bold",
    xl: "h-10 px-8 text-xs font-black uppercase tracking-[0.15em]",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md transition-all duration-200 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as any)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function InteractiveCard({
  children,
  className = "",
  delay = 0,
  withBorderBeam = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  withBorderBeam?: boolean;
  [key: string]: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative rounded-xl glass-card p-6 transition-all duration-300",
        withBorderBeam && "border-beam",
        className
      )}
      {...props}
    >
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
}
