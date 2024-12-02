import React, { useEffect, useRef, useState } from "react";

import Modal from "../Modal/Modal";
import styles from "./UpdateText.module.scss";
import { AnimatedExclamation } from "../UI/AnimatedExclamation/AnimatedExclamation";

export const UpdateText = ({
  title,
  onSave,
  onCancel,
  textTitle = "",
  text = "",
}) => {
  const [error, setError] = useState(false);
  const form = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const title = data.get("title").trim();
    const text = data.get("text").trim();

    if (!text.length) {
      setError(true);
      return;
    }
    onSave(title, text);
  };

  useEffect(() => {
    const input = form.current.elements[0];
    const textarea = form.current.elements[1];

    input.focus();

    input.value = textTitle;
    textarea.value = text;
  }, []);

  return (
    <Modal title={title} onClose={onCancel}>
      <form ref={form} onSubmit={handleSubmit}>
        <p className={styles.input_group}>
          <label htmlFor="title">Title (Optional)</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className={styles.input_group}>
          <label htmlFor="text">
            Text
            {error && (
              <span className={styles.error_label}>
                <AnimatedExclamation /> Text content can't be empty
              </span>
            )}
          </label>
          <textarea name="text" id="text" />
        </p>
        <p className={styles.form_actions}>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button>Save</button>
        </p>
      </form>
    </Modal>
  );
};
