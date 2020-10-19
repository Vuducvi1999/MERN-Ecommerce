import { API_URL } from "../config";

export const signup = ({ name, email, password }) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const signin = ({ email, password }) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    fetch(`${API_URL}/signout`, {
      method: "GET",
    });
  }
};

export const isAuth = () => {
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  return false;
};
