import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import Layout from "../core/Layout";

function SignUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    err: "",
    success: false,
  });

  const handleChange = (event) => {
    const target = event.target;
    setValues({ ...values, [target.name]: target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = values;
    signup({ name, email, password }).then((data) => {
      if (data.err) setValues({ ...values, success: false, err: data.err });
      else
        setValues({
          name: "",
          email: "",
          password: "",
          err: "",
          success: true,
        });
    });
  };

  const showSuccess = () =>
    values.success ? (
      <h3 className="text-success">
        Sign up success! Please <Link to="/signin">Sign In</Link>.
      </h3>
    ) : (
      ""
    );

  const showErr = () =>
    values.err ? <h3 className="text-danger">{values.err}</h3> : "";

  const signUpForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
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
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    );
  };

  return (
    <>
      <Layout
        title="Sign Up"
        description="Create new account"
        className="container offset-3 col-md-6"
      >
        {showErr()}
        {showSuccess()}
        {signUpForm()}
      </Layout>
    </>
  );
}

export default SignUp;
