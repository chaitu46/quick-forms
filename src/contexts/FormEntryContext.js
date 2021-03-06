import React, { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import firebase from "firebase";
import { useAuth } from "./AuthContext";
import { getInitialFormValues } from "../helper";
import { useSnackbar } from "notistack";

const FormEntryContext = React.createContext();

export function useFormEntryContext() {
  return useContext(FormEntryContext);
}

const updateForm = async (formId, formValues, enqueueSnackbar) => {
  await db.collection("forms").doc(formId).update(formValues);
  enqueueSnackbar("Form update successful.", {
    variant: "success",
  });
};

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
  const { enqueueSnackbar } = useSnackbar();
  const [formId, setFormId] = useState(params.formId);
  const [formValues, setFormValues] = useState({ fields: [] });
  const [loading, setLoading] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);

  useEffect(() => {
    console.log("formId", formId);
    if (formId) {
      getFormDetails(formId, setFormValues, setLoading);
    } else {
      setFormValues(getInitialFormValues());
    }
  }, [formId, params.formId]);

  const handleFormTouch = async () => {
    if (!formId) {
      const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
      const form = { ...formValues, timeStamp, owner: user.uid };
      await createForm(form);
      enqueueSnackbar("Form creation successful.", {
        variant: "success",
      });
      setFormId(form.id);
    } else {
      updateForm(formId, formValues, enqueueSnackbar);
    }
    console.log("formValues", formValues);
  };
  useEffect(() => {
    if (formId && autoUpdate) {
      updateForm(formId, formValues, enqueueSnackbar);
      setAutoUpdate(false);
    }
  }, [autoUpdate, formValues, formId, enqueueSnackbar]);
  const updateFormValues = (value) => {
    setFormValues((state) => ({ ...state, ...value }));
  };
  const updateFieldValues = (fieldValues, isQuickUpdate) => {
    console.log("fieldValues", fieldValues);
    const { fields } = formValues;
    const newFields = fields.map((field) => {
      if (field.id === fieldValues.id) {
        return fieldValues;
      }
      return field;
    });
    console.log("newFields", newFields);
    setFormValues((state) => ({ ...state, fields: newFields }));
    if (isQuickUpdate) {
      setAutoUpdate(true);
    }
  };
  const addFieldValues = (fieldValues) => {
    setFormValues((state) => ({
      ...state,
      fields: [...state.fields, fieldValues],
    }));
    setAutoUpdate(true);
  };
  const deleteFieldValues = (id) => {
    setFormValues((state) => ({
      ...state,
      fields: state.fields.filter((field) => field.id !== id),
    }));
    setAutoUpdate(true);
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
        deleteFieldValues,
        ...FormEntryContextApi,
      }}
    >
      {children}
    </FormEntryContext.Provider>
  );
}
