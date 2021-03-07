import React from "react";
import { TiTick } from "react-icons/ti";
import AlertMessage from "../components/AlertMessage";

export default function FormSubmitSuccessful() {
  return (
    <>
      <section className="container__box">
        <AlertMessage
          message={
            <div className="success-message">
              <TiTick color="green" size="30px" className="" />
              <p>Your form has been submitted successfully.</p>
            </div>
          }
          type="success"
        />
      </section>
    </>
  );
}
