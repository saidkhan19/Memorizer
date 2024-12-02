import React, { useEffect, useRef, useState } from "react";

import styles from "./MemorizationLayout.module.scss";
import { formatTime } from "../../utils/string";

export const Stopwatch = ({ className, start }) => {
  const [time, setTime] = useState(start);
  const initTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(start + Date.now() - initTime.current);
    }, 100);

    return () => clearInterval(interval);
  }, [start]);

  return <p className={`${styles.chip} ${className}`}>{formatTime(time)}</p>;
};
