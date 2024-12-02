import React from "react";

import styles from "./InfoSection.module.scss";

export const InfoSection = () => {
  return (
    <div className={styles.container}>
      <h2>How-To</h2>
      <p className={styles["p-1"]}>
        <span className={styles.bold}>Add your text:</span>
        <br />
        Input what you want to memorize.
      </p>
      <p className={styles["p-2"]}>
        <span className={styles.bold}>Begin a session:</span>
        <br />
        Start your focused memorization journey.
      </p>
      <p className={styles["p-3"]}>
        <span className={styles.bold}>Progress through 4 stages:</span>
      </p>
      <ul className={styles.list}>
        <li>Read and absorb the text.</li>
        <li>Memorize as words gradually disappear.</li>
        <li>Rearrange the text in the right order.</li>
        <li>Recall with first-letter hints.</li>
      </ul>
      <p className={styles["p-4"]}>
        <span className={styles.bold}>Test yourself:</span> Confirm your
        memorization.
      </p>
    </div>
  );
};
