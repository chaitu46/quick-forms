import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";

const initialFieldValues = {
  id: uuidv4(),
  title: "Untitled Question",
  name: "input",
  type: "text",
  answers: [],
  required: false,
  placeholder: "Test box answer",
};

const initialState = {
  id: uuidv4(),
  title: "Untitled Form",
  description: "",
  fields: [initialFieldValues],
};

const FormEntryContext = React.createContext();

export function useFormEntryContext() {
  return useContext(FormEntryContext);
}

const updateForm = (formId, formValues) =>
  db.collection("forms").doc(formId).update(formValues);

const createForm = (form) => db.collection("forms").doc(form.id).set(form);

const getFormDetails = (formId, setFormValues, setLoading) =>
  db
    .collection("forms")
    .doc(formId)
    .onSnapshot((snap) => {
      const data = snap.data();
      console.log("formValues", data);
      setFormValues(data);
      setLoading(false);
    });

function getFormDetailsById() {
  // return auth.signOut();
}

const FormEntryContextApi = {
  useFormEntryContext,
  updateForm,
  getFormDetailsById,
};

export function FormEntryProvider({ children }) {
  const params = useParams();
  const { user } = useAuth();
  const [formId, setFormId] = useState(params.formId);
  const [formValues, setFormValues] = useState({ fields: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("formId", formId);
    if (formId) {
      getFormDetails(formId, setFormValues, setLoading);
    } else {
      setFormValues(initialState);
    }
  }, [formId, params.formId]);

  const handleFormTouch = async () => {
    if (!formId) {
      const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
      const form = { ...formValues, timeStamp, owner: user.uid };
      await createForm(form);
      setFormId(form.id);
    } else {
      updateForm(formId, formValues);
    }
    console.log("formValues", formValues);
  };
  const updateFormValues = (value) => {
    setFormValues((state) => ({ ...state, ...value }));
  };
  const updateFieldValues = (fieldValues) => {
    const { fields } = formValues;
    const newFields = fields.map((field) => {
      if (field.id === fieldValues.id) {
        return fieldValues;
      }
      return field;
    });
    setFormValues((state) => ({ ...state, fields: newFields }));
  };
  const addFieldValues = (fieldValues) => {
    setFormValues((state) => ({
      ...state,
      fields: [...state.fields, fieldValues],
    }));
    handleFormTouch();
  };
  return (
    <FormEntryContext.Provider
      value={{
        formValues,
        formId,
        loading,
        handleFormTouch,
        updateFormValues,
        updateFieldValues,
        addFieldValues,
        ...FormEntryContextApi,
      }}
    >
      {children}
    </FormEntryContext.Provider>
  );
}
