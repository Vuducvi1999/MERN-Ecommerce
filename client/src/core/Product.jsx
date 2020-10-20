import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../config";
import { relatedProduct, singleProduct } from "./coreApi";
import Layout from "./Layout";
import moment from "moment";
import Card from "./Card";
import { connect } from "react-redux";
import {
  addToCart,
  loadReviews,
  removeFromCart,
  updateItems,
} from "./../actions/products";
// import ReactStars from "react-rating-stars-component";
import { uuid } from "./uuid";
import { isAuth } from "../auth";
import Review from "./Review";
import { memo } from "react";
import StarRating from "./StarRating";
import { useRef } from "react";

function Product(props) {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(0);
  const [related, setRelated] = useState([]);
  const [isInStock, setIsInStock] = useState(false);
  const [willReload, setWillReload] = useState(true);

  const { user } = isAuth();

  useEffect(() => {
    singleProduct(props.match.params.productId).then((data) => {
      setProduct(data.product);
      props.loadReviews(data.product.rate);

      console.log(data.product);

      const item = props.items.find((p) => p._id === data.product._id);
      setTotal(item ? item.quantity : 0);
      setIsInStock(item ? true : false);
    });

    relatedProduct(props.match.params.productId).then((data) => {
      setRelated(data);
    });
  }, [props.match.params.productId]);

  const handleChange = (e) => {
    if (e.target.checked) {
      label.current.innerText = " show less";
      showText.current.className = "d-inline";
    } else {
      label.current.innerText = " ...read more";
      showText.current.className = "d-none";
      window.scrollTo(0, 0);
    }
  };
  const unique = uuid();
  const label = useRef();
  const showText = useRef();

  const RelatedProducts = () => (
    <>
      {related.map((p, k) => (
        <div className="col-md-12 col-sm-6 mb-3" key={k}>
          <Card product={p} />
        </div>
      ))}
    </>
  );

  const Detail = () => (
    <>
      <div className="col-md-9 col-sm-12">
        <div className="product">
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${API_URL}/product/photo/${product._id})`,
            }}
          ></div>
          <div className="info-product">
            <div className="detail-container">
              <div className="name-product">
                <h1>{product.name}</h1>
              </div>

              <div className="price-product">
                $<span className="price"> {product.price}</span>
              </div>
              <hr />
              <div className="detail-product">
                <span className="detail">
                  {product.description.slice(0, 100)}
                  <span ref={showText} className="d-none">
                    {product.description.slice(100)}
                  </span>
                  {product.description.length > 100 ? (
                    <label
                      className="small text-info d-block"
                      ref={label}
                      htmlFor={unique}
                      style={{ cursor: "pointer" }}
                    >
                      ... Read more
                    </label>
                  ) : (
                    ""
                  )}
                  <input
                    type="checkbox"
                    id={unique}
                    onChange={handleChange}
                    hidden
                  />
                </span>
              </div>
              <div className="d-flex ">
                <span className="sold-product">
                  Sold&nbsp;<span className="sold">{product.sold}</span>
                </span>
                <span className="category-product">
                  Category&nbsp;
                  <span className="category">{product.category.name} </span>
                </span>
              </div>
              <div className="d-flex ">
                <span className="updated-product">
                  Updated&nbsp;
                  <span className="updated">
                    {moment(product.createdAt).fromNow()}
                  </span>
                </span>
                <span className="availability-product">
                  Availability&nbsp;
                  <span className="availability">
                    {isInStock ? (
                      <span className="badge badge-danger">In Stock</span>
                    ) : (
                      <span className="badge badge-warning">Out Stock</span>
                    )}
                  </span>
                </span>
              </div>
              <div className="review-rate d-flex align-items-center">
                <StarRating
                  size="1.5rem"
                  className="py-2"
                  childStyle={{ paddingRight: "5px" }}
                  rate={
                    product.rate.length !== 0
                      ? product.rate.reduce((p, x) => p + x.rate, 0) /
                        product.rate.length
                      : 0
                  }
                />
                <span className="number-review ml-3">
                  {product.rate.length !== 0 ? product.rate.length : 0}
                  &nbsp;reviews
                </span>
              </div>
              <div className="calculate-product">
                <div className="crement">
                  <button
                    className="decre"
                    onClick={() => {
                      setTotal(total - 1 < 0 ? 0 : total - 1);
                      props.updateItems(
                        product._id,
                        total - 1 < 0 ? 0 : total - 1
                      );
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="input-total"
                    value={total}
                    onChange={(e) =>
                      setTotal(e.target.value ? e.target.value : 0)
                    }
                    name="total"
                  />
                  <button
                    className="incre"
                    onClick={() => {
                      setTotal(total + 1);
                      props.updateItems(product._id, total + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="total-price">
                  $&nbsp;{total * product.price}
                </div>
              </div>

              {isInStock ? (
                <button
                  className="btn-remove-card btn-buy-product"
                  onClick={() => {
                    props.removeFromCart(product);
                    setIsInStock(false);
                  }}
                >
                  REMOVE FROM CART
                </button>
              ) : (
                <button
                  className="btn-buy-card btn-buy-product"
                  onClick={() => {
                    props.addToCart(product);
                    setIsInStock(true);
                  }}
                >
                  Add To Card
                </button>
              )}
            </div>
          </div>
        </div>
        <Review
          setWillReload={setWillReload}
          product={product}
          currentLocation={props.match.params.productId}
          user={user}
        />
      </div>
      <div className="col-md-3 col-sm-12">
        <div className="related-product">
          <h3>Related Products</h3>
          <div className="row ">{RelatedProducts()}</div>
        </div>
      </div>
    </>
  );

  return (
    <Layout
      key={unique}
      reload={willReload}
      description="Serve your needs"
      title="Product Detail"
    >
      <div className="container">
        <div className="row">
          {product ? (
            Detail()
          ) : (
            <h3 className="text-info col-12 text-center">
              <div className="rounded p-3">Waiting...</div>
            </h3>
          )}
        </div>
      </div>
    </Layout>
  );
}

const mapstate2props = (state) => {
  return {
    items: state.products,
    review: state.review,
  };
};

export default connect(mapstate2props, {
  addToCart,
  removeFromCart,
  updateItems,
  loadReviews,
})(memo(Product));
