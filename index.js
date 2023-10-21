const express = require('express');
const app = express();

// Sample product data
let products = [
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

// Middleware to parse JSON in request body
app.use(express.json());

// Get the list of products
app.get('/products', (req, res) => {
  res.json(products);
});

// Add a new product
// Add a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;

  // Define the expected fields
  const expectedFields = ['name', 'price', 'unit', 'availableAmount'];

  // Check for required fields
  for (const field of expectedFields) {
    if (!newProduct[field]) {
      return res.status(400).json({ message: `Missing required field: ${field}` });
    }
  }

  // Check for unexpected fields
  for (const field in newProduct) {
    if (!expectedFields.includes(field)) {
      return res.status(400).json({ message: `Unexpected field: ${field}` });
    }
  }

  // Validate data types
  if (typeof newProduct.name !== 'string' ||
      typeof newProduct.price !== 'number' ||
      typeof newProduct.unit !== 'string' ||
      typeof newProduct.availableAmount !== 'number') {
    return res.status(400).json({ message: 'Invalid data types' });
  }

  // Add the validated product to the list
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Delete a product by name
app.delete('/products/:name', (req, res) => {
  const productName = req.params.name;
  const index = products.findIndex((product) => product.name === productName);

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1)[0];
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
