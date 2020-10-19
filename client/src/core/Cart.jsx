import React, { memo, useState } from "react";
import Layout from "./Layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { useEffect } from "react";
import { updateItems, removeFromCart } from "../actions/products";
import Checkout from "./Checkout";

function Cart({ items, ...props }) {
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(items.reduce((pre, cur) => pre + cur.quantity * cur.price, 0));
  }, [items]);

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
      <div className="info-product-cart">
        <p className="product-name-cart">{product.name}</p>
        <p className="product-price-cart">
          $<span>{product.price}</span>
        </p>
      </div>
      <div className="calculate-product-cart">
        <div className="crement crement-cart">
          <button
            className="decre decre-cart"
            onClick={() => {
              props.updateItems(
                product._id,
                product.quantity - 1 < 0 ? 0 : product.quantity - 1
              );
              setTotal(
                items.reduce((pre, cur) => pre + cur.quantity * cur.price, 0)
              );
            }}
          >
            -
          </button>
          <input
            type="number"
            className="input-total input-total-cart"
            value={product.quantity ? product.quantity : 0}
            name="total"
            onChange={(e) => {
              props.updateItems(product._id, parseInt(e.target.value));
              setTotal(
                items.reduce((pre, cur) => pre + cur.quantity * cur.price, 0)
              );
            }}
          />
          <button
            className="incre incre-cart"
            onClick={() => {
              props.updateItems(product._id, product.quantity + 1);
              setTotal(
                items.reduce((pre, cur) => pre + cur.quantity * cur.price, 0)
              );
            }}
          >
            +
          </button>
        </div>
        <div className="item-price-cart">
          $&nbsp;{product.quantity * product.price}
        </div>
        <button
          className="btn-remove-cart"
          onClick={() => {
            props.removeFromCart(product);
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );

  return (
    <Layout
      description="Manage your added product"
      title="Cart"
      className="container-fluid"
    >
      <div className="row no-gutters">
        <div className="col-md-7 col-sm-12 px-3">
          <h3>Your cart has {items.length} items</h3>
          {items.map((p) => Item(p))}
          <div className="total-price-cart">
            <p>Total:&nbsp;${total} </p>
          </div>
        </div>
        <div className="col-md-5 px-3 col-sm-12">
          <h3 style={{ marginBottom: "1rem" }}>Checkout</h3>
          <Checkout />
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

export default connect(mapstate2props, { updateItems, removeFromCart })(
  memo(Cart)
);
