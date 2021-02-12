import Product from "../models/product.js";
import slugify from "slugify";

export function createProduct(req, res) {
  const { name, price, quantity, category, description } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => ({ img: file.filename }));
  }
  const product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    category,
    productPictures,
    description,
    createdBy: res.locals.user,
  });

  product
    .save()
    .then((product) => res.status(201).json(product))
    .catch((error) => res.status(400).json(error));
}

export function getProduct(req, res) {
  Product.find({ createdBy: res.locals.user }).then((products) =>
    res.status(201).json(products)
  );
}

export function deleteProduct(req, res) {
  Product.deleteOne({ createdBy: res.locals.user, _id: req.body._id })
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(400).json(error));
}
