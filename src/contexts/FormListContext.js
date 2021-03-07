import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    .orderBy("timeStamp", "desc")
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
  const location = useLocation();

  const [formsList, setFormsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchParams(searchParams);
  }, [location]);

  useEffect(() => {
    if (user || searchParams) {
      const currentUser = !user ? { uid: searchParams.get("session") } : user;
      getRecentForms(currentUser, setFormsList, setLoading);
    }
  }, [user, searchParams]);
  return (
    <FormListContext.Provider
      value={{ formsList, loading, ...FormListContextApi }}
    >
      {children}
    </FormListContext.Provider>
  );
}
