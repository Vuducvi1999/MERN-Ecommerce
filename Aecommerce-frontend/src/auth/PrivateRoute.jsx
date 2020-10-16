import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuth } from ".";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? children : <Redirect to={{ pathname: "/signin" }} />
      }
    />
  );
}

export default PrivateRoute;
