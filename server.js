const express = require("express");
const mongoose = require("mongoose");
const productRoute = require('./routes/productRoute')


const PORT = process.env.PORT || 3000
const app = express();

app.use('/api/products', productRoute)

//middleware
app.use(express.json());
app.use(express.urlencoded());

mongoose
  .connect(
    "mongodb+srv://sulaimanabid3:Salamander1999@cluster0.phqk2qg.mongodb.net/node-api"
  )
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`API IS RUNNING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "error");
  });
