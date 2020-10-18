import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Cart from "./core/Cart";
import Home from "./core/Home";
import Product from "./core/Product";
import Shop from "./core/Shop";
import AdminDashboard from "./user/AdminDashboard";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import UserDashboard from "./user/UserDashboard";
import { connect } from "react-redux";
import { loadItemsLocalstorage } from "./actions/products";
import { useEffect } from "react";
import Order from "./admin/Order";
import DetailOrder from "./core/DetailOrder";
import Products from "./core/Products";
import UpdateUser from "./user/UpdateUser";

const Routes = (props) => {
  useEffect(() => props.loadItemsLocalstorage(), [props]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/user/dashboard">
          <UserDashboard />
        </PrivateRoute>
        <AdminRoute path="/admin/dashboard">
          <AdminDashboard />
        </AdminRoute>
        <AdminRoute path="/create/category">
          <AddCategory />
        </AdminRoute>
        <AdminRoute path="/create/product">
          <AddProduct />
        </AdminRoute>
        <AdminRoute path="/products" component={Products} />
        <AdminRoute path="/orders">
          <Order />
        </AdminRoute>
        <Route path="/product/:productId" component={Product} />
        <Route path="/cart" component={Cart} />
        <PrivateRoute path="/profile/update/:userId" component={UpdateUser} />
        <AdminRoute path="/order/:orderId" component={DetailOrder} />
      </Switch>
    </BrowserRouter>
  );
};

const map = (state) => {
  return {};
};

export default connect(map, { loadItemsLocalstorage })(Routes);
