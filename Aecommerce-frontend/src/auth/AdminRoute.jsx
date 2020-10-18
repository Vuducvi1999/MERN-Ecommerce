import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuth } from ".";

function AdminRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() && isAuth().user.role === 1 ? children : <Redirect to="/" />
      }
    />
  );
}

export default AdminRoute;
