import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCategories } from "../admin/apiAdmin";
import Card from "./Card";
import { isInCart } from "./cartHelpers";
import { getProducts } from "./coreApi";
import Layout from "./Layout";
import Search from "./Search";

function Home(props) {
  const [values, setValues] = useState({
    bySell: [],
    byArrival: [],
    categories: [],
    err: false,
  });

  const getBySell = () => {
    getProducts("sold").then((data) => {
      if (data.err) setValues({ ...values, err: data.err });
      setValues((values) => ({ ...values, bySell: data }));
    });
  };

  const getByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.err) setValues({ ...values, err: data.err });
      setValues((values) => ({ ...values, byArrival: data }));
    });
  };

  const getCategory = () => {
    getCategories().then((data) => {
      setValues({ ...values, categories: data });
    });
  };

  const isInCart = (id) =>
    props.items.find((p) => p._id === id) ? true : false;

  useEffect(() => {
    getByArrival();
    getBySell();
    getCategory();
  }, []);

  return (
    <div>
      <Layout title="Home" description="Welcome to AnhViPanDan Shop">
        <div className="container-fluid">
          <Search categories={values.categories} />
          <h2 className="mb-4">New Arrival</h2>
          <div className="row">
            {values.byArrival.length ? (
              values.byArrival.map((i, k) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={k}>
                  <Card product={i} isAdded={isInCart(i._id)} />
                </div>
              ))
            ) : (
              <div className="col-12">Nothing here...</div>
            )}
          </div>

          <h2 className="mb-4">Best Sell</h2>
          <div className="row">
            {values.bySell.length ? (
              values.bySell.map((i, k) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={k}>
                  <Card product={i} isAdded={isInCart(i._id)} />
                </div>
              ))
            ) : (
              <div className="col-12">Nothing here...</div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

const mapstate2props = (state) => {
  return {
    items: state.products,
  };
};
export default connect(mapstate2props, {})(Home);
