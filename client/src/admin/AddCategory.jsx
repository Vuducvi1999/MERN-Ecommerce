import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../auth";
import { API_URL } from "../config";
import Layout from "../core/Layout";
import { CreateCategory } from "./apiAdmin";

function Category() {
  const [values, setValues] = useState({
    name: "",
    err: false,
    success: false,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`, {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        setCategories(data);
        console.log(data);
      })
    );
  }, []);

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
        setCategories([...categories, data.category]);
      }
    });
  };

  const showErr = () =>
    values.err ? <h3 className="text-danger">{values.err}</h3> : "";

  // const showSuccess = () =>
  //   values.success ? (
  //     <h3 className="text-success">Add category success!</h3>
  //   ) : (
  //     ""
  //   );

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      {showErr()}
      <div className="form-group">
        <h3>Create Category</h3>

        <input
          type="text"
          id="name"
          autoFocus
          onChange={handleChange}
          className="form-control no-outline"
          value={values.name}
        />
      </div>
      <button type="submit" className="btn btn-outline-primary">
        Create Category
      </button>
    </form>
  );

  const Delete = (id) => {
    fetch(`${API_URL}/category/${id}/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => {
      if (data.err) setValues({ ...values, err: data.err });
    });
    setCategories(categories.filter((p) => p._id !== id));
  };

  return (
    <Layout
      title="Add category"
      description={`Ready to add new category?`}
      className="container"
    >
      <div className="row no-gutters">
        <div className="col-md-4 col-sm-12">{categoryForm()}</div>
        <div className="col-md-8 col-sm-12 d-flex justify-content-between">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-12 d-flex justify-content-between">
                <h3>Products</h3>
                <Link to="/create/product">
                  <button className="btn btn-dark">Create</button>
                </Link>
              </div>
              <table className="table table-bordered">
                <thead style={{ fontWeight: "700" }}>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((p) => (
                    <tr key={p._id}>
                      <th>{p._id}</th>
                      <th>{p.name}</th>
                      <th>{new Date(p.createdAt).toLocaleString()}</th>
                      <th>
                        <span
                          className="text-danger"
                          onClick={() => Delete(p._id)}
                          style={{ cursor: "pointer" }}
                        >
                          delete
                        </span>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Category;
