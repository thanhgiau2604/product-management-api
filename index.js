const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

const productController = require("./api/controllers/productController");

app.use(function (_, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization,x-access-token"
  );
  next();
});

mongoose.mongoose.connect(
  "mongodb+srv://giaunguyen-te:PGCPsyYUXicBdqbh@cluster0.fydn6a4.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "product-managements",
  }
);

console.log(mongoose.connection.readyState);
productController(app);

app.listen(PORT, () => console.log("App listening on PORT " + PORT));
