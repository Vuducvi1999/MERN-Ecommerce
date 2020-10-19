import React from "react";
import Layout from "./Layout";
import { connect } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { isAuth } from "../auth";
import { detailOrder, orderStatus, setStatusOrder } from "./coreApi";
import { API_URL } from "../config";
import { Link } from "react-router-dom";

function DetailOrder({ items, ...props }) {
  const [order, setOrder] = useState();
  const [listStatus, setListStatus] = useState();
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    detailOrder(orderId, token).then((data) => {
      setOrder(data.order);
      setStatus(data.order.status);
      console.log(data.order);
    });
    orderStatus().then((data) => {
      console.log("data err", data);
      setListStatus(data.status);
    });
    console.log(success);
  }, []);

  const { orderId } = props.match.params;
  const { token, user } = isAuth();

  const Item = (product) => (
    <div
      className="d-flex py-2 "
      key={product._id}
      style={{
        fontFamily: "Raleway, sans-serif",
        padding: "0 1rem",
        alignItems: "center",
        borderBottom: "1px solid gray",
        margin: "1rem 0",
      }}
    >
      <Link
        to={{ pathname: `/product/${product._id}` }}
        className="image-container-cart"
      >
        <img
          src={`${API_URL}/product/photo/${product._id}`}
          className="image-product-cart"
          alt={product.name}
        />
      </Link>
      <div className="info-product-cart info-product-order">
        <p className="product-name-cart">{product.name}</p>
        <p className="product-price-cart">
          $<span>{product.price}</span>
        </p>
      </div>
      <div className="quantity-order">{product.quantity}&nbsp;items</div>
      <div className="total-order text-center">
        $&nbsp;{product.price * product.quantity}
      </div>
    </div>
  );

  const handleChange = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  const handleClick = () => {
    setStatusOrder(user._id, orderId, token, status).then((data) =>
      setSuccess(true)
    );
  };

  const setStatusButton = () =>
    success ? (
      <button
        className="btn btn-success btn-block save-change"
        onClick={handleClick}
      >
        Save change&nbsp;{success ? <span>&#10003;</span> : ""}
      </button>
    ) : (
      <button
        className="btn btn-dark btn-block save-change"
        onClick={handleClick}
      >
        Save change&nbsp;
      </button>
    );

  return (
    <Layout
      title="Detail order"
      description="Manage orders from user"
      className="container"
    >
      <div className="row" style={{ fontFamily: "Raleway,san-serif" }}>
        <div className="col-md-8 col-sm-12">
          <h3>Products</h3>
          {order ? order.products.map((p) => Item(p)) : ""}
          <div className="total-price-cart" style={{ fontWeight: "100" }}>
            <p>Total:&nbsp;${order ? order.amount : 0}</p>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <h3>Shipping</h3>
          <table className="table table-bordered mt-3">
            <tbody style={{ fontWeight: "500" }}>
              <tr>
                <th>Name</th>
                <th>{order ? order.user.name : "waiting..."}</th>
              </tr>
              <tr>
                <th>Address</th>
                <th>{order ? order.address : "waiting..."}</th>
              </tr>
              <tr>
                <th>Contact</th>
                <th>{order ? order.sdt : "waiting..."}</th>
              </tr>
              <tr>
                <th>Paid</th>
                <th>
                  {order
                    ? new Date(order.createdAt).toLocaleString()
                    : "waiting..."}
                </th>
              </tr>
              {user.role === 1 ? (
                <tr>
                  <th>Status</th>
                  <th>
                    <select value={status} onChange={handleChange}>
                      {listStatus
                        ? listStatus.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))
                        : "waiting..."}
                    </select>
                  </th>
                </tr>
              ) : (
                <tr>
                  <th>Status</th>
                  <th>{order ? order.status : "waiting..."}</th>
                </tr>
              )}
            </tbody>
          </table>
          {user.role === 1 ? setStatusButton() : ""}
        </div>
      </div>
    </Layout>
  );
}

const mapstate2props = (state) => {
  return {
    items: state.products,
  };
};

export default connect(mapstate2props, {})(DetailOrder);
