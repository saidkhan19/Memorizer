import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "framer-motion";

import styles from "./MemorizationLayout.module.scss";

const circle_variants = {
  rest: {
    // 'transparent' is not supported, so this is a workaraund
    backgroundColor: "var(--clr-green-mint-transparent)",
    color: "var(--clr-ghost-25)",
    border: "1px solid var(--clr-ghost-25)",
  },
  active: {
    backgroundColor: "var(--clr-green-light)",
    color: "var(--clr-white)",
    border: "none",
  },
  focused: {
    backgroundColor: "var(--clr-green-mint)",
    color: "var(--clr-white)",
    border: "none",
  },
};

const circle_ring_variants = {
  rest: {
    scale: 1,
    border: "none",
  },
  active: {
    scale: 1,
    border: "none",
  },
  focused: {
    z: 1, // necessary to fix flickering in FireFox
    scale: 1.35,
    border: "1px solid var(--clr-green-light)",
  },
};

const line_variants = {
  rest: { height: "0%" },
  active: { height: "100%" },
  focused: { height: "0%" },
};

const circle_selector = `.${styles.indicator__circle}`;
const circle_ring_selector = `.${styles.indicator__circle_ring}`;
const line_selector = `.${styles.indicator__line_fill}`;

export const ProgressStep = forwardRef(
  ({ title, description, icon, addLine, initial }, ref) => {
    const [scope, animate] = useAnimate();
    const animationControls = useRef();

    useImperativeHandle(
      ref,
      () => {
        return {
          animateFront() {
            const sequence = [
              [
                circle_ring_selector,
                circle_ring_variants.active,
                { duration: 0.3 },
              ],
              [
                circle_selector,
                circle_variants.active,
                { at: 0, duration: 0.5 },
              ],
              [line_selector, line_variants.active, { at: 0 }],
            ];

            const animation = animate(sequence);
            animationControls.current = animation;
          },
          animateBack() {
            let sequence = [];

            if (addLine) sequence.push([line_selector, line_variants.rest]);
            sequence.push(
              [
                circle_ring_selector,
                circle_ring_variants.rest,
                { at: 0, duration: 0.3 },
              ],
              [circle_selector, circle_variants.rest]
            );

            const animation = animate(sequence);
            animationControls.current = animation;
          },
          animateFocus() {
            let sequence = [];

            if (addLine) sequence.push([line_selector, line_variants.focused]);
            sequence.push(
              [circle_selector, circle_variants.focused],
              [
                circle_ring_selector,
                circle_ring_variants.focused,
                { type: "spring", stiffness: 150 },
              ]
            );

            const animation = animate(sequence);
            animationControls.current = animation;
          },

          completeAnimations() {
            if (animationControls.current) animationControls.current.complete();
            animationControls.current = null;
          },
        };
      },
      [animate]
    );

    const Icon = icon;

    return (
      <li
        className={`${styles.step_container} ${
          addLine ? "" : styles["step_container--short"]
        }`}
      >
        <div className={styles.indicator} ref={scope}>
          <motion.div
            className={styles.indicator__circle}
            initial={circle_variants[initial]}
          >
            <Icon />
            <motion.div
              className={styles.indicator__circle_ring}
              initial={circle_ring_variants[initial]}
            />
          </motion.div>

          {addLine && (
            <div className={styles.indicator__line}>
              <motion.div
                className={styles.indicator__line_fill}
                initial={line_variants[initial]}
              />
            </div>
          )}
        </div>
        <div className={styles.step_content}>
          <p className={styles.progress_header}>{title}</p>
          <p className={styles.progress_description}>{description}</p>
        </div>
      </li>
    );
  }
);
