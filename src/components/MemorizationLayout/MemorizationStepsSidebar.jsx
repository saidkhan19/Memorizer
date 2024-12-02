import React, { useEffect, useRef } from "react";

import styles from "./MemorizationLayout.module.scss";
import BookIcon from "../../assets/icons/book.svg?react";
import SliderIcon from "../../assets/icons/slider.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";
import LetterIcon from "../../assets/icons/letter.svg?react";
import TestIcon from "../../assets/icons/test.svg?react";
import BackwardIcon from "../../assets/icons/double-arrow-left.svg?react";
import ForwardIcon from "../../assets/icons/double-arrow-right.svg?react";
import { ProgressStep } from "./ProgressStep";
import { NUMBER_OF_STAGES } from "../../shared/constants";

const stepData = [
  {
    stage: 1,
    title: "Stage 1",
    description: "Read and absorb the text.",
    icon: BookIcon,
  },
  {
    stage: 2,
    title: "Stage 2",
    description: "Adjust the slider to control how much of the text fades out.",
    icon: SliderIcon,
  },
  {
    stage: 3,
    title: "Stage 3",
    description: "Rearrange the text in the right order.",
    icon: SortIcon,
  },
  {
    stage: 4,
    title: "Stage 4",
    description: "Recall with first-letter hints.",
    icon: LetterIcon,
  },
  {
    stage: 5,
    title: "Test yourself",
    description: "Type the text from memory.",
    icon: TestIcon,
  },
];

export const MemorizationStepsSidebar = ({ stage, setStage }) => {
  const currentStage = useRef(stage);
  const steps = useRef([]);

  useEffect(() => {
    if (currentStage.current === stage) return;

    let i = currentStage.current;
    currentStage.current = stage;

    const startAnimate = function () {
      while (i >= 1 && i < stage) {
        steps.current[i - 1].animateFront();
        i++;
      }
      while (i <= NUMBER_OF_STAGES && i > stage) {
        steps.current[i - 1].animateBack();
        i--;
      }

      steps.current[stage - 1].animateFocus();
    };

    startAnimate();

    // Not needed to complete animations, since they are already in sync
    // const stopAnimate = () => {
    //   for (let step of steps.current) {
    //     if (step) step.completeAnimations();
    //   }
    // };

    // return stopAnimate;
  }, [stage]);

  const getInitialState = (itemStage) => {
    if (itemStage === currentStage.current) return "focused";
    if (itemStage < currentStage.current) return "active";
    return "rest";
  };

  return (
    <div className={styles.sidebar}>
      <ol>
        {stepData.map((item, idx) => (
          <ProgressStep
            key={item.stage}
            {...item}
            addLine={item.stage < stepData.length}
            initial={getInitialState(item.stage)}
            ref={(el) => (steps.current[idx] = el)}
            setStage={setStage}
          />
        ))}
      </ol>
      <div>
        <div className={styles.sidebar__button_group}>
          <button onClick={() => setStage(stage - 1)}>
            <BackwardIcon />
            <span className="sr-only">Previous stage</span>
          </button>
          <button onClick={() => setStage(stage + 1)}>
            <ForwardIcon />
            <span className="sr-only">Next stage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
