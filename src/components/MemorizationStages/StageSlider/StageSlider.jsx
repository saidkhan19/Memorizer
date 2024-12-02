import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./StageSlider.module.scss";
import { StageContainer } from "../StageContainer/StageContainer";
import { ControlPanel } from "../StageContainer/ControlPanel";
import { Slider } from "../../UI/Slider/Slider";
import ResetIcon from "../../../assets/icons/reset.svg?react";

export const StageSlider = ({ animation, textManager }) => {
  const [sliderValue, setSliderValue] = useState(10);
  const [textElements, setTextElements] = useState(
    textManager.splitIntoSliderElements()
  );
  const [temporaryVisible, setTemporaryVisible] = useState(null);

  const isVisible = (item) => item.value <= sliderValue;

  const handleRandomize = () => {
    setTextElements(textManager.splitIntoSliderElements());
  };

  useEffect(() => {
    if (temporaryVisible === null) return;

    const timeoutId = setTimeout(() => setTemporaryVisible(null), 2000);

    return () => clearTimeout(timeoutId);
  }, [temporaryVisible]);

  return (
    <StageContainer animation={animation}>
      <div className={`${styles.main} ${styles.text_content}`}>
        <p>
          {textElements.map((item, idx) => (
            <span key={idx} className={styles.word}>
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
                  item.isWord && !isVisible(item) && temporaryVisible !== idx
                    ? "invisible"
                    : "visible"
                }
                transition={{ duration: 0.1 }}
                onClick={() => setTemporaryVisible(idx)}
              >
                {item.text}
              </motion.span>
              {item.isWord && !isVisible(item) && (
                <span className={styles.word__underline} />
              )}
            </span>
          ))}
        </p>
      </div>
      <ControlPanel className={styles.control_wrapper}>
        <Slider
          min={0}
          max={10}
          initialValue={sliderValue}
          id="word_slider"
          label="Words"
          onChange={(val) => setSliderValue(val)}
          className={styles.left_wrapper}
        />
        <div className={styles.right_wrapper}>
          <button
            title="Randomize"
            className={styles.icon_button}
            onClick={handleRandomize}
          >
            <ResetIcon />
            <span className="sr-only">Randomize</span>
          </button>
        </div>
      </ControlPanel>
    </StageContainer>
  );
};
