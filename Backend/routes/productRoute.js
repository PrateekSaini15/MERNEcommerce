import express from "express";
import { createProduct, getProduct } from "../controllers/productController.js";

const route = express.Router();

route.post("/create", createProduct);
route.get("/get", getProduct);
export default route;
