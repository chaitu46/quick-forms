import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";

export default function EditableTitle({ title, handleFormTouch, updateTitle }) {
  const [isEditable, setEditable] = useState(false);
  const inputRef = useRef(null);
  const handleEditTitle = () => {
    setEditable(true);
    handleFormTouch();
  };
  const handleBlurTitle = (e) => {
    setEditable(false);
    handleFormTouch();
  };
  useEffect(() => {
    if (isEditable) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditable]);

  if (isEditable) {
    return (
      <input
        type="text"
        ref={inputRef}
        value={title}
        onBlur={handleBlurTitle}
        onChange={(e) => updateTitle(e.target.value)}
      />
    );
  }
  return (
    <div className="editable-title">
      <h2>{title}</h2>
      <button className="button button--icon" onClick={handleEditTitle}>
        <HiOutlinePencil color="black" size="20px" />
      </button>
    </div>
  );
}
