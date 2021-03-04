import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GoPlus } from "react-icons/go";
import Spinner from "react-bootstrap/Spinner";
import { useFormListContext } from "../contexts/FormListContext";

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
        <hr></hr>
        <>
          <button className="button__with-icon" onClick={handleCreateForm}>
            <GoPlus />
            Add form
          </button>
        </>
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          formsList.length > 0 && (
            <>
              <h2>Recent Forms</h2>
              {formsList.map((form) => (
                <section
                  className="container__box container__box--full-width"
                  key={form.id}
                >
                  <p>{form.timeStamp.toDate().toString()}</p>
                  <p>{form.title}</p>
                  <p>{form.description}</p>
                  <button
                    onClick={() => history.push(`/form-entry/${form.id}`)}
                  >
                    View
                  </button>
                  <button onClick={() => deleteForm(form.id)}>Delete</button>
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
