import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuth } from "./../auth/index";

function AdminDashboard() {
  const {
    user: { email, name },
  } = isAuth();
  return (
    <Layout title="Dashboard" description={`Hello ${name}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <h4 className="card-header">Admin Links</h4>
              <ul className="list-group list-group-flush">
                <Link className="list-group-item" to="/create/category">
                  Create Category
                </Link>
                <Link className="list-group-item" to="/create/product">
                  Create Product
                </Link>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
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
