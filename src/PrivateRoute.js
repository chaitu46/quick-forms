import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
