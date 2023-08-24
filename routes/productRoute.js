const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}); // curly braces means this will send all products from mongo
    res.status(200).json(products);
  } catch {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  // add
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("update/:id", async (req, res) => {
  // update
  try {
    console.log(req, "request");
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `cannot find the product` });
    }
    const updatedData = await Product.findById(id);
    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id", async (req, res) => {
  // find by id
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // find by id
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res
        .status(200)
        .json({ message: "Successfully deleted", deletedProduct: product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router