import React from "react";
import { motion } from "framer-motion";

import styles from "./StageContainer.module.scss";

export const StageContainer = ({ animation, className = "", children }) => {
  return (
    <motion.div
      className={`${styles.container} ${className}`}
      variants={{
        rest: { opacity: 1, y: 0 },
        fromTop: { opacity: 0, y: -25 },
        fromBottom: { opacity: 0, y: 25 },
      }}
      initial={animation}
      animate="rest"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
