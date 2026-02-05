"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: "easeOut",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
