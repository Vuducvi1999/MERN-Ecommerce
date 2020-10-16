import React, { useState } from "react";
import { isAuth } from "../auth";
import Layout from "../core/Layout";
import { CreateCategory } from "./apiAdmin";

function AddCategory() {
  const [values, setValues] = useState({
    name: "",
    err: false,
    success: false,
  });

  const { user, token } = isAuth();

  const handleChange = (e) => {
    setValues({ ...values, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateCategory(user._id, token, values.name).then((data) => {
      if (data.err) setValues({ name: "", err: data.err, success: false });
      else {
        setValues({ name: "", err: false, success: true });
      }
    });
  };

  const showErr = () =>
    values.err ? <h3 className="text-danger">{values.err}</h3> : "";

  const showSuccess = () =>
    values.success ? (
      <h3 className="text-success">Add category success!</h3>
    ) : (
      ""
    );

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      {showErr()}
      {showSuccess()}
      <div className="form-group">
        <label htmlFor="name">Category Name</label>
        <input
          type="text"
          id="name"
          autoFocus
          onChange={handleChange}
          className="form-control"
          value={values.name}
        />
      </div>
      <button type="submit" className="btn btn-outline-primary">
        Create Category
      </button>
    </form>
  );

  return (
    <Layout title="Add category" description={`Ready to add new category?`}>
      <div className="container">
        <div className="col-md-6 offset-md-3">{categoryForm()}</div>
      </div>
    </Layout>
  );
}

export default AddCategory;
