import React from "react";

import styles from "./StageContainer.module.scss";

export const ControlPanel = ({ className, children }) => {
  return (
    <div className={`${styles.control_panel} ${className}`}>{children}</div>
  );
};
