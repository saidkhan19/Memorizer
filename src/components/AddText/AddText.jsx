import React from "react";

import { UpdateText } from "../UpdateText/UpdateText";

export const AddText = ({ data, setData, onAddText, onClose }) => {
  const onSave = (title, text) => {
    const ids = data.map((item) => item.id);
    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    const newText = {
      id: newId,
      title: title.length ? title : null,
      text,
      stopwatch: 0,
      stage: 0,
    };

    setData((prevData) => [...prevData, newText]);
    onAddText(newId);
    onClose();
  };

  return <UpdateText title="Add new text" onSave={onSave} onCancel={onClose} />;
};
