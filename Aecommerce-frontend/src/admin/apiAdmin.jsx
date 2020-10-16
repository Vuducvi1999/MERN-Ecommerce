import { API_URL } from "../config";

export const CreateCategory = (userId, token, categoryName) => {
  return fetch(`${API_URL}/category/create/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: categoryName }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const CreateProduct = (userId, token, product) => {
  return fetch(`${API_URL}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API_URL}/categories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
