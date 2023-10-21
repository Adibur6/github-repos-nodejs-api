const express = require('express');
const app = express();

// Sample product data
const products = [
  {
    name: 'Product 1',
    price: 10.99,
    unit: 'Piece',
    availableAmount: 50,
  },
  {
    name: 'Product 2',
    price: 15.99,
    unit: 'Piece',
    availableAmount: 30,
  },
  {
    name: 'Product 3',
    price: 7.49,
    unit: 'Piece',
    availableAmount: 75,
  },
];

// Define a route to get the product list
app.get('/products', (req, res) => {
  res.json(products);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
