import React from "react";
import { GoPlus } from "react-icons/go";
import { getInitialFieldValues } from "../helper";

export default function FormFieldNewButton({ addFieldValues }) {
  return (
    <div className="new-field-button-container">
      <button
        title="Add new form field"
        className="button button--new-field"
        onClick={() => addFieldValues(getInitialFieldValues())}
      >
        <GoPlus size="50px" />
      </button>
    </div>
  );
}
