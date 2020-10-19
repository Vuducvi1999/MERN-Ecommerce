import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuth } from "./../auth/index";

function AdminDashboard() {
  const {
    user: { email, name, _id },
  } = isAuth();
  return (
    <Layout title="Dashboard" description={`Hello ${name}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <h4 className="card-header">Admin Links</h4>
              <ul className="list-group list-group-flush">
                <Link className="list-group-item" to={`/profile/update/${_id}`}>
                  Profile
                </Link>
                <Link className="list-group-item" to="/create/category">
                  Categories
                </Link>
                <Link className="list-group-item" to="/products">
                  Products
                </Link>
                <Link className="list-group-item" to="/orders">
                  View Orders
                </Link>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <h4 className="card-header">Admin Information</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">Admin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
