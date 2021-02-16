import express from "express";
import { getallProducts } from "../../controllers/productController.js";
const route = express.Router();

route.get("/getall", getallProducts);

export default route;
