import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { MemorizationLayout } from "../../components/MemorizationLayout/MemorizationLayout.jsx";
import { StageRead } from "../../components/MemorizationStages/StageRead/StageRead.jsx";
import { StageSlider } from "../../components/MemorizationStages/StageSlider/StageSlider.jsx";
import { StageSort } from "../../components/MemorizationStages/StageSort/StageSort.jsx";
import { StageFirstLetter } from "../../components/MemorizationStages/StageFirstLetter/StageFirstLetter.jsx";
import { StageTest } from "../../components/MemorizationStages/StageTest/StageTest.jsx";
import TextManager from "../../models/TextManager.js";
import { NUMBER_OF_STAGES } from "../../shared/constants.js";

export const MemorizationPage = ({ data, setData, textId, setPage }) => {
  const itemData = data.find((item) => item.id === textId);

  const prevStage = useRef(itemData.stage);
  const textManager = new TextManager(itemData);
  const currentStage = textManager.stage;

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      // Update stopwatch when memorization page closes
      setData((prevData) =>
        prevData.map((item) =>
          item.id === textId
            ? { ...item, stopwatch: item.stopwatch + Date.now() - startTime }
            : item
        )
      );
    };
  }, []);

  const setStage = (newStage) => {
    if (newStage < 1 || newStage > NUMBER_OF_STAGES) return;
    setData((prevData) =>
      prevData.map((item) =>
        item.id === textId ? { ...item, stage: newStage } : item
      )
    );
  };

  // When page opens for the first time, set stage to one right away
  useEffect(() => {
    if (currentStage === 0) setStage(1);

    prevStage.current = currentStage;
  }, [currentStage]);

  let Stage = StageRead;
  switch (currentStage) {
    case 1:
      Stage = StageRead;
      break;
    case 2:
      Stage = StageSlider;
      break;
    case 3:
      Stage = StageSort;
      break;
    case 4:
      Stage = StageFirstLetter;
      break;
    case 5:
      Stage = StageTest;
      break;
  }

  const getAnimation = () => {
    if (prevStage.current < currentStage) return "fromBottom";
    if (prevStage.current > currentStage) return "fromTop";
    return "rest";
  };

  return (
    <MemorizationLayout
      layoutId={textId}
      textManager={textManager}
      setStage={setStage}
      setPage={setPage}
    >
      <AnimatePresence mode="wait">
        <Stage
          key={currentStage}
          animation={getAnimation()}
          textManager={textManager}
        />
      </AnimatePresence>
    </MemorizationLayout>
  );
};
