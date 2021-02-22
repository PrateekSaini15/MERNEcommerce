import Product from "../models/product.js";
import Inventory from "../models/inventory.js";
import slugify from "slugify";

export async function createProduct(req, res) {
  const { name, price, quantity, category, description } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => ({ img: file.filename }));
  }
  const product = new Product({
    name,
    slug: slugify(name),
    price,
    category,
    productPictures,
    description,
    createdBy: res.locals.user,
  });

  try {
    const newProduct = await product.save();
    const inventory = new Inventory({
      productId: newProduct._id,
      stockQuantity: quantity,
    });
    const newInventoryItem = await inventory.save();
    res.status(200).json({ product: newProduct, invenotry: newInventoryItem });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function getallProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

export function getProduct(req, res) {
  Product.find({ createdBy: res.locals.user }).then((products) =>
    res.status(201).json(products)
  );
}

export async function deleteProduct(req, res) {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.deleteOne({
      createdBy: res.locals.user,
      _id: productId,
    });
    const deletedProductFromInventory = await Inventory.deleteMany({
      productId: productId,
    });
    res.status(200).json({
      product: deletedProduct,
      productInventory: deletedProductFromInventory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function updateProduct(req, res) {
  const productId = req.body._id;
  let product;
  try {
    product = await Product.findById(productId).exec();
    if (product === null) {
      res.status(404).json({ message: "Product not found" });
    }
    const props = Object.keys(product.toObject());
    props.forEach((prop) => {
      if (req.body[prop] !== undefined) {
        if (prop === "name") {
          product["slug"] = slugify(req.body.name);
        }
        if (prop !== "_id") {
          product[prop] = req.body[prop];
        }
      }
    });
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
