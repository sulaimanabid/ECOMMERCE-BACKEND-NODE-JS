const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded());

//routes

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}); // curly braces means this will send all products from mongo
    res.status(200).json(products);
  } catch {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/products/add", async (req, res) => {
  // add
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/update/:id", async (req, res) => {
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

app.post("/products/:id", async (req, res) => {
  // find by id
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/delete/:id", async (req, res) => {
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

mongoose
  .connect(
    "mongodb+srv://sulaimanabid3:Salamander1999@cluster0.phqk2qg.mongodb.net/node-api"
  )
  .then(() => {
    console.log("connected to mongodb");
    app.listen(3000, () => {
      console.log("API IS RUNNING ON PORT 3000");
    });
  })
  .catch((err) => {
    console.log(err, "error");
  });
