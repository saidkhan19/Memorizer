import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import styles from "./StageTest.module.scss";
import { StageContainer } from "../StageContainer/StageContainer";
import { ControlPanel } from "../StageContainer/ControlPanel";
import ResetIcon from "../../../assets/icons/reset.svg?react";

const text_variants = {
  visible: { opacity: 1 },
  invisible: {
    opacity: 0,
    userSelect: "none",
    cursor: "pointer",
  },
  incorrect: {
    opacity: 1,
    x: [0, -3, 3, 0],
    color: "#c32008",
    transition: {
      duration: 0.4,
    },
  },
};

const getTextVariant = (item) => {
  if (!item.visible) return "invisible";
  return item.correct ? "visible" : "incorrect";
};

export const StageTest = ({ animation, textManager }) => {
  const [testElements, setTestElements] = useState(
    textManager.splitIntoTestElements()
  );
  const [currentElement, setCurrentElement] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const input = useRef();

  const handleReset = () => {
    setTestElements(textManager.splitIntoTestElements());
    setIsFinished(false);
    setCurrentElement(0);
  };

  const setNextWord = () => {
    for (let i = currentElement + 1; i < testElements.length; i++) {
      if (testElements[i].isWord) {
        setCurrentElement(i);
        break;
      }
    }
  };

  const handleInputChange = () => {
    const value = input.current.value.toLowerCase();
    const testElement = testElements[currentElement];
    const answer = testElement.text.toLowerCase();

    if (answer.indexOf(value) === 0) {
      if (answer.length == value.length) {
        // User has completed typing the correct answer
        setTestElements((prevElements) =>
          prevElements.map((item, idx) =>
            idx === currentElement
              ? { ...item, visible: true, correct: true }
              : item
          )
        );
      } else return;
    } else {
      // User made a mistake
      setTestElements((prevElements) =>
        prevElements.map((item, idx) =>
          idx === currentElement
            ? { ...item, visible: true, correct: false }
            : item
        )
      );
    }

    setNextWord();
    const lastIdx = testElements.findLastIndex((item) => item.isWord);

    if (lastIdx <= currentElement) {
      setIsFinished(true);
      setCurrentElement(testElements.length);
    }
  };

  const errors = testElements.reduce(
    (count, item) => (item.correct ? count : count + 1),
    0
  );

  const computeScore = () => {
    const words = testElements.reduce(
      (count, item) => (item.isWord ? count + 1 : count),
      0
    );

    return (((words - errors) / words) * 100).toFixed(1);
  };

  const handleFocus = useCallback(() => {
    if (input.current) input.current.focus();
  }, []);

  useEffect(() => {
    handleFocus();
  }, [currentElement, handleFocus]);

  return (
    <StageContainer animation={animation}>
      <div
        className={`${styles.main} ${styles.text_content}`}
        onClick={handleFocus}
      >
        <p>
          {testElements.map((item, idx) => (
            <span key={idx} className={styles.word}>
              {item.isWord ? (
                <span className={styles.word__invisible}>
                  <motion.span
                    variants={text_variants}
                    animate={getTextVariant(item)}
                    transition={{ duration: 0.1 }}
                    style={{ display: "inline-block" }}
                  >
                    {item.text}
                  </motion.span>

                  {currentElement === idx && (
                    <input
                      type="text"
                      ref={input}
                      onChange={handleInputChange}
                    />
                  )}
                  <span className={styles.word__underline} />
                </span>
              ) : (
                <span>{item.text}</span>
              )}
            </span>
          ))}
        </p>
      </div>
      <ControlPanel className={styles.control_wrapper}>
        <p className={styles.results}>
          {isFinished ? (
            <>
              <span className={styles.score_text}>Accuracy</span>
              <span className={styles.score_value}>{computeScore()}%</span>
            </>
          ) : (
            <>
              <span className={styles.score_text}>Errors</span>
              <span
                className={`${styles.score_value} ${
                  errors > 0 ? styles["score_value--low"] : ""
                }`}
              >
                {errors}
              </span>
            </>
          )}
        </p>
        <button
          title="Reset"
          className={styles.icon_button}
          onClick={handleReset}
        >
          <ResetIcon />
          <span className="sr-only">Reset</span>
        </button>
      </ControlPanel>
    </StageContainer>
  );
};
