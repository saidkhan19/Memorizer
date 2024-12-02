import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./MainSection.module.scss";
import PlusIcon from "../../../assets/icons/plus.svg?react";
import DocumentIcon from "../../../assets/icons/text-document.svg?react";
import { Card } from "../../Card/Card";
import { AddText } from "../../AddText/AddText";

export const MainSection = ({ data, setData, setPage }) => {
  const [isAddingText, setIsAddingText] = useState(false);
  const [newlyAddedText, setNewlyAddedText] = useState();

  const onAddText = (newTextId) => {
    setNewlyAddedText(newTextId);
  };

  return (
    <>
      <AnimatePresence>
        {isAddingText && (
          <AddText
            data={data}
            setData={setData}
            onAddText={onAddText}
            onClose={() => setIsAddingText(false)}
          />
        )}
      </AnimatePresence>
      <div className={styles.container}>
        <div className={styles.top_panel}>
          <h2>{data.length > 0 ? "Select text" : "No text found"}</h2>
          <button
            className={styles.top_panel__button}
            onClick={() => setIsAddingText(true)}
          >
            <PlusIcon />
            <span>Add text</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {data.length > 0 && (
            <motion.ul key="list" exit={{ x: -100, opacity: 0 }}>
              <AnimatePresence>
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className={styles.mt}
                    itemData={item}
                    setData={setData}
                    setPage={setPage}
                    runAnimation={newlyAddedText === item.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          {data.length === 0 && (
            <motion.div
              key="fallback"
              className={styles.fallback}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DocumentIcon />
              <p>Add a text you want to memorize</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
