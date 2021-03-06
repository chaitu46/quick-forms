import React from "react";
import { TiTick } from "react-icons/ti";

export default function FormSubmitSuccessful() {
  return (
    <main className="container container--page">
      <section className="container__box">
        <div className="success-message">
          <TiTick color="green" size="50px" />
          <h1>Your Form Has been successfully submitted.</h1>
        </div>
      </section>
    </main>
  );
}
