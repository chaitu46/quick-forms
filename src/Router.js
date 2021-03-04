import { BrowserRouter, Switch, Route } from "react-router-dom";

import React, { Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { FormListProvider } from "./contexts/FormListContext";
import { FormEntryProvider } from "./contexts/FormEntryContext";
import PrivateRoute from "./PrivateRoute";
import { Spinner } from "react-bootstrap";
import Header from "./components/Header";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Home = React.lazy(() => import("./pages/Home"));
const FormEntry = React.lazy(() => import("./pages/FormEntry"));

const Router = () => {
  return (
    <Suspense fallback={<Spinner animation="grow" />}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Home}
              provider={FormListProvider}
            />
            <PrivateRoute
              path="/form-entry/:formId"
              component={FormEntry}
              provider={FormEntryProvider}
            />
            <PrivateRoute
              path="/form-entry"
              component={FormEntry}
              provider={FormEntryProvider}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
