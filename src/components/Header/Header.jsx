import React from "react";
import { motion } from "framer-motion";

import styles from "./Header.module.scss";
import LogoImage from "../../assets/Memorizer.svg?react";
import SunIcon from "../../assets/icons/sun.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";

export const Header = ({ theme, onThemeChange, setPage }) => {
  const nextThemeMessage = `Change theme to ${
    theme === "light" ? "dark" : "light"
  }`;

  return (
    <div className={styles.header}>
      <LogoImage onClick={() => setPage({ name: "home" })} />
      <menu className={styles.header__menu}>
        <li>
          <button
            className={styles.header__menu_button}
            onClick={() => setPage({ name: "about" })}
          >
            About
          </button>
        </li>
        <li>
          <button
            className={styles.header__menu_button}
            onClick={onThemeChange}
            title={nextThemeMessage}
          >
            <motion.div
              key={theme}
              transition={{
                type: "spring",
                damping: 6,
                stiffness: 150,
              }}
              initial={{ opacity: 0.3, rotate: 60, scale: 1.3 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              className={styles.image_button}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </motion.div>
            <span className="sr-only">{nextThemeMessage}</span>
          </button>
        </li>
      </menu>
    </div>
  );
};
