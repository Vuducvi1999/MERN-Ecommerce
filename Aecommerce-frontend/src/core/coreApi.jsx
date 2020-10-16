import { API_URL } from "../config";

export const getProducts = (sortBy, order = "desc", limit = 100) => {
  return fetch(
    `${API_URL}/products?sortBy=${sortBy}&order=${order}&limit=${limit}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getFilterProducts = (limit, skip, filters = {}) => {
  return fetch(`${API_URL}/products/by/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filters, limit, skip }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const searchHomeProducts = ({ name, category }) => {
  return fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, category }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const singleProduct = (id) => {
  return fetch(`${API_URL}/product/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// route.get("/products/related/:productId", RelatedList);
export const relatedProduct = (id) => {
  return fetch(`${API_URL}/products/related/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
