import { BrowserRouter, Switch, Route } from "react-router-dom";

import React, { Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Home = React.lazy(() => import("./pages/Home"));

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
