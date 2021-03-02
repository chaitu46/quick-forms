import React from "react";
import { useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={`text-input ${isError && "error"}`}
        {...field}
        {...props}
      />
      {isError ? (
        <div className="inline-error-message">{meta.error}</div>
      ) : null}
    </>
  );
};
