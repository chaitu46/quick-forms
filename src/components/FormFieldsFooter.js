import React from "react";

import ShareUrl from "./ShareUrl";

export default function FormFieldsFooter({
  formId,
  handleFormTouch,
  urls: { shareURL, answersURL, maintainURL },
}) {
  return (
    <div className="form-entry-footer">
      <div>
        <button
          className="button"
          onClick={() => {
            handleFormTouch();
          }}
        >
          Create Form
        </button>
      </div>
      {formId && (
        <div>
          {shareURL && (
            <ShareUrl key={shareURL} shareURL={shareURL} label="Share" />
          )}
          {answersURL && (
            <ShareUrl
              key={answersURL}
              shareURL={answersURL}
              label="Answers URL"
            />
          )}
          {maintainURL && (
            <ShareUrl
              key={maintainURL}
              shareURL={maintainURL}
              label="Edit URL"
            />
          )}
        </div>
      )}
    </div>
  );
}
