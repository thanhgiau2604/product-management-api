const bodyParser = require("body-parser");
const { now } = require("lodash");
const parser = bodyParser.urlencoded({ extended: false });
const Product = require("../models/product");

module.exports = function (app) {
  app.get("/products", (_, res) => {
    Product.find({}, function (err, data) {
      res.send({ success: !err, error_msg: err?.message, data });
    });
  });

  app.post("/product", parser, (req, res) => {
    const { product_name, description, price, image_url } = req.body;
    const created_at = now();
    const updated_at = now();

    Product.create(
      {
        product_name,
        description,
        price,
        image_url,
        created_at,
        updated_at,
      },
      function (err) {
        console.log(err);
        res.send({ success: !err, error_msg: err?.message });
      }
    );
  });

  app.get("/product/:productId", parser, (req, res) => {
    const id = req.params.productId;

    Product.findOne({ _id: id }, function (err, data) {
      res.send({ success: !err, error_msg: err?.message, data });
    });
  });

  app.put("/product/:productId", parser, (req, res) => {
    const id = req.params.productId;
    const { product_name, description, price, image_url } = req.body;
    const updated_at = now();

    Product.updateOne(
      { _id: id },
      { product_name, description, price, image_url, updated_at },
      function (err) {
        res.send({ success: !err, error_msg: err?.message });
      }
    );
  });

  app.delete("/product/:productId", (req, res) => {
    const id = req.params.productId;

    Product.deleteOne({ _id: id }, function (err) {
      res.send({ success: !err, error_msg: err?.message });
    });
  });
};
