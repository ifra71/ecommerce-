// const express = require('express');
// const Product = require('../models/Product');
// const router = express.Router();

// // Create a new product
// router.post('/', async (req, res) => {
//   const newProduct = new Product(req.body);
//   await newProduct.save();
//   res.status(201).json(newProduct);
// });

// // Get all products
// router.get('/', async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // Update a product
// router.put('/:id', async (req, res) => {
//   const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedProduct);
// });

// // Delete a product
// router.delete('/:id', async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Product deleted' });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add product
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
