import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

function TextShimmerComponent({
  children,
  as: Component = "p",
  className = "",
  duration = 2,
  spread = 2,
  baseColor,
  shimmerColor,
  style = {}
}) {
  const dynamicSpread = useMemo(() => {
    return (children ? children.length : 10) * spread;
  }, [children, spread]);

  const MotionComponent = motion[Component] || motion.p;

  return (
    <MotionComponent
      className={cn("text-shimmer-anim", className)}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear"
      }}
      style={{
        display: "inline-block",
        backgroundSize: "250% 100%, auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundRepeat: "no-repeat, padding-box",
        backgroundImage: `linear-gradient(90deg, transparent calc(50% - ${dynamicSpread}px), ${shimmerColor || "currentColor"}, transparent calc(50% + ${dynamicSpread}px)), linear-gradient(${baseColor || "var(--color-text)"}, ${baseColor || "var(--color-text)"})`,
        ...style
      }}
    >
      {children}
    </MotionComponent>
  );
}

export const TextShimmer = React.memo(TextShimmerComponent);
