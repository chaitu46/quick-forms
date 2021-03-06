import { BrowserRouter, Switch, Route } from "react-router-dom";

import React, { Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { FormListProvider } from "./contexts/FormListContext";
import { FormEntryProvider } from "./contexts/FormEntryContext";
// import { GuestProvider } from "./contexts/GuestContext.js";
import PrivateRoute from "./PrivateRoute";
import { Spinner } from "react-bootstrap";
import Header from "./components/Header";
import { SnackbarProvider } from "notistack";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Home = React.lazy(() => import("./pages/Home"));
const FormEntry = React.lazy(() => import("./pages/FormEntry"));
const FormComponent = React.lazy(() => import("./pages/Form"));
const FormAnswers = React.lazy(() => import("./pages/FormAnswers"));
// const GuestFormEntry = React.lazy(() => import("./pages/GuestFormEntry"));
const FormSubmitSuccessful = React.lazy(() =>
  import("./pages/FormSubmitSuccessful")
);

const Router = () => {
  return (
    <Suspense fallback={<Spinner animation="grow" />}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <AuthProvider>
            {/* <FormEntryProvider> */}
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
              <PrivateRoute
                path="/form-answers"
                component={FormAnswers}
                provider={FormListProvider}
              />
              <Route path="/form/:formId" component={FormComponent} />
              <Route
                path="/form-submit-success"
                component={FormSubmitSuccessful}
              />
              {/* <Route path="/guest/form-entry/:formId" component={FormEntry} /> */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
            {/* </FormEntryProvider> */}
          </AuthProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
