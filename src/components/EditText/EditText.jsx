import React from "react";

import { UpdateText } from "../UpdateText/UpdateText";

export const EditText = ({ item, setData, onClose }) => {
  const onSave = (title, text) => {
    const newText = {
      ...item,
      title: title.length ? title : null,
      text,
    };

    setData((prevData) =>
      prevData.map((el) => (el.id !== item.id ? el : newText))
    );
    onClose();
  };

  return (
    <UpdateText
      title="Edit text"
      textTitle={item.title}
      text={item.text}
      onSave={onSave}
      onCancel={onClose}
    />
  );
};
