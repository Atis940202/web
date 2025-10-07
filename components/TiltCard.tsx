"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  PropsWithChildren,
  useCallback,
  type PointerEvent,
  type KeyboardEventHandler
} from "react";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";
import clsx from "clsx";

type TiltCardProps = PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  tabIndex?: number;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  role?: string;
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}>;

const MAX_TILT = 6;

export function TiltCard({
  children,
  className,
  as: Component = "div",
  tabIndex = 0,
  onClick,
  onKeyDown,
  role,
  ...props
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotionSafe();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spotlightX = useMotionValue("50%");
  const spotlightY = useMotionValue("50%");
  const shadowOpacity = useTransform(rotateX, [-MAX_TILT, MAX_TILT], [0.35, 0.75]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      rotateX.set(prefersReducedMotion ? 0 : percentY * -MAX_TILT);
      rotateY.set(prefersReducedMotion ? 0 : percentX * MAX_TILT);
      spotlightX.set(`${(x / rect.width) * 100}%`);
      spotlightY.set(`${(y / rect.height) * 100}%`);
    },
    [prefersReducedMotion, rotateX, rotateY, spotlightX, spotlightY]
  );

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    spotlightX.set("50%");
    spotlightY.set("50%");
  }, [rotateX, rotateY, spotlightX, spotlightY]);

  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      className={clsx(
        "relative rounded-xl bg-card/80 backdrop-blur shadow-e1 transition-shadow duration-[var(--base)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
        "hover:shadow-e2",
        className
      )}
      tabIndex={tabIndex}
      role={role}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        boxShadow: `0 25px 45px -20px rgba(15,23,42,${shadowOpacity.get()})`
      }}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${spotlightX.get()} ${spotlightY.get()}, rgba(56,189,248,0.28), transparent 55%)`
        }}
      />
      <div className="relative z-10">{children}</div>
    </MotionComponent>
  );
}
