import React, { memo, useState } from "react";
import { API_URL } from "../config";
// import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadReviews } from "../actions/products";
import StarRating from "./StarRating";

function Review({ review, product, loadReviews, user, ...props }) {
  const [values, setValues] = useState({
    rate: 0,
    review: "",
  });

  function changeRating(newRating) {
    setValues({ ...values, rate: newRating });
  }

  const SubmitReview = (e) => {
    e.preventDefault();
    setValues({ rate: 0, review: "" });
    fetch(`${API_URL}/products/rate/${product._id}/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rate: {
          user: user._id,
          rate: values.rate,
          review: values.review,
        },
      }),
    });

    if (review.find((p) => p.user._id === user._id)) {
      review.forEach((p) => {
        if (p.user._id === user._id) {
          p.rate = values.rate;
          p.review = values.review;
        }
      });
    } else
      review = [
        ...review,
        {
          user: user._id,
          rate: values.rate,
          review: values.review,
        },
      ];

    loadReviews(review);
    console.log(review);
  };

  const Review = () => (
    <div className="mt-5">
      <h5>YOUR REVIEW</h5>
      {user ? (
        <div className="person-review">
          <div className="d-flex align-items-center">
            <span>Vote:&nbsp;</span>
            <StarRating
              size="1.5rem"
              className="py-2"
              childStyle={{ paddingRight: "5px" }}
              rate={values.rate}
              onChange={changeRating}
              hover={true}
            />
          </div>
          <form onSubmit={SubmitReview}>
            <div className="form-group mb-1">
              <textarea
                className="form-control"
                value={values.review}
                onChange={(e) => {
                  setValues({ ...values, review: e.target.value });
                }}
                placeholder="Write your review..."
              />
            </div>
            <button type="submit" className="btn btn-dark ml-auto d-block">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-light rounded p-3">
          Please <Link to="/signin">sign in</Link> to write your review
        </div>
      )}
      <h5>REVIEWS</h5>
      {review.length ? (
        review.map((p) => (
          <div className="rated-view" key={p._id}>
            <p className="m-0">{p.user.name}</p>

            <StarRating rate={p.rate} />
            <p>{new Date(p.updatedAt).toLocaleDateString()}</p>
            <p style={{ marginTop: "1rem" }}>
              {p.review ? (
                p.review
              ) : (
                <span className="text-muted small font-italic">
                  User didn't comment
                </span>
              )}
            </p>
          </div>
        ))
      ) : (
        <div>No comment</div>
      )}
    </div>
  );
  return <>{Review()}</>;
}

const mapstate2props = (state) => {
  return {
    review: state.review,
  };
};

export default connect(mapstate2props, { loadReviews })(memo(Review));
