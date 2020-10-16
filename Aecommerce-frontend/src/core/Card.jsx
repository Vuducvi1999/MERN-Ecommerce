import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import "../user/style.css";
// import { addToCart, isInCart, removeFromCart } from "./cartHelpers";
import { uuid } from "./uuid";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "./../actions/products";
import { _addToCart, _removeFromCart } from "./cartHelpers";

const Card = ({ product, ...props }) => {
  const [isInStock, setIsInStock] = useState();

  useEffect(() => {
    setIsInStock(props.items.find((p) => p._id === product._id) ? true : false);
  }, []);

  const handleChange = (e) => {
    if (e.target.checked) {
      label.current.innerText = " show less";
      showText.current.className = "d-inline";
    } else {
      label.current.innerText = " ...read more";
      showText.current.className = "d-none";
    }
    console.log(product);
  };

  const uniqueString = uuid();

  const label = useRef();
  const showText = useRef();

  const Card_2 = () => (
    <div className="padding-product">
      <div className={`product-card `}>
        <div className="image-container-card">
          <Link
            to={{ pathname: `/product/${product._id}`, hash: uniqueString }}
          >
            <img
              src={`${API_URL}/product/photo/${product._id}`}
              className="image-product-card"
              alt={product.name}
            />
          </Link>
        </div>
        <div className="detail-card">
          <p className="product-name-card">{product.name}</p>
          <p className="product-price-card">
            $<span>{product.price}</span>
          </p>
          <p className="product-sold-card d-inline-block m-0">Sold: &nbsp;</p>
          <h3 className="d-inline-block m-0">{product.sold}</h3>

          <p className="product-detail-card m-0">
            {product.description.length <= 50 ? (
              product.description
            ) : (
              <>
                {product.description.slice(0, 50)}
                <span ref={showText} className="d-none">
                  {product.description.slice(50)}
                </span>
                <label
                  style={{ color: "blue", cursor: "pointer" }}
                  className="d-inline"
                  ref={label}
                  htmlFor={uniqueString}
                >
                  ...read more
                </label>
                <input
                  type="checkbox"
                  id={uniqueString}
                  onChange={handleChange}
                  hidden
                />
              </>
            )}
          </p>
          <p className="product-category-card d-inline-block">
            Category: &nbsp;
          </p>
          <h3 className="product-category-h3">{product.category.name}</h3>
          {isInStock ? (
            <button
              className="btn-remove-card mt-3"
              onClick={() => {
                props.removeFromCart(product);
                _removeFromCart(product._id);
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
                _addToCart(product);
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
export default connect(mapstate2props, { addToCart, removeFromCart })(Card);
