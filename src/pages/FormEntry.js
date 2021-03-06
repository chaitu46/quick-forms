import React, { useRef } from "react";
import { GoPlus } from "react-icons/go";
import FieldComponent from "../components/FieldComponent";
import FormEntryHeader from "../components/FormEntryHeader";
import { useFormEntryContext } from "../contexts/FormEntryContext";
import { getInitialFieldValues } from "../helper";
import { IoChevronBackOutline } from "react-icons/io5";
import { BiCopyAlt } from "react-icons/bi";

export default function FormEntry({ history, match }) {
  const {
    formId,
    formValues,
    handleFormTouch,
    updateFormValues,
    updateFieldValues,
    addFieldValues,
    deleteFieldValues,
  } = useFormEntryContext();
  console.log("formId", formId);
  const shareURLRef = useRef(null);
  console.log("formValues", formValues);
  const { fields } = formValues;
  const shareURL = `${window.location.origin}/form/${formValues.id}`;

  return (
    <main className="container container--page">
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
            showDelete={index !== 0}
          />
        );
      })}
      <div className="new-field-button-container">
        <button
          className="button button--new-field"
          onClick={() => addFieldValues(getInitialFieldValues())}
        >
          <GoPlus size="50px" />
        </button>
      </div>
      <div className="form-entry-footer">
        <button
          className="button"
          onClick={() => {
            handleFormTouch();
          }}
        >
          Create Form
        </button>
        {formId ? (
          <div className="form-entry-share">
            <label>Share</label>
            <div className="copy-text">
              <button
                className="button button--copy"
                onClick={() => {
                  shareURLRef.current.focus();
                  shareURLRef.current.setSelectionRange(
                    0,
                    shareURLRef.current.value.length
                  );
                  document.execCommand("copy");
                }}
              >
                <BiCopyAlt />
              </button>
              <input type="text" ref={shareURLRef} value={shareURL} readOnly />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
