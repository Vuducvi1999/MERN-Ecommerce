import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, signin } from "../auth";
import Layout from "../core/Layout";
import { isAuth } from "./../auth/index";

function SignIn({ match, location, history, ...props }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    err: "",
    loading: false,
    redirect: false,
  });

  const handleChange = (event) => {
    const target = event.target;
    setValues({ ...values, [target.name]: target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = values;
    setValues({ ...values, err: "", loading: true });
    signin({ email, password }).then((data) => {
      if (data.err) setValues({ ...values, loading: false, err: data.err });
      else {
        authenticate(data);
        setValues({
          email: "",
          password: "",
          err: "",
          loading: false,
          redirect: true,
        });
      }
    });
  };
  const { user } = isAuth();

  const showLoading = () =>
    values.loading ? <h3 className="text-info">Loading ...</h3> : "";

  const redirectHome = () =>
    values.redirect ? (
      location.state ? (
        <Redirect to={`${location.state.prevPath}`} />
      ) : (
        redirectToDashboard
      )
    ) : (
      ""
    );

  const redirectToDashboard = user ? (
    user.role === 0 ? (
      <Redirect to="/user/dashboard" />
    ) : (
      <Redirect to="/admin/dashboard" />
    )
  ) : (
    ""
  );

  const showErr = () =>
    values.err ? <h3 className="text-danger">{values.err}</h3> : "";
  const signInForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div>
          Have no account, <Link to="/signup">sign up</Link>
        </div>
        <button type="submit" className="btn btn-block mt-2">
          Sign In
        </button>
      </form>
    );
  };

  return (
    <>
      <Layout
        title="Sign In"
        description="You already have account ?"
        className="container offset-3 col-md-6"
      >
        {showErr()}
        {showLoading()}
        {signInForm()}
        {redirectHome()}
      </Layout>
    </>
  );
}

export default SignIn;
