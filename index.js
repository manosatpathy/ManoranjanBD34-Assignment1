const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());

let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];

// Endpoint 1: Add an Item to the Cart
function addNewItem(cart, productId, name, price, quantity) {
  const newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(newItem);
  return cart;
}

app.get("/cart/add", (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseFloat(req.query.price);
  const quantity = parseInt(req.query.quantity);
  const allItems = addNewItem(cart, productId, name, price, quantity);
  res.json({ cartItems: allItems });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
function updateItem(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get("/cart/edit", (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);
  const result = updateItem(cart, productId, quantity);
  res.json({ cartItems: result });
});

// Endpoint 3: Delete an Item from the Cart
app.get("/cart/delete", (req, res) => {
  const productId = parseInt(req.query.productId);
  const result = cart.filter((item) => item.productId !== productId);
  res.json({ cartItems: result });
});

// Endpoint 4: Read Items in the Cart
app.get("/cart", (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
function totalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}

app.get("/cart/total-quantity", (req, res) => {
  const result = totalQuantity(cart);
  res.json({ totalQuantity: result });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
function totalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get("/cart/total-price", (req, res) => {
  const result = totalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
