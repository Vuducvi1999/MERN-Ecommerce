/**
 * Add Item:
 * check product in localStorage is unique
 * if not unique then add
 * if already have then not add
 */

let items = JSON.parse(localStorage.getItem("cart"));

export const _totalItems = () => {
  if (!items) return 0;
  else return items.length;
};

export const _updateItems = (id, count) => {
  if (!items) return;
  items.map((p) => {
    if (p._id === id) {
      p.quantity = count;
    }
  });

  localStorage.setItem("cart", JSON.stringify(items));
};

export const _totalPrice = () => {
  if (!items) return 0;
  return items.reduce((pre, cur, index) => pre + cur.quantity * cur.price, 0);
};

export const _isInCart = (id) => {
  if (!items) return false;
  if (items.find((p) => p._id === id)) return true;
  return false;
};

export const _removeFromCart = (id) => {
  if (!items) return;
  items = items.filter((p) => p._id !== id);
  localStorage.setItem("cart", JSON.stringify(items));
};

export const _addToCart = (product) => {
  if (!items) {
    localStorage.setItem("cart", JSON.stringify([product]));
  } else if (items.find((p) => p._id === product._id)) return;
  else {
    items.push(product);
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

export const _cartItems = () => items;
