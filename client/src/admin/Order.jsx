import React, { useState } from "react";
import Layout from "../core/Layout";
import { connect } from "react-redux";
import { useEffect } from "react";
import { isAuth } from "../auth";
import { viewOrders } from "../core/coreApi";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { loadOrders } from "../actions/products";

function Order({ orders, loadOrders, items, ...props }) {
  const { user, token } = isAuth();

  useEffect(() => {
    viewOrders(user._id, token).then((data) => {
      if (data.err) return;
      else loadOrders(data.orders);
      console.log(data.orders);
    });
  }, []);

  const Delete = (id) => {
    fetch(`${API_URL}/order/delete/${id}/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    loadOrders(orders.filter((p) => p._id !== id));
  };

  return (
    <Layout
      title="Orders"
      description="Manage orders from user"
      className="container"
    >
      <div
        className="row no-gutters"
        style={{ fontFamily: "Raleway,san-serif" }}
      >
        <h3>ORDERS</h3>
        <table className="table table-bordered">
          <thead style={{ fontWeight: "700" }}>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((p) => (
              <tr key={p._id}>
                <th>{p._id}</th>
                <th>{p.user.name}</th>
                <th>${p.amount}</th>
                <th>{new Date(p.createdAt).toLocaleString()}</th>
                <th>{p.status}</th>
                <th>
                  <Link to={`/order/${p._id}`}>Detail</Link>
                  <span
                    className="text-danger ml-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => Delete(p._id)}
                  >
                    Delete
                  </span>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

const mapstate2props = (state) => {
  return {
    items: state.products,
    orders: state.order,
  };
};

export default connect(mapstate2props, { loadOrders })(Order);
