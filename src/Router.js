import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import React, { Suspense } from "react";
import AuthProvider from "./AuthProvider";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Home = React.lazy(() => import("./pages/Home"));

const Router = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </AuthProvider>
  );
};

export default Router;
