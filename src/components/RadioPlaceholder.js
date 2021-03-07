import React from "react";
import { BsCircle } from "react-icons/bs";

export default function RadioPlaceholder({
  fieldDetails,
  handleFormTouch,
  updateFieldValues,
}) {
  return fieldDetails.answers.map((value, index) => (
    <div className="field-options" key={`options${index}`}>
      <BsCircle />
      <input
        type="text"
        id={index}
        name="radioOption"
        value={value}
        onBlur={() => handleFormTouch()}
        placeholder={`${fieldDetails.placeholder} ${index + 1}`}
        onChange={(e) => {
          const newAnswers = [...fieldDetails.answers];
          console.log("newAnswers", newAnswers);
          newAnswers[index] = e.target.value;
          updateFieldValues({
            ...fieldDetails,
            answers: newAnswers,
          });
        }}
      />
    </div>
  ));
}
