import React, { useState } from "react";
import { isAuth } from "../auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "./coreApi";
import { resetItems } from "../actions/products";

function Checkout({ items, ...props }) {
  const { user, token } = isAuth();
  const [values, setValues] = useState({
    address: "",
    sdt: "",
    err: "",
    success: false,
  });

  const { address, sdt } = values;

  const signinBtn = () => (
    <Link to="/signin">
      <button className="btn btn-primary">Sign in to process</button>
    </Link>
  );
  const checkoutBtn = () => (
    <button className="btn btn-success" type="submit">
      Checkout
    </button>
  );

  const showErr = () => (
    <>
      {values.err ? (
        <div className="h5 text-danger pb-2">{values.err}</div>
      ) : (
        ""
      )}
    </>
  );
  const showSuccess = () => (
    <>
      {values.success ? (
        <div className="h5 text-success pb-2">Process Success</div>
      ) : (
        ""
      )}
    </>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    items.find((i) => i.quantity === 0)
      ? setValues({ ...values, err: "Couldn't process empty product" })
      : createOrder(user._id, token, {
          products: items,
          amount: items.reduce((pre, cur) => pre + cur.quantity * cur.price, 0),
          address,
          user,
          sdt,
        }).then((data) => {
          if (data.err) setValues({ ...values, err: data.err });
          else {
            setValues({ address: "", sdt: "", err: "", success: true });
            props.resetItems();
          }
        });
  };
  return (
    <>
      <div className="info-checkout">
        {showErr()}
        {showSuccess()}
        <form onSubmit={onSubmit}>
          <label className="font-weight-light text-muted d-block">
            Delivery Address
            <textarea
              className="form-control mt-2"
              placeholder="Ex: Khu 4B, Thi Tran Con, Hai Hau, Nam Dinh"
              value={address}
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
            />
          </label>
          <label className="font-weight-light text-muted d-block">
            Phone contact
            <input
              type="text"
              className="form-control mt-2"
              value={sdt}
              onChange={(e) => setValues({ ...values, sdt: e.target.value })}
            />
          </label>
          {isAuth() ? checkoutBtn() : signinBtn()}
        </form>
      </div>
    </>
  );
}

const mapstate2props = (state) => {
  return {
    items: state.products,
  };
};

export default connect(mapstate2props, { resetItems })(Checkout);
