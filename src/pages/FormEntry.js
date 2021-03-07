import React from "react";

import FieldComponent from "../components/FieldComponent";
import FormEntryHeader from "../components/FormEntryHeader";
import { useFormEntryContext } from "../contexts/FormEntryContext";
import { IoChevronBackOutline } from "react-icons/io5";

import FormFieldNewButton from "../components/FormFieldNewButton";
import FormFieldsFooter from "../components/FormFieldsFooter";
import AlertMessage from "../components/AlertMessage";

export default function FormEntry({ history, match }) {
  const {
    formId,
    formValues = {},
    handleFormTouch,
    updateFormValues,
    updateFieldValues,
    addFieldValues,
    deleteFieldValues,
    urls,
    error,
  } = useFormEntryContext();
  const { fields = [] } = formValues;
  if (error) {
    return <AlertMessage message={error} type="error" />;
  }
  return (
    <>
      <button className="button button--link" onClick={() => history.push("/")}>
        <IoChevronBackOutline />
        Back
      </button>
      <FormEntryHeader
        values={formValues}
        handleFormTouch={handleFormTouch}
        updateFormValues={updateFormValues}
      />
      {fields.map((field, index) => {
        return (
          <FieldComponent
            key={field.id}
            fieldDetails={field}
            handleFormTouch={handleFormTouch}
            updateFieldValues={updateFieldValues}
            deleteFieldValues={deleteFieldValues}
          />
        );
      })}
      <FormFieldNewButton addFieldValues={addFieldValues} />
      <FormFieldsFooter
        urls={urls}
        formId={formId}
        handleFormTouch={handleFormTouch}
      />
    </>
  );
}
