import React from "react";

import EditableTitle from "./EditableTitle";

import SelectField from "./SelectField";
import TextPlaceHolder from "./TextPlaceHolder";
import RadioPlaceholder from "./RadioPlaceholder";
import FieldCornerControls from "./FieldCornerControls";

export default function FieldComponent({
  fieldDetails,
  handleFormTouch,
  updateFieldValues,
  deleteFieldValues,
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
        <SelectField
          fieldDetails={fieldDetails}
          updateFieldValues={updateFieldValues}
        />
      </div>
      {fieldDetails.type === "text" && (
        <TextPlaceHolder
          fieldDetails={fieldDetails}
          handleFormTouch={handleFormTouch}
          updateFieldValues={updateFieldValues}
        />
      )}
      {fieldDetails.type === "radio" && (
        <RadioPlaceholder
          fieldDetails={fieldDetails}
          handleFormTouch={handleFormTouch}
          updateFieldValues={updateFieldValues}
        />
      )}
      <FieldCornerControls
        deleteFieldValues={deleteFieldValues}
        fieldDetails={fieldDetails}
        updateFieldValues={updateFieldValues}
      />
    </section>
  );
}
