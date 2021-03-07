import React, { Fragment } from "react";
import { useHistory } from "react-router";
import { IoChevronBackOutline } from "react-icons/io5";
import { useFormListContext } from "../contexts/FormListContext";
import FormAnswerComponent from "../components/FormAnswerComponent";
import AlertMessage from "../components/AlertMessage";
import TimeAgo from "react-timeago";
import { LinearProgress } from "@material-ui/core";

export default function FormAnswers() {
  const history = useHistory();
  const { formsList, loading } = useFormListContext();
  console.log("formsList", formsList);
  if (loading) {
    return <LinearProgress />;
  }
  return (
    <>
      <button className="button button--link" onClick={() => history.push("/")}>
        <IoChevronBackOutline />
        Back
      </button>
      {!formsList.length > 0 ? (
        <AlertMessage message="You have no forms yet!" type="info" />
      ) : (
        formsList.map((form) => (
          <Fragment key={form.id}>
            <div className="answers-header">
              <div>{form.title}</div>
              <div>
                <span>Added </span>
                <TimeAgo date={form.timeStamp.toDate().toString()} text />
              </div>
            </div>
            <div className="answers-container">
              <FormAnswerComponent formId={form.id} />
            </div>
          </Fragment>
        ))
      )}
    </>
  );
}
