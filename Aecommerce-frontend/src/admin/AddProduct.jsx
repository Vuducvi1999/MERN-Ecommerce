import React, { useEffect, useState } from "react";
import { isAuth } from "../auth";
import Layout from "../core/Layout";
import { CreateProduct, getCategories } from "./apiAdmin";

function AddProduct() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    categories: [],
    category: "",
    quantity: 0,
    sold: 0,
    photo: "",
    shipping: false,
    err: "",
    redirect: false,
    success: false,
    formData: "",
  });

  let {
    name,
    description,
    price,
    categories,
    quantity,
    sold,
    formData,
  } = values;

  useEffect(() => {
    getCategories().then((data) => {
      setValues({ ...values, categories: data, formData: new FormData() });
    });
  }, []);

  const { user, token } = isAuth();

  const showErr = () =>
    values.err ? <h3 className="text-danger">{values.err}</h3> : "";

  const showSuccess = () =>
    values.success ? (
      <h3 className="text-success">Add {`${name}`} success!</h3>
    ) : (
      ""
    );

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = name === "photo" ? target.files[0] : target.value;
    formData.set(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateProduct(user._id, token, formData).then((data) => {
      if (data.err) setValues({ ...values, err: data.err, success: false });
      else {
        setValues({ ...values, err: false, success: true });
      }
      window.scrollTo(0, 0);
    });
  };

  const formProduct = () => (
    <form onSubmit={handleSubmit}>
      {showErr()}
      {showSuccess()}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={handleChange}
          value={name}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          rows="5"
          name="description"
          className="form-control"
          onChange={handleChange}
          value={description}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          onChange={handleChange}
          value={price}
        />
      </div>

      <div className="form-group">
        <label>Sold</label>
        <input
          type="number"
          name="sold"
          className="form-control"
          onChange={handleChange}
          value={sold}
        />
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          onChange={handleChange}
          value={quantity}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          type="number"
          name="category"
          className="form-control"
          onChange={handleChange}
        >
          <option selected disabled>
            Select
          </option>
          {categories.map((i, k) => (
            <option value={i._id} key={k}>
              {i.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option selected disabled>
            Select
          </option>

          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Photo</label>
        <input
          type="file"
          name="photo"
          className="form-control bg-secondary text-light"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-outline-primary">
        Create Product
      </button>
    </form>
  );

  return (
    <Layout title="Add Product" description={`Ready to add new product!`}>
      <div className="container">
        <div className="col-md-6 offset-md-3" style={{ marginBottom: "20vh" }}>
          {formProduct()}
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;