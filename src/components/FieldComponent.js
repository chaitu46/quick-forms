import React from "react";
import { BsCircle } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import EditableTitle from "./EditableTitle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function FieldComponent({
  fieldDetails,
  handleFormTouch,
  updateFieldValues,
  deleteFieldValues,
  showDelete,
}) {
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
        <select
          name="inputTypes"
          className="float-right"
          value={fieldDetails.type}
          onChange={(e) => {
            // e.stopPropagation();
            updateFieldValues(
              {
                ...fieldDetails,
                type: e.target.value,
                answers: e.target.value === "radio" ? ["", "", ""] : [""],
                placeholder:
                  e.target.value === "radio" ? "Answer" : "Text input",
              },
              true
            );
          }}
        >
          <option value="text">Text</option>
          <option value="radio">Multiple Choice</option>
        </select>
      </div>
      {fieldDetails.type === "text" && (
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
      )}
      {fieldDetails.type === "radio" &&
        fieldDetails.answers.map((value, index) => (
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
        ))}
      <div className="field-corner">
        {showDelete && (
          <button
            className="button button--link"
            onClick={() => deleteFieldValues(fieldDetails.id)}
          >
            <RiDeleteBinLine size="30px" />
          </button>
        )}
        <FormControlLabel
          control={
            <Switch
              checked={fieldDetails.required}
              color="primary"
              onChange={() =>
                updateFieldValues(
                  {
                    ...fieldDetails,
                    required: !fieldDetails.required,
                  },
                  true
                )
              }
              name="required"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          }
          label="Required"
        />
      </div>
    </section>
  );
  return null;
}
