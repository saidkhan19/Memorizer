import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import styles from "./Modal.module.scss";

const Modal = ({ title, children, onClose }) => {
  return createPortal(
    <>
      <motion.div
        className={styles.backdrop}
        onClick={onClose}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      />
      <motion.dialog
        variants={{
          hidden: {
            opacity: 0,
            y: 35,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className={styles.modal}
      >
        <h2 className={styles.title}>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
