import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./Card.module.scss";
import MenuIcon from "../../assets/icons/menu.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg?react";
import {
  NUMBER_OF_STAGES as OVERALL_NUMBER,
  SHORT_TEXT_CHARS,
  SHORT_TITLE_CHARS,
} from "../../shared/constants.js";

import { CircularProgress } from "../UI/CircularProgress/CircularProgress.jsx";
import { EditText } from "../EditText/EditText.jsx";
import { formatTime, truncateText } from "../../utils/string.js";
import { clamp } from "../../utils/index.js";

const NUMBER_OF_STAGES = clamp(OVERALL_NUMBER, 0, 4);

const menuVariant = {
  visible: {
    width: "fit-content",
    transition: { staggerChildren: 0.2 },
  },
  hidden: { width: 0 },
};

const listItemVariant = {
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
  },
  hidden: { opacity: 0, rotate: 50, scale: 1.1 },
};

export const Card = ({
  itemData,
  setData,
  setPage,
  runAnimation,
  className = "",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevOpen) => !prevOpen);
  };

  const handleEdit = () => {
    setIsEditingText(true);
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((item) => item.id !== itemData.id));
  };

  const handleOpen = () => {
    setPage({ name: "memorization", args: { textId: itemData.id } });
  };

  return (
    <>
      <AnimatePresence>
        {isEditingText && (
          <EditText
            item={itemData}
            setData={setData}
            onClose={() => setIsEditingText(false)}
          />
        )}
      </AnimatePresence>
      <motion.li
        className={`${styles.card} ${className}`}
        tabIndex="0"
        layout
        layoutId={itemData.id}
        variants={{
          initial: { x: -100, opacity: 0 },
          rest: { x: 0, opacity: 1 },
        }}
        whileHover="hover"
        whileFocus="hover"
        initial={runAnimation ? "initial" : "rest"}
        animate="rest"
        exit="initial"
        transition={{ duration: 0.3 }}
      >
        <div className={styles.card__main} onClick={handleOpen}>
          <div className={styles.card__content}>
            {itemData.title && (
              <>
                <p className={styles.card__title}>
                  {truncateText(itemData.title, SHORT_TITLE_CHARS)}
                </p>
                <p className={styles.card__text}>
                  {truncateText(itemData.text, SHORT_TEXT_CHARS)}
                </p>
              </>
            )}

            {!itemData.title && (
              <p className={styles.card__title}>
                {truncateText(itemData.text, SHORT_TEXT_CHARS)}
              </p>
            )}
          </div>
          <div className={styles.card__progress}>
            <CircularProgress
              value={itemData.stage / NUMBER_OF_STAGES}
              className={styles.card__progress_svg}
            />
            <p className={styles.card__progress_text}>
              {clamp(itemData.stage, 0, 4)}/{NUMBER_OF_STAGES}
            </p>
            <p className={styles.card__progress_label}>Stage</p>
          </div>
        </div>
        <div className={styles.card__bottom_panel}>
          <button
            className={styles.icon_button}
            title="Menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
            <span className="sr-only">Menu</span>
          </button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.menu
                className={styles.card__menu}
                variants={menuVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.li
                  variants={listItemVariant}
                  transition={{ type: "spring" }}
                >
                  <button
                    className={styles.card__menu_button}
                    title="Edit text"
                    onClick={handleEdit}
                  >
                    <EditIcon />
                    <span className="sr-only">Edit text</span>
                  </button>
                </motion.li>
                <motion.li
                  variants={listItemVariant}
                  transition={{ type: "spring" }}
                >
                  <button
                    className={styles.card__menu_button}
                    title="Delete text"
                    onClick={handleDelete}
                  >
                    <TrashIcon />
                    <span className="sr-only">Delete text</span>
                  </button>
                </motion.li>
              </motion.menu>
            )}
          </AnimatePresence>
          <div className={styles.card__chip}>
            {formatTime(itemData.stopwatch)}
          </div>

          <motion.p
            className={styles.card__action_text}
            variants={{
              initial: { x: 210, y: "-50%", opacity: 0.2 },
              hover: { x: 0, opacity: 1 },
              rest: { x: 210, y: "-50%", opacity: 0.2 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={handleOpen}
          >
            Let's start memorizing <ArrowRightIcon />
          </motion.p>
        </div>
      </motion.li>
    </>
  );
};
