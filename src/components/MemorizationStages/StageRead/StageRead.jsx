import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./StageRead.module.scss";
import { StageContainer } from "../StageContainer/StageContainer";
import { ControlPanel } from "../StageContainer/ControlPanel";
import ResetIcon from "../../../assets/icons/reset.svg?react";
import NextIcon from "../../../assets/icons/arrow-next.svg?react";
import PrevIcon from "../../../assets/icons/arrow-previous.svg?react";

export const StageRead = ({ animation, textManager }) => {
  const textContent = useRef(textManager.splitIntoPhrases());
  const textContainer = useRef();
  const [visibleCount, setVisibleCount] = useState(0);

  const visibleText = textContent.current.slice(0, visibleCount);

  const handlePrevious = useCallback(() => {
    setVisibleCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  }, []);
  const handleNext = useCallback(() => {
    setVisibleCount((prevCount) =>
      prevCount < textContent.current.length ? prevCount + 1 : prevCount
    );
  }, []);

  const handleReset = () => {
    setVisibleCount(0);
  };

  useEffect(() => {
    textContainer.current.scrollTo(0, textContainer.current.scrollHeight);
  }, [visibleCount]);

  useEffect(() => {
    const handleArrowLeft = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      }
    };

    const handleArrowRight = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    };

    document.addEventListener("keydown", handleArrowLeft);
    document.addEventListener("keydown", handleArrowRight);

    return () => {
      document.removeEventListener("keydown", handleArrowLeft);
      document.removeEventListener("keydown", handleArrowRight);
    };
  }, [handlePrevious, handleNext]);

  return (
    <StageContainer animation={animation}>
      <div
        className={`${styles.main} ${styles.text_content}`}
        ref={textContainer}
      >
        <p>
          <AnimatePresence mode="wait">
            {visibleText.length > 0 ? (
              <AnimatePresence>
                {visibleText.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </AnimatePresence>
            ) : (
              <motion.span
                key="fallback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.fallback_text}
              >
                Use arrows to reveal/hide the text.
              </motion.span>
            )}
          </AnimatePresence>
        </p>
      </div>
      <ControlPanel className={styles.control_wrapper}>
        <div className={styles.left_wrapper}>
          <button
            title="Previous"
            className={styles.icon_button}
            onClick={handlePrevious}
            disabled={visibleCount <= 0}
          >
            <PrevIcon />
            <span className="sr-only">Previous</span>
          </button>
        </div>
        <div className={styles.divider} />
        <div className={styles.right_wrapper}>
          <button
            title="Next"
            className={styles.icon_button}
            onClick={handleNext}
            disabled={visibleCount >= textContent.current.length}
          >
            <NextIcon />
            <span className="sr-only">Next</span>
          </button>
          <button
            title="Reset"
            className={styles.icon_button}
            onClick={handleReset}
          >
            <ResetIcon />
            <span className="sr-only">Reset</span>
          </button>
        </div>
      </ControlPanel>
    </StageContainer>
  );
};
