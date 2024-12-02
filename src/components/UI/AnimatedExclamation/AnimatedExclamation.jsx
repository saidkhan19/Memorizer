import React from "react";
import { motion } from "framer-motion";

export const AnimatedExclamation = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="20px"
      height="20px"
    >
      <motion.path
        d="M50 27 v30 M50 65 v5"
        stroke="#FF4D4D"
        strokeWidth="5"
        initial={{ opacity: 0, strokeDashoffset: 50 }}
        animate={{ opacity: 1 }}
        fill="none"
        transition={{
          delay: 0.3,
          duration: 0.7,
          ease: "easeOut",
        }}
      />
      <motion.path
        d="M 50 90 A 40 40 0 1 0 49.9 90 Z"
        stroke="#FF4D4D"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
      />
      {/* <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke="#FF4D4D"
        strokeWidth="3"
        variants={icon}
        initial="hidden"
        animate="visible"
        fill="none"
        transition={{
          default: { duration: 0.5, ease: "easeInOut" },
        }}
      /> */}
    </motion.svg>
  );
};
