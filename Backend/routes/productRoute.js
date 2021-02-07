import express from "express";
import { createProduct } from "../controllers/productController.js";

const route = express.Router();

route.post("/create", createProduct);

export default route;
