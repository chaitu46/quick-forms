import React from "react";

export default function TextPlaceHolder({
  fieldDetails,
  handleFormTouch,
  updateFieldValues,
}) {
  return (
    <input
      type="text"
      id={fieldDetails.id}
      name={`${fieldDetails.name}`}
      value={fieldDetails.answers[0]}
      onBlur={() => handleFormTouch()}
      placeholder={fieldDetails.placeholder}
      onChange={(e) =>
        updateFieldValues({ ...fieldDetails, answers: [e.target.value] })
      }
    />
  );
}
