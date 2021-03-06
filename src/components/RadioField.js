import React from "react";

export const RadioField = ({ label, fieldProps, fieldName, ...props }) => {
  const isError = props.touched && props.errors[props.name];
  return (
    <div className="radio text-field">
      <label id={fieldName} htmlFor={fieldName}>
        {fieldProps.title}
      </label>
      <div
        className="radio-options"
        role="group"
        aria-labelledby={`${fieldProps.title} multiple choice`}
      >
        {fieldProps.answers.map(
          (answer) =>
            answer && (
              <label key={answer}>
                <input
                  {...props}
                  onChange={props.handleChange}
                  value={answer}
                />
                <span>{answer}</span>
              </label>
            )
        )}
      </div>
      {isError ? (
        <div className="inline-error-message">{props.errors[props.name]}</div>
      ) : null}
    </div>
  );
};
