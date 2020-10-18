import React, { useState } from "react";
import Layout from "../core/Layout";
import { connect } from "react-redux";
import { useEffect } from "react";
import { isAuth } from "../auth";
import { viewOrders } from "../core/coreApi";
import { Link } from "react-router-dom";

function Order({ items, ...props }) {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuth();

  useEffect(() => {
    viewOrders(user._id, token).then((data) => {
      if (data.err) return;
      else setOrders(data.orders);
    });
  }, []);

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
              <th></th>
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
  };
};

export default connect(mapstate2props, {})(Order);
