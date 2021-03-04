import React from "react";
import { GoPlus } from "react-icons/go";
import FieldComponent from "../components/FieldComponent";
import FormEntryHeader from "../components/FormEntryHeader";
import { useFormEntryContext } from "../contexts/FormEntryContext";
import { v4 as uuidv4 } from "uuid";

const initialFieldValues = {
  title: "Untitled Question",
  name: "input",
  type: "text",
  answers: [],
  required: false,
  placeholder: "Test box answer",
};

export default function FormEntry({ history, match }) {
  const {
    formValues,
    handleFormTouch,
    updateFormValues,
    updateFieldValues,
    addFieldValues,
  } = useFormEntryContext();
  const { fields } = formValues;
  return (
    <main className="container container--page">
      {/* <div> */}
      <FormEntryHeader
        values={formValues}
        handleFormTouch={handleFormTouch}
        updateFormValues={updateFormValues}
      />
      {/* <select name="inputTypes">
          <option value="text"></option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div> */}
      {fields.map((field) => {
        return (
          <FieldComponent
            key={field.id}
            fieldDetails={field}
            handleFormTouch={handleFormTouch}
            updateFieldValues={updateFieldValues}
          />
        );
      })}
      <button
        onClick={() => addFieldValues({ ...initialFieldValues, id: uuidv4() })}
      >
        <GoPlus size="50px" />
      </button>
      <button onClick={() => handleFormTouch()}>Create Form</button>
      <button onClick={() => history.push("/")}>Cancel</button>
    </main>
  );
}
