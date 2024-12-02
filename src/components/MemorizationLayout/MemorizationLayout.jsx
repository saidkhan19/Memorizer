import React from "react";
import { motion } from "framer-motion";

import styles from "./MemorizationLayout.module.scss";
import { MemorizationStepsSidebar } from "./MemorizationStepsSidebar.jsx";
import { truncateText } from "../../utils/string.js";
import BackIcon from "../../assets/icons/arrow-back.svg?react";
import { Stopwatch } from "./Stopwatch.jsx";

export const MemorizationLayout = ({
  layoutId,
  textManager,
  setStage,
  setPage,
  children,
}) => {
  return (
    <motion.div className={styles.container} layoutId={layoutId}>
      <div className={styles.main}>
        <div className={styles.top_panel}>
          <button
            className={styles.icon_button}
            title="Go back"
            onClick={() => setPage({ name: "home" })}
          >
            <BackIcon />
            <span className="sr-only">Go back</span>
          </button>
          {textManager.title && (
            <h2 className={styles.top_panel__header}>
              {truncateText(textManager.title, 50)}
            </h2>
          )}
          <Stopwatch className={styles.right} start={textManager.stopwatch} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <MemorizationStepsSidebar stage={textManager.stage} setStage={setStage} />
    </motion.div>
  );
};
