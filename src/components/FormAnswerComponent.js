import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function FormAnswerComponent({ formId }) {
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
        <LinearProgress />
      </section>
    );
  }
  if (!answers || !answers.length) {
    return (
      <section className="container__box container__box--full-width">
        <p>No answers yet!</p>
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
