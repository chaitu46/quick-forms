import React, { useCallback } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../components/TextField";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = (props) => {
  const history = useHistory();
  const { register, updateProfile } = useAuth();

  const handleRegister = useCallback(
    async (values, props) => {
      const { email, password, fullName } = values;
      console.log(values);
      try {
        const userData = await register(email, password);
        await updateProfile(userData, fullName);
        history.push("/");
      } catch (error) {
        // TODO: handle error.
        alert(error);
      }
      props.resetForm();
    },
    [history, register, updateProfile]
  );

  // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
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
      // .min(8, "Minimum characters should be 8")
      // .matches(
      //   passwordRegex,
      //   "Password must have one upper, lower case, number, special symbol"
      // )
      .required("Required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not match")
      .required("Required"),
  });

  return (
    <main className="container">
      <section className="container__box">
        <h1>Register here</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {(props) => (
            <Form noValidate>
              <TextField type="text" name="fullName" placeholder="Full Name" />
              <TextField type="text" name="email" placeholder="Email" />
              <TextField
                type="password"
                name="password"
                placeholder="Password"
              />
              <TextField
                type="password"
                name="repeatPassword"
                placeholder="Repeat Password"
              />
              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
      </section>
      <section className="help-text">
        <p>
          Already have an account? Login <Link to="/login">here</Link>.
        </p>
      </section>
    </main>
  );
};

export default Register;
