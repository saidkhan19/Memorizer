import React from "react";
import { useState, useEffect } from "react";

import styles from "./Slider.module.scss";
import { clamp } from "../../../utils";

const valueToPercent = (value, min, max) => {
  return ((value - min) * 100) / (max - min);
};

const percentToValue = (percent, min, max) => {
  return ((max - min) * percent) / 100 + min;
};

export const Slider = ({
  min,
  max,
  initialValue,
  onChange,
  id,
  label,
  className = "",
}) => {
  const [percent, setPercent] = React.useState(
    valueToPercent(initialValue, min, max)
  );
  const ref = React.useRef();

  useEffect(() => {
    const newValue = percentToValue(percent, min, max);
    onChange(newValue);
  }, [percent]);

  const onMove = (clientX) => {
    const { left, width } = ref.current.getBoundingClientRect();
    const x = clientX - left;
    let percent = (x / width) * 100;

    percent = clamp(percent, 0, 100);

    // Snap to integer value
    percent = valueToPercent(
      Math.round(percentToValue(percent, min, max)),
      min,
      max
    );

    setPercent(percent);
  };

  const onMouseMove = (event) => {
    onMove(event.clientX);
  };
  const onTouchMove = (event) => {
    if (event.touches.length > 0) {
      onMove(event.touches[0].clientX);
    }
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };
  const onTouchEnd = () => {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  const onMouseDown = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  const onTouchStart = () => {
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  };

  return (
    <div className={className}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div ref={ref} className={styles.slider}>
        <span className={styles.rail} />
        <span className={styles.track} style={{ width: `${percent}%` }} />
        <span
          className={styles.thumb}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={{ left: `${percent}%` }}
        />
      </div>
    </div>
  );
};
