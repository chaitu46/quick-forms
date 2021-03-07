import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GoPlus } from "react-icons/go";
import { MdQuestionAnswer } from "react-icons/md";
import { useFormListContext } from "../contexts/FormListContext";

import { LinearProgress } from "@material-ui/core";
import FormCard from "../components/FormCard";

const Home = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { formsList, loading, deleteForm } = useFormListContext();

  const handleCreateForm = useCallback(() => {
    history.push("/form-entry");
  }, [history]);

  return (
    <>
      <section className="container__box container__box--full-width">
        <p>
          <strong>Full name:</strong> {user.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </section>
      <section className="buttons-group">
        <button className="button button__with-icon" onClick={handleCreateForm}>
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
        <LinearProgress />
      ) : (
        formsList.length > 0 && (
          <>
            <h2>Recent Forms</h2>
            <FormCard
              formsList={formsList}
              history={history}
              deleteForm={deleteForm}
            />
          </>
        )
      )}
    </>
  );
};

export default Home;
