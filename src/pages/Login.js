import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../components/TextField";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = (props) => {
  const { handleLogin } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(8, "Minimum characters should be 8")
      .required("Required"),
  });

  return (
    <div className="container container--flex">
      <section className="container__box container__box--dialog">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form noValidate>
            <TextField
              className="u-full-width"
              type="text"
              name="email"
              placeholder="Email Address"
            />
            <TextField
              className="u-full-width"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className="button" type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </section>
      <section className="help-text">
        <p>
          Need an account? Register <Link to="/register">here</Link>.
        </p>
      </section>
      <section className="help-text">
        <p>
          <Link to="/guest/form-entry">Try as Guest user.</Link>.
        </p>
      </section>
    </div>
  );
};

export default Login;
