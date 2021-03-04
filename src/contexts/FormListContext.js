import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const FormListContext = React.createContext();

export function useFormListContext() {
  return useContext(FormListContext);
}

const getRecentForms = async (user, setFormsList, setLoading) =>
  db
    .collection("forms")
    .where("owner", "==", user.uid)
    .onSnapshot((snap) => {
      setFormsList(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });

const deleteForm = async (formId) => {
  await db.collection("forms").doc(formId).delete();
};

const FormListContextApi = {
  useFormListContext,
  getRecentForms,
  deleteForm,
};

export function FormListProvider({ children }) {
  const { user } = useAuth();
  const [formsList, setFormsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentForms(user, setFormsList, setLoading);
  }, [user]);
  return (
    <FormListContext.Provider
      value={{ formsList, loading, ...FormListContextApi }}
    >
      {children}
    </FormListContext.Provider>
  );
}
