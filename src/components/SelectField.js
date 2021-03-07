import React from "react";

const getDefaultAnswers = (value) => {
  if (value === "radio") {
    return {
      answers: ["", "", ""],
      placeholder: "Answer",
    };
  }
  return {
    answers: [""],
    placeholder: "Text input",
  };
};

export default function SelectField({ fieldDetails, updateFieldValues }) {
  return (
    <select
      name="inputTypes"
      className="float-right"
      value={fieldDetails.type}
      onChange={(e) => {
        updateFieldValues(
          {
            ...fieldDetails,
            type: e.target.value,
            ...getDefaultAnswers(e.target.value),
          },
          true
        );
      }}
    >
      <option value="text">Text</option>
      <option value="radio">Multiple Choice</option>
    </select>
  );
}
