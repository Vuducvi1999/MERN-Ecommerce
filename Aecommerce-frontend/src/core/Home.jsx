import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCategories } from "../admin/apiAdmin";
import Card from "./Card";
import Layout from "./Layout";
import Search from "./Search";
import { loadProducts } from "./../actions/products";

function Home({ items, arrival, sell, ...props }) {
  const [values, setValues] = useState({
    bySell: [],
    byArrival: [],
    categories: [],
    err: false,
  });

  const [skipArrival, setSkipArrival] = useState(0);
  const [skipSell, setSkipSell] = useState(0);
  const limit = 8;

  const getBySell = () => {
    props.loadProducts("sold");
  };

  const getByArrival = () => {
    props.loadProducts("createdAt");
  };

  const getCategory = () => {
    getCategories().then((data) => {
      setValues({ ...values, categories: data });
    });
  };

  const loadMoreArrival = () => (
    <>
      <div className="col-12">
        <button
          className="btn btn-info"
          onClick={() => setSkipArrival(skipArrival + limit)}
        >
          Load More
        </button>
      </div>
    </>
  );
  const loadMoreSell = () => (
    <>
      <div className="col-12">
        <button
          className="btn btn-info"
          onClick={() => setSkipSell(skipSell + limit)}
        >
          Load More
        </button>
      </div>
    </>
  );

  useEffect(() => {
    getByArrival();
    getBySell();
    getCategory();
  }, []);

  return (
    <div>
      <Layout title="Home" description="Welcome to AnhViPanDan Shop">
        <div className="container">
          <Search categories={values.categories} />
          <h2 className="mb-4">New Arrival</h2>
          <div className="row mb-5">
            <div className="col-md-12 col-sm-12">
              <div className="row">
                {arrival.length ? (
                  arrival.slice(0, skipArrival + limit).map((i, k) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 mb-3"
                      key={i._id}
                    >
                      <Card product={i} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">Nothing here...</div>
                )}
                {skipArrival + limit < arrival.length ? loadMoreArrival() : ""}
              </div>
            </div>
          </div>

          <h2 className="mb-4">Best Sell</h2>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="row">
                {sell.length ? (
                  sell.slice(0, skipSell + limit).map((i, k) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 mb-3"
                      key={i._id}
                    >
                      <Card product={i} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">Nothing here...</div>
                )}
                {skipSell + limit < sell.length ? loadMoreSell() : ""}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

const mapstate2props = (state) => {
  return {
    items: state.products,
    arrival: state.arrival,
    sell: state.sell,
  };
};

export default connect(mapstate2props, { loadProducts })(Home);
