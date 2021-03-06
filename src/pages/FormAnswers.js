import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IoChevronBackOutline } from "react-icons/io5";
import { useFormListContext } from "../contexts/FormListContext";
import { db } from "../firebase";

export default function FormAnswers() {
  const history = useHistory();
  const { formsList } = useFormListContext();
  console.log("formsList", formsList);

  return (
    <main className="container container--page">
      <button className="button button--link" onClick={() => history.push("/")}>
        <IoChevronBackOutline />
        Back
      </button>
      {formsList.map((form) => (
        <Fragment key={form.id}>
          <div className="answers-header">{form.title}</div>
          <div className="answers-container">
            <FormAnswer formId={form.id} />
          </div>
        </Fragment>
      ))}
    </main>
  );
}

function FormAnswer({ formId }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("form-answers")
      .where("formId", "==", formId)
      .get()
      .then((response) => {
        const answers = response.docs.map((doc) => ({
          fields: [],
          ...doc.data(),
          id: doc.id,
        }));
        console.log("answers", answers);
        setAnswers(answers);
        setLoading(false);
      });
  }, [formId]);
  if (loading) {
    return (
      <section className="container__box container__box--full-width">
        loading...
      </section>
    );
  }
  if (!answers || !answers.length) {
    return (
      <section className="container__box container__box--full-width">
        <p>No answers yet</p>
      </section>
    );
  }
  return answers.map((answer) => {
    return (
      <section className="container__box container__box--fomr" key={answer.id}>
        {answer.fields.map(({ title, value }) => (
          <div key={`${answer.id}${title}`}>
            <p>
              <strong>{title}</strong> : {value}
            </p>
          </div>
        ))}
      </section>
    );
  });
}
