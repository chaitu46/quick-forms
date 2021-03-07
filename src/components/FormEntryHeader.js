import React from "react";
import EditableTitle from "./EditableTitle";

export default function FormEntryHeader({
  values,
  handleFormTouch,
  updateFormValues,
}) {
  return (
    <section className="container__box container__box--full-width">
      <EditableTitle
        title={values.title}
        handleFormTouch={handleFormTouch}
        updateTitle={(title) => updateFormValues({ title: title })}
        type="title"
      />
      <input
        type="text"
        name="description"
        value={values.description}
        onBlur={() => handleFormTouch()}
        placeholder="description"
        onChange={(e) => updateFormValues({ description: e.target.value })}
      />
    </section>
  );
}
