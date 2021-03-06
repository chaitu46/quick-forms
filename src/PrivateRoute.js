import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({
  component: Component,
  provider: Provider,
  ...rest
}) {
  const { user } = useAuth();
  if (!user) {
    if (rest.path === "/") {
      return <Redirect to="/guest/form-entry/" />;
    }
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Provider) {
          return (
            <Provider>
              <Component {...props} />
            </Provider>
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}
