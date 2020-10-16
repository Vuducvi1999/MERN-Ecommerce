import React, { useState } from "react";
import { memo } from "react";
import Card from "./Card";
import { searchHomeProducts } from "./coreApi";

function Search({ categories }) {
  const [values, setValues] = useState({
    category: "default",
    name: "",
    products: [],
    err: "",
  });

  const { category, name, products } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    searchHomeProducts({ name, category }).then((data) => {
      console.log(data);
      if (data.err || data.length === 0)
        return setValues({
          ...values,
          products: [],
          err: data.err || "Products not found",
        });
      else {
        return setValues({ ...values, err: "", products: data });
      }
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showProducts = () =>
    values.products.length !== 0 && (
      <>
        {values.products.map((p) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={p._id}>
            <Card key={p._id} product={p} />
          </div>
        ))}
      </>
    );
  const showErr = () =>
    values.products.length === 0 &&
    (values.err ? (
      <h3 className="text-danger col-12">
        <div className="bg-light rounded p-3">{values.err} </div>
      </h3>
    ) : (
      <h3 className="text-info col-12">
        <div className="bg-light rounded p-3">You haven't search </div>
      </h3>
    ));

  return (
    <>
      <h2 className="mb-3">Search</h2>
      <form className="row no-gutters" onSubmit={handleSubmit}>
        <div className="input-group input-group-lg col-10 pr-3">
          <div className="input-group-prepend">
            <select
              className="input-group-text"
              name="category"
              onChange={handleChange}
              value={values.category}
            >
              <option value="default" disabled>
                Search for category
              </option>
              {categories.map((p, k) => (
                <option key={k} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search for name"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className="col-2">
          <button className="btn btn-info btn-block btn-lg">Search</button>
        </div>
      </form>
      <div className="row my-3">
        {showProducts()}
        {showErr()}
      </div>
    </>
  );
}

export default memo(Search);
