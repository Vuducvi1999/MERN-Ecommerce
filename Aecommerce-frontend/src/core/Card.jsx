import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import "../user/style.css";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "./../actions/products";
import { memo } from "react";
import StarRating from "./StarRating";

const Card = ({ product, isAdded, ...props }) => {
  const [isInStock, setIsInStock] = useState(isAdded);

  useEffect(() => {
    setIsInStock(props.items.find((p) => p._id === product._id) ? true : false);
  }, []);

  const Card_2 = () => (
    <div className="padding-product">
      <div className="product-card">
        <Link
          className="d-inline-block"
          to={{ pathname: `/product/${product._id}` }}
        >
          <div
            className="image-container-card"
            style={{
              backgroundImage: `url(${API_URL}/product/photo/${product._id})`,
            }}
          >
            <div className="image-card">
              <div className="image-product-card"></div>
            </div>
          </div>
        </Link>
        <div className="detail-card">
          <p className="product-name-card">{product.name}</p>
          <p className="product-price-card">
            $<span>{product.price}</span>
          </p>

          <div className="rate-card">
            <StarRating
              className="py-2"
              rate={
                product.rate.length !== 0
                  ? product.rate.reduce((p, x) => p + x.rate, 0) /
                    product.rate.length
                  : 0
              }
            />
          </div>

          <p className="product-category-card d-inline-block">
            Category: &nbsp;
          </p>

          <h3 className="product-category-h3">{product.category.name}</h3>
          {isInStock ? (
            <button
              className="btn-remove-card mt-3"
              onClick={() => {
                props.removeFromCart(product);
                setIsInStock(false);
              }}
            >
              REMOVE FROM CART
            </button>
          ) : (
            <button
              className="btn-buy-card mt-3"
              onClick={() => {
                props.addToCart(product);
                setIsInStock(true);
              }}
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return <>{Card_2()}</>;
};

const mapstate2props = (state) => {
  return {
    items: state.products,
  };
};
export default connect(mapstate2props, { addToCart, removeFromCart })(
  memo(Card)
);
