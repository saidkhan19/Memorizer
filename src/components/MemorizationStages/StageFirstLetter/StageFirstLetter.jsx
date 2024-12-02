import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import styles from "./StageFirstLetter.module.scss";
import { StageContainer } from "../StageContainer/StageContainer";

export const StageFirstLetter = ({ animation, textManager }) => {
  const textElements = useRef(textManager.splitIntoFirstLetterStageWords());
  const [temporaryVisible, setTemporaryVisible] = useState(null);

  useEffect(() => {
    if (temporaryVisible === null) return;

    const timeoutId = setTimeout(() => setTemporaryVisible(null), 2000);

    return () => clearTimeout(timeoutId);
  }, [temporaryVisible]);

  return (
    <StageContainer animation={animation}>
      <div className={`${styles.main} ${styles.text_content}`}>
        <p>
          {textElements.current.map((item, idx) => (
            <span key={idx} className={styles.word}>
              {item.isWord ? (
                <>
                  <span>{item.firstLetter}</span>
                  <span className={styles.word__invisible}>
                    <motion.span
                      variants={{
                        visible: { opacity: 1 },
                        invisible: {
                          opacity: 0,
                          userSelect: "none",
                          cursor: "pointer",
                        },
                      }}
                      animate={
                        temporaryVisible !== idx ? "invisible" : "visible"
                      }
                      transition={{ duration: 0.1 }}
                      onClick={() => setTemporaryVisible(idx)}
                    >
                      {item.otherLetters}
                    </motion.span>

                    <span className={styles.word__underline} />
                  </span>
                </>
              ) : (
                <span>{item.text}</span>
              )}
            </span>
          ))}
        </p>
      </div>
    </StageContainer>
  );
};
