import React, { useEffect, useState } from "react";
import { getCategories } from "../admin/apiAdmin";
import Card from "./Card";
import CheckBox from "./CheckBox";
import { getFilterProducts } from "./coreApi";
import Layout from "./Layout";
import RadioBox from "./RadioBox";
import { connect } from "react-redux";
import { uuid } from "./uuid";

function Shop(props) {
  const [categories, setCategories] = useState();
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });
  const [values, setValues] = useState({
    err: "",
    size: 0,
    limit: 1000000,
    skip: 0,
  });
  const [filtedProducts, setFiltedProduct] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });

    getFilterProducts(values.limit, values.skip, filters).then((data) => {
      setPagination(1);
      const payloadData = data.products.map((item) => {
        if (item.category) return item;
        else item.category = { name: "None" };
        return item;
      });
      setFiltedProduct(payloadData);
      setValues({ ...values, size: data.size });
    });
  }, []);

  useEffect(() => {
    let sl = Math.ceil(filtedProducts.length / 6);
    let result = [];
    for (let i = 1; i < sl + 1; i++) result.push(i);
    setPages(result);
  }, [filtedProducts]);

  const isInCart = (id) =>
    props.items.find((p) => p._id === id) ? true : false;

  const handleFilter = (filter, filterBy) => {
    if (filterBy === "category") {
      getFilterProducts(values.limit, 0, {
        ...filters,
        category: filter,
      }).then((data) => {
        setPagination(1);
        const payloadData = data.products.map((item) => {
          if (item.category) return item;
          else item.category = { name: "None" };
          return item;
        });
        setFiltedProduct(payloadData);
        setValues({ ...values, size: data.size, skip: 0 });
      });
      setFilters({ ...filters, category: filter });
    } else {
      getFilterProducts(values.limit, 0, {
        ...filters,
        price: filter,
      }).then((data) => {
        setPagination(1);
        const payloadData = data.products.map((item) => {
          if (item.category) return item;
          else item.category = { name: "None" };
          return item;
        });
        setFiltedProduct(payloadData);
        setValues({ ...values, size: data.size, skip: 0 });
      });
      setFilters({ ...filters, price: filter });
    }
  };

  const loadMore = () => {
    getFilterProducts(values.limit, values.skip + values.size, {
      ...filters,
    }).then((data) => {
      setPagination(1);
      const payloadData = data.products.map((item) => {
        if (item.category) return item;
        else item.category = { name: "None" };
        return item;
      });
      setFiltedProduct([...filtedProducts, ...payloadData]);
      setValues({
        ...values,
        size: data.size,
        skip: values.skip + values.size,
      });
    });
  };

  const LoadPagination = () => (
    <ul className="pagination">
      <li
        className="page-item page-link"
        onClick={() => {
          if (pagination === 1) return;
          setPagination(pagination - 1);
        }}
      >
        Previous
      </li>
      {pages.map((p) => {
        return p === pagination ? (
          <li
            className="page-item page-link"
            style={{ backgroundColor: "#007bff", color: "#fff" }}
            key={uuid()}
            onClick={() => {
              setPagination(p);
            }}
          >
            <a className="">{p}</a>
          </li>
        ) : (
          <li
            onClick={() => {
              setPagination(p);
            }}
            className="page-item page-link"
            key={uuid()}
          >
            {p}
          </li>
        );
      })}
      <li
        onClick={() => {
          if (pagination === pages.length) return;
          setPagination(pagination + 1);
        }}
        className="page-item page-link"
      >
        Next
      </li>
    </ul>
  );

  return (
    <Layout
      description="Best Shop in the world"
      className="container"
      title="AnhViPanDan"
    >
      <div className="row no-gutters mb-5">
        <div className="col-md-3 col-sm-4">
          <h3 className="box-sm-center">Filter by Category</h3>
          <div className="box-sm-center">
            <ul className="ml-5">
              <CheckBox categories={categories} handleFilter={handleFilter} />
            </ul>
          </div>
          <h3 className="box-sm-center">Filter by Range</h3>
          <div className="box-sm-center">
            <ul className="ml-5">
              <RadioBox handleFilter={handleFilter} />
            </ul>
          </div>
        </div>
        <div className="col-md-9 col-sm-8">
          <div className="row no-gutters">
            {filtedProducts
              .slice((pagination - 1) * 6, pagination * 6)
              .map((p) => (
                <div
                  className="col-lg-4 p-2 col-md-6 col-sm-6 mb-3"
                  key={p._id}
                >
                  <div className="mx-4 mx-sm-0">
                    <Card product={p} isAdded={isInCart(p._id)} />
                  </div>
                </div>
              ))}
            <div className="col-12 d-flex justify-content-center">
              {LoadPagination()}
            </div>
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
