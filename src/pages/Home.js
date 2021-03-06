import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GoPlus } from "react-icons/go";
import { MdQuestionAnswer } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import { useFormListContext } from "../contexts/FormListContext";
import TimeAgo from "react-timeago";

const Home = (props) => {
  const history = useHistory();
  const { user } = useAuth();
  const { formsList, loading, deleteForm } = useFormListContext();
  console.log("loading", loading);

  const handleCreateForm = useCallback(() => {
    history.push("/form-entry");
  }, [history]);

  console.log(formsList);
  return (
    <>
      <main className="container container--page">
        <section className="container__box container__box--full-width">
          <p>
            <strong>Full name:</strong> {user.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </section>
        <section className="buttons-group">
          <button
            className="button button__with-icon"
            onClick={handleCreateForm}
          >
            <GoPlus />
            Add form
          </button>
          <button
            className="button button__with-icon"
            onClick={() => history.push("/form-answers")}
          >
            <MdQuestionAnswer />
            Answers
          </button>
        </section>
        <hr />

        {loading ? (
          <Spinner animation="grow" />
        ) : (
          formsList.length > 0 && (
            <>
              <h2>Recent Forms</h2>
              {formsList.map((form) => (
                <section
                  className="container__box container__box--flex "
                  key={form.id}
                >
                  <div>
                    <TimeAgo
                      className="container__box__timestamp"
                      date={form.timeStamp.toDate().toString()}
                    />
                    <p className="container__box__title">{form.title}</p>
                    <p className="container__box__description">
                      {form.description}
                    </p>
                  </div>
                  <div className="container__box__action-buttons">
                    <button
                      className="button button--inline"
                      onClick={() => history.push(`/form-entry/${form.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="button button--inline button--delete"
                      onClick={() => deleteForm(form.id)}
                    >
                      Delete
                    </button>
                  </div>
                </section>
              ))}
            </>
          )
        )}
      </main>
    </>
  );
};

export default Home;
