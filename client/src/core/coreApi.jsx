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

export const createOrder = (userId, token, order) => {
  return fetch(`${API_URL}/order/create/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const viewOrders = (userId, token) => {
  return fetch(`${API_URL}/order/get/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const detailOrder = (orderId, token) => {
  return fetch(`${API_URL}/order/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const orderStatus = () => {
  return fetch(`${API_URL}/order/status`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const setStatusOrder = (userId, orderId, token, status) => {
  return fetch(`${API_URL}/order/set-status/${orderId}/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteProduct = (userId, productId, token) => {
  return fetch(`${API_URL}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getUser = (userId, token) => {
  return fetch(`${API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateUser = (userId, token, user) => {
  return fetch(`${API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
