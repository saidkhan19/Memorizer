import React from "react";
import { motion } from "framer-motion";

export const CircularProgress = ({ value, className }) => {
  const icon = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: value,
    },
  };
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={100}
      height={100}
      className={className}
    >
      <defs>
        <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--clr-progress-1)" />
          <stop offset="50%" stopColor="var(--clr-progress-2)" />
          <stop offset="100%" stopColor="var(--clr-progress-3)" />
          {/* <stop offset="0%" stopColor="#CE141E" />
            <stop offset="50%" stopColor="#670445" />
            <stop offset="100%" stopColor="#4f0635" /> */}
        </linearGradient>
      </defs>
      <path
        d="M 15 70 
          A 40 40 0 1 1 85 70"
        stroke="var(--clr-progress-background)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        style={{ transition: "stroke 0.5s" }}
      ></path>

      <motion.path
        d="M 15 70 
          A 40 40 0 1 1 85 70"
        stroke="url(#gradient)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          default: { duration: 1.3, ease: "easeInOut" },
          fill: { duration: 1.3, ease: [1, 0, 0.8, 1] },
        }}
      />
    </motion.svg>
  );
};
