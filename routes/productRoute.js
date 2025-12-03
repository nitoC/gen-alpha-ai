const { getProducts, getProduct } = require("../controllers/productController");

const express = require("express");
const router = express.Router();

//get all products
router.get("/products", getProducts);

// get product by id
router.get("/products/:id", getProduct);

module.exports = router;
