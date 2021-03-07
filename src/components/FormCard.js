import React from "react";
import TimeAgo from "react-timeago";

export default function FormCard({ formsList, history, deleteForm }) {
  return formsList.map((form) => (
    <section className="container__box container__box--flex " key={form.id}>
      <div>
        <div className="container__box__timestamp">
          <span>Created </span>
          <TimeAgo date={form.timeStamp.toDate().toString()} text />
        </div>

        <p className="container__box__title">{form.title}</p>
        <p className="container__box__description">{form.description}</p>
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
  ));
}
