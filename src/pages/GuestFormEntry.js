import React from "react";
import FieldComponent from "../components/FieldComponent";
import FormEntryHeader from "../components/FormEntryHeader";
import FormFieldNewButton from "../components/FormFieldNewButton";
import FormFieldsFooter from "../components/FormFieldsFooter";
import { useFormEntryContext } from "../contexts/FormEntryContext";
import AlertMessage from "../components/AlertMessage";
import { LinearProgress } from "@material-ui/core";

export default function GuestFormEntry() {
  const {
    formId,
    formValues,
    handleFormTouch,
    updateFormValues,
    updateFieldValues,
    deleteFieldValues,
    addFieldValues,
    urls,
    loading,
    error,
  } = useFormEntryContext();

  const { fields = [] } = formValues;
  if (loading) {
    return <LinearProgress />;
  }
  console.log("error", error);
  if (error) {
    return <AlertMessage message={error} type="error" />;
  }
  return (
    <>
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
        isGuest
      />
    </>
  );
}
