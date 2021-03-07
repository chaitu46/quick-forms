import React, { Fragment } from "react";
import { useFormListContext } from "../contexts/FormListContext";
import FormAnswerComponent from "../components/FormAnswerComponent";
import { LinearProgress } from "@material-ui/core";

export default function GuestAnswers() {
  const { formsList, loading } = useFormListContext();
  console.log("formsList", formsList);
  if (loading) {
    return <LinearProgress />;
  }
  if (!formsList.length) {
    return (
      <section className="container__box container__box--full-width">
        No forms are created for this user yet!
      </section>
    );
  }

  return formsList.map((form) => (
    <section key={form.id} className="guest-answers-container">
      <div className="answers-header">{form.title}</div>
      <div className="answers-container">
        <FormAnswerComponent formId={form.id} />
      </div>
    </section>
  ));
}
