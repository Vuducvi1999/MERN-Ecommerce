import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isAuth } from "../auth";
import { deleteProduct, getProducts } from "./coreApi";
import Layout from "./Layout";

function Products({ ...props }) {
  const [products, setProducts] = useState([]);

  const getBySell = () => {
    getProducts("sold").then((data) => {
      setProducts([...data]);
    });
  };

  const { user, token } = isAuth();

  useEffect(() => {
    getBySell();
  }, []);

  const Delete = (productId) => {
    deleteProduct(user._id, productId, token);
    setProducts(products.filter((p) => p._id !== productId));
  };

  return (
    <Layout description="Manage all products" className="container">
      <div
        className="row no-gutters"
        style={{ fontFamily: "Raleway,san-serif" }}
      >
        <div className="col-12 d-flex justify-content-between">
          <h3>Products</h3>
          <Link to="/create/product">
            <button className="btn btn-dark">Create</button>
          </Link>
        </div>
        <table className="table table-bordered">
          <thead style={{ fontWeight: "700" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <th>{p._id}</th>
                <th>{p.name}</th>
                <th>{p.price}</th>
                <th>{p.category ? p.category.name : 'None'}</th>
                <th>
                  <span
                    className="text-danger"
                    onClick={() => Delete(p._id)}
                    style={{ cursor: "pointer" }}
                  >
                    delete
                  </span>
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
export default connect(mapstate2props, {})(Products);
