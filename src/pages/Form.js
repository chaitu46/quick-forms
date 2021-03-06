import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../components/TextField";
import { RadioField } from "../components/RadioField";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../firebase";
import { v4 as uuid4 } from "uuid";

const getInitialValues = (fields = []) => {
  const initialValues = {};
  fields.forEach((field, index) => {
    initialValues[`${field.title.replace(/ /g, "")}${index}`] = "";
  });
  return initialValues;
};
const getValidationSchema = (fields = []) => {
  const validationsObj = {};
  fields.forEach((field, index) => {
    if (field.required) {
      validationsObj[
        `${field.title.replace(/ /g, "")}${index}`
      ] = Yup.string().required("Required");
    }
  });
  return validationsObj;
};

const FormComponent = (props) => {
  const { formId } = useParams();
  const history = useHistory();
  const [formConfig, setFormConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formId) {
      db.collection("forms")
        .doc(formId)
        .get()
        .then((response) => {
          const data = response.data();
          setFormConfig(data);
          setLoading(false);
        });
    }
  }, [formId]);

  const handleFormSubmit = async (values) => {
    //TODO: parse values
    const parsedValues = formConfig.fields.map((field, index) => ({
      title: field.title,
      value: values[`${field.title.replace(/ /g, "")}${index}`],
    }));
    const withOwnerValues = {
      fields: parsedValues,
      owner: formConfig.owner,
      formId,
    };
    await db.collection("form-answers").doc(uuid4()).set(withOwnerValues);
    history.push("/form-submit-success");
  };

  if (loading) {
    return "loading...";
  }
  const initialValues = getInitialValues(formConfig.fields);
  const validationSchema = Yup.object().shape(
    getValidationSchema(formConfig.fields)
  );

  return (
    <main className="container container--page">
      <section className="container__box container__box--full-width">
        <h1>{formConfig.title}</h1>
        <p>{formConfig.description}</p>
      </section>
      {console.log("formConfig", formConfig)}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {(form) => {
          console.log("form", form);
          return (
            <>
              <form onSubmit={form.handleSubmit}>
                {formConfig.fields.map((field, index) => {
                  if (field.type === "text") {
                    return (
                      <section
                        className="container__box container__box--full-width"
                        key={`${field.title.replace(/ /g, "")}${index}`}
                      >
                        <TextField
                          key={`${field.title.replace(/ /g, "")}${index}`}
                          label={field.title}
                          type={field.type}
                          name={`${field.title.replace(/ /g, "")}${index}`}
                          placeholder={field.placeholder}
                        />
                      </section>
                    );
                  }
                  if (field.type === "radio") {
                    const fieldName = `${field.title.replace(
                      / /g,
                      ""
                    )}${index}`;
                    return (
                      <section
                        className="container__box container__box--full-width"
                        key={fieldName}
                      >
                        <RadioField
                          name={fieldName}
                          fieldProps={field}
                          type={field.type}
                          touched={form.touched[fieldName]}
                          errors={form.errors}
                          handleChange={form.handleChange}
                        />
                      </section>
                    );
                  }
                  return null;
                })}
                <button className="button" type="submit">
                  Submit
                </button>
              </form>
            </>
          );
        }}
      </Formik>
    </main>
  );
};

export default FormComponent;
