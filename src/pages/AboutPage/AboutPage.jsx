import React from "react";

import BackIcon from "../../assets/icons/arrow-back.svg?react";
import styles from "./AboutPage.module.scss";

export const AboutPage = ({ setPage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top_panel}>
        <button
          className={styles.icon_button}
          title="Go back"
          onClick={() => setPage({ name: "home" })}
        >
          <BackIcon />
          <span className="sr-only">Go back</span>
        </button>
      </div>
      <p>
        Memorizer Application was built by{" "}
        <a href="https://github.com/saidkhan19" target="_blank">
          Sayid
        </a>
        <br />
        Repository{" "}
        <a href="https://github.com/saidkhan19/Memorizer" target="_blank">
          here
        </a>
        . Inspired by{" "}
        <a href="https://memorizebyheart.app/" target="_blank">
          this app
        </a>
        .
      </p>
    </div>
  );
};
