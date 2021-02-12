import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
} from "../controllers/productController.js";

const route = express.Router();

route.post("/create", createProduct);
route.get("/get", getProduct);
route.delete("/delete/:productId", deleteProduct);
export default route;
