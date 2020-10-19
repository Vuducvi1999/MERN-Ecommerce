import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../auth";
import { getUser, updateUser } from "../core/coreApi";
import Layout from "../core/Layout";

function UpdateUser() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [currentUser, setCurrentUser] = useState();
  const [statusUpdate, setStatusUpdate] = useState({
    err: "",
    success: false,
  });
  const { user, token } = isAuth();

  const { name, email, password, confirm } = values;

  const { err, success } = statusUpdate;
  useEffect(() => {
    getUser(user._id, token).then((data) => {
      if (data.err) return;
      setCurrentUser(data.user);
      setValues({
        ...values,
        name: data.user.name,
        email: data.user.email,
      });
    });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusUpdate({ err: "", success: false });
    if (!email || !password)
      return setStatusUpdate({ err: "Field require", success: false });
    updateUser(user._id, token, values).then((data) => {
      console.log(data);
      if (data.err) setStatusUpdate({ success: false, err: data.err });
      else setStatusUpdate({ err: "", success: true });
    });
  };

  const showErr = () => (err ? <h5 className="text-danger">{err}</h5> : "");

  const showSuccess = () =>
    success ? <h5 className="text-success">Update success</h5> : "";

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container"
    >
      <div className="row" style={{ fontFamily: "Raleway,san-serif" }}>
        <div className="col-md-4 col-sm-8">
          <h3>USER PROFILE</h3>
          {showSuccess()}
          {showErr()}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="d-block">
                Name
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="d-block">
                <span className="text-danger">!</span> Email
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="d-block">
                <span className="text-danger">!</span> Password
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="d-block">
                New password
                <input
                  type="password"
                  name="confirm"
                  className="form-control"
                  value={confirm}
                  onChange={handleChange}
                />
              </label>
            </div>

            <button type="submit" className="btn btn-dark">
              UPDATE
            </button>
          </form>
        </div>
        <div className="col-md-8 col-sm-12">
          <h3>MY ORDERS</h3>
          <table className="table table-bordered">
            <thead style={{ fontWeight: "700" }}>
              <tr>
                <th>ID</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentUser
                ? currentUser.history.map((p) => (
                    <tr key={p._id}>
                      <th>{p._id}</th>
                      <th>${p.amount}</th>
                      <th>{new Date(p.createdAt).toLocaleString()}</th>
                      <th>{p.status}</th>
                      <th>
                        <Link to={`/order/${p._id}`}>Detail</Link>
                      </th>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateUser;
