import React from "react";
import EditableTitle from "./EditableTitle";

export default function FieldComponent({
  fieldDetails,
  handleFormTouch,
  updateFieldValues,
}) {
  if (fieldDetails.type === "text") {
    return (
      <section className="container__box container__box--full-width">
        <div className="field-header">
          <EditableTitle
            title={fieldDetails.title}
            handleFormTouch={handleFormTouch}
            updateTitle={(title) =>
              updateFieldValues({ ...fieldDetails, title: title })
            }
            type="title"
          />
        </div>
        <input
          type="text"
          name={`${fieldDetails.name}${fieldDetails.id}`}
          value={fieldDetails.answers[0]}
          onBlur={() => handleFormTouch()}
          placeholder={fieldDetails.placeholder}
          onChange={(e) =>
            updateFieldValues({ ...fieldDetails, answers: [e.target.value] })
          }
        />
      </section>
    );
  }
  return null;
}
