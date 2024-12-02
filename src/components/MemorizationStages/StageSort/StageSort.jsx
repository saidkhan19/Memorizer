import React, { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

import styles from "./StageSort.module.scss";
import { StageContainer } from "../StageContainer/StageContainer";
import { ControlPanel } from "../StageContainer/ControlPanel";
import DoneIcon from "../../../assets/icons/done.svg?react";
import ResetIcon from "../../../assets/icons/reset.svg?react";

export const StageSort = ({ animation, textManager }) => {
  const [sortElements, setSortElements] = useState(
    textManager.splitIntoSortElements()
  );
  const [isFinished, setIsFinished] = useState(false);

  const isWrongOrder = (item) => {
    const index = sortElements.findIndex(
      (element) => element.order === item.order
    );
    return index + 1 !== item.order;
  };

  const handleReset = () => {
    setSortElements(textManager.splitIntoSortElements());
    setIsFinished(false);
  };

  let score;
  if (isFinished) {
    let overall = sortElements.length;
    let correct = 0;
    for (let i = 0; i < overall; i++) {
      correct += i + 1 === sortElements[i].order ? 1 : 0;
    }

    score = (correct / overall) * 100;
  }

  return (
    <StageContainer animation={animation} className={styles.stage_container}>
      <div className={`${styles.main} ${styles.text_content}`}>
        <Reorder.Group
          values={sortElements}
          onReorder={isFinished ? () => {} : setSortElements}
          layoutScroll
        >
          {sortElements.map((item) => (
            <Reorder.Item
              key={item.order}
              value={item}
              className={`${styles.reorder_element} ${
                isFinished && isWrongOrder(item)
                  ? styles["reorder_element--wrong"]
                  : ""
              }`}
            >
              {item.text}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished && (
          <motion.button
            key="float_button"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0, transition: { duration: 0.2 } }}
            className={styles.float_icon_button}
            title="Done"
            onClick={() => setIsFinished(true)}
          >
            <DoneIcon />
            <span className="sr-only">Done</span>
          </motion.button>
        )}
        {isFinished && (
          <motion.div
            key="control_panel"
            initial={{ scale: 0.8, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{
              scale: 0.8,
              y: 10,
              opacity: 0,
              transition: { duration: 0.2 },
            }}
          >
            <ControlPanel className={styles.control_wrapper}>
              <p>
                <span className={styles.score_text}>Score </span>
                <span
                  className={`${styles.score_value} ${
                    score < 50
                      ? styles["score_value--low"]
                      : styles["score_value--high"]
                  }`}
                >
                  {score.toFixed(1)}%
                </span>
              </p>
              <button
                className={styles.icon_button}
                title="Reset"
                onClick={handleReset}
              >
                <ResetIcon />
                <span className="sr-only">Reset</span>
              </button>
            </ControlPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </StageContainer>
  );
};
