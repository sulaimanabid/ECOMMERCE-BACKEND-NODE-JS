const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();

//middleware
app.use(express.json());

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

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
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
