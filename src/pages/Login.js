import React, { useCallback } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../components/TextField";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = (props) => {
  const history = useHistory();
  const { login } = useAuth();

  const handleLogin = useCallback(
    async (values, props) => {
      const { email, password } = values;
      try {
        await login(email, password);
        history.push("/");
      } catch (error) {
        // TODO: handle error.
        alert(error);
      }
    },
    [history, login]
  );

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      // .min(8, "Minimum characters should be 8")
      .required("Required"),
  });

  return (
    <main className="container">
      <section className="container__box">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form noValidate>
              <TextField type="text" name="email" placeholder="Email Address" />
              <TextField
                type="password"
                name="password"
                placeholder="Password"
              />
              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
      </section>
      <section className="help-text">
        <p>
          Need an account? Register <Link to="/register">here</Link>.
        </p>
      </section>
    </main>
  );
};

export default Login;
