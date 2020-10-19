import React, { useEffect, useState } from "react";
import { getCategories } from "../admin/apiAdmin";
import Card from "./Card";
import CheckBox from "./CheckBox";
import { getFilterProducts } from "./coreApi";
import Layout from "./Layout";
import RadioBox from "./RadioBox";
import { connect } from "react-redux";

function Shop(props) {
  const [categories, setCategories] = useState();
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });
  const [values, setValues] = useState({
    err: "",
    size: 0,
    limit: 6,
    skip: 0,
  });
  const [filtedProducts, setFiltedProduct] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });

    getFilterProducts(values.limit, values.skip, filters).then((data) => {
      setFiltedProduct(data.products);
      setValues({ ...values, size: data.size });
    });
  }, []);

  const isInCart = (id) =>
    props.items.find((p) => p._id === id) ? true : false;

  const handleFilter = (filter, filterBy) => {
    if (filterBy === "category") {
      getFilterProducts(values.limit, 0, {
        ...filters,
        category: filter,
      }).then((data) => {
        setFiltedProduct(data.products);
        setValues({ ...values, size: data.size, skip: 0 });
      });
      setFilters({ ...filters, category: filter });
    } else {
      getFilterProducts(values.limit, 0, {
        ...filters,
        price: filter,
      }).then((data) => {
        setFiltedProduct(data.products);
        setValues({ ...values, size: data.size, skip: 0 });
      });
      setFilters({ ...filters, price: filter });
    }
  };

  const loadMore = () => {
    getFilterProducts(values.limit, values.skip + values.size, {
      ...filters,
    }).then((data) => {
      setFiltedProduct([...filtedProducts, ...data.products]);
      setValues({
        ...values,
        size: data.size,
        skip: values.skip + values.size,
      });
    });
  };

  const loadMoreBtn = () =>
    values.size === values.limit && (
      <div className="col-12">
        <button className="btn btn-info" onClick={loadMore}>
          Load More
        </button>
      </div>
    );

  return (
    <Layout
      description="Best Shop in the world"
      className="container"
      title="AnhViPanDan"
    >
      <div className="row mb-5">
        <div className="col-md-3 col-sm-4">
          <h3>Filter by Category</h3>
          <ul className="ml-5">
            <CheckBox categories={categories} handleFilter={handleFilter} />
          </ul>
          <h3>Filter by Range</h3>
          <ul className="ml-5">
            <RadioBox handleFilter={handleFilter} />
          </ul>
        </div>
        <div className="col-md-9 col-sm-8">
          <div className="row">
            {filtedProducts.map((p) => (
              <div className="col-lg-4 col-md-6 col-sm-6 mb-3" key={p._id}>
                <Card product={p} isAdded={isInCart(p._id)} />
              </div>
            ))}
            {loadMoreBtn()}
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </Layout>
  );
}

const mapstate2props = (state) => {
  return {
    items: state.products,
  };
};
export default connect(mapstate2props, {})(Shop);
