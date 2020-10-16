import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { isAuth, signout } from "../auth";
import "../user/style.css";
import { totalItems } from "./cartHelpers";
import Logo from "./Logo.png";
import { connect } from "react-redux";

const Menu = (props) => {
  // const [total, setTotal] = useState(0);

  // useEffect(() => setTotal(totalItems()), [localStorage.getItem("cart")]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light justify-content-end py-2"
      style={{ backgroundImage: "linear-gradient(90deg,#00c4cc,#7d2ae8)" }}
    >
      <NavLink
        to="/"
        exact
        className="navbar-brand mr-auto"
        style={{ height: "100%" }}
        href="#"
      >
        <img src={Logo} style={{ height: "2.5rem" }} />
      </NavLink>

      <NavLink
        to="/"
        exact
        className="nav-link text-light light-border rounded mx-1 "
        activeStyle={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
      >
        Home
      </NavLink>
      <NavLink
        to="/shop"
        className="nav-link text-light light-border rounded mx-1"
        activeStyle={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
      >
        Shop
      </NavLink>
      <NavLink
        to="/cart"
        className="nav-link text-light light-border rounded mx-1"
        activeStyle={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
      >
        Cart&nbsp;
        <span className="badge badge-light">
          {props.items.length ? props.items.length : ""}
        </span>
      </NavLink>
      {isAuth() && isAuth().user.role === 0 && (
        <NavLink
          to="/user/dashboard"
          className="nav-link text-light light-border rounded mx-1"
          activeStyle={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
        >
          Dashboard
        </NavLink>
      )}
      {isAuth() && isAuth().user.role === 1 && (
        <NavLink
          to="/admin/dashboard"
          className="nav-link text-light light-border rounded mx-1"
          activeStyle={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
        >
          Dashboard
        </NavLink>
      )}
      {!isAuth() ? (
        <>
          <NavLink
            to="/signup"
            className="nav-link text-light light-border rounded mx-1"
            activeStyle={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/signin"
            className="nav-link text-light light-border rounded mx-1"
            activeStyle={{ backgroundColor: "hsla(0,0%,100%,.1)" }}
          >
            Sign In
          </NavLink>
        </>
      ) : (
        ""
      )}
      {isAuth() ? (
        <NavLink
          to="/"
          className="nav-link text-light light-border rounded mx-1"
          onClick={() => {
            signout();
          }}
        >
          Sign Out
        </NavLink>
      ) : (
        ""
      )}
    </nav>
  );
};
const mapstate2props = (state) => {
  return {
    items: state.products,
  };
};

export default connect(mapstate2props, {})(Menu);
