import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../components/TextField";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { handleRegister } = useAuth();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(8, "Minimum characters should be 8")
      .required("Required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not match")
      .required("Required"),
  });

  return (
    <div className="container container--flex">
      <section className="container__box container__box--dialog">
        <h1>Register here</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {(props) => (
            <Form noValidate>
              <TextField
                className="u-full-width"
                type="text"
                name="fullName"
                placeholder="Full Name"
              />
              <TextField
                className="u-full-width"
                type="text"
                name="email"
                placeholder="Email"
              />
              <TextField
                className="u-full-width"
                type="password"
                name="password"
                placeholder="Password"
              />
              <TextField
                className="u-full-width"
                type="password"
                name="repeatPassword"
                placeholder="Repeat Password"
              />
              <button className="button" type="submit">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </section>
      <section className="help-text">
        <p>
          Already have an account? Login <Link to="/login">here</Link>.
        </p>
      </section>
    </div>
  );
};

export default Register;
