import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Pointer-driven 3D tilt. Mouse only; touch and reduced-motion users get a static card.
export default function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), spring);

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div ref={ref} onPointerMove={move} onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={`h-full ${className}`}>
        {children}
      </motion.div>
    </div>
  );
}

// Lifts a child off the card surface when used inside <Tilt>.
export function Layer({ z, children, className = "" }: { z: number; children: ReactNode; className?: string }) {
  return <div style={{ transform: `translateZ(${z}px)` }} className={className}>{children}</div>;
}
