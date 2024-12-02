import React from "react";
import { MainSection } from "../../components/homepage/MainSection/MainSection";
import { InfoSection } from "../../components/homepage/InfoSection/InfoSection";

import styles from "./Homepage.module.scss";

export const Homepage = (props) => {
  return (
    <div className={styles.container}>
      <MainSection {...props} />
      <InfoSection />
    </div>
  );
};
