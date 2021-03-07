import React, { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import firebase from "firebase";
import { useAuth } from "./AuthContext";
import { getInitialFormValues } from "../helper";
import { useSnackbar } from "notistack";
import { v4 as uuid4 } from "uuid";

const FormEntryContext = React.createContext();

const sessionUID = uuid4();

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
      setFormValues(data);
      setLoading(false);
    });

const FormEntryContextApi = {
  useFormEntryContext,
  updateForm,
};

export function FormEntryProvider({ children }) {
  const params = useParams();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [formId, setFormId] = useState(params.formId);
  const [formValues, setFormValues] = useState({ fields: [] });
  const [loading, setLoading] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);

  const [urls, setUrls] = useState({});
  const [sessionId, setSessionId] = useState(sessionUID);
  const [error, setError] = useState("");

  useEffect(() => {
    const urls = {};
    if (formId) {
      urls.shareURL = `${window.location.origin}/form/${formId}`;
      if (!user) {
        setSessionId(sessionUID);
        urls.answersURL = `${window.location.origin}/guest/form-answers/${formId}?session=${sessionId}`;
        urls.maintainURL = `${window.location.origin}/guest/form-entry/${formId}?session=${sessionId}`;
      }
      setUrls(urls);
    }
  }, [user, formId, sessionId]);

  useEffect(() => {
    if (user && formValues.owner && user.uid !== formValues.owner) {
      setError("Sorry, you don't have access to this form.");
    }
  }, [user, formValues]);

  useEffect(() => {
    if (formId) {
      getFormDetails(formId, setFormValues, setLoading);
    } else {
      setFormValues(getInitialFormValues());
      setLoading(false);
    }
  }, [formId, params.formId]);

  const handleFormTouch = useCallback(async () => {
    if (!formId) {
      const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
      const form = {
        ...formValues,
        timeStamp,
        owner: user ? user.uid : sessionId,
        isGuest: user ? false : true,
      };
      await createForm(form);
      enqueueSnackbar("Form creation successful.", {
        variant: "success",
      });
      setFormId(form.id);
    } else {
      updateForm(formId, formValues, enqueueSnackbar);
    }
  }, [enqueueSnackbar, formId, formValues, sessionId, user]);

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
    const { fields } = formValues;
    const newFields = fields.map((field) => {
      if (field.id === fieldValues.id) {
        return fieldValues;
      }
      return field;
    });
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
        urls,
        error,
        ...FormEntryContextApi,
      }}
    >
      {children}
    </FormEntryContext.Provider>
  );
}
