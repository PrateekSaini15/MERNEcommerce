import express from "express";
import { getInventoryByProduct } from "../../controllers/merchant/inventoryController.js";
const route = express.Router();

route.get("/inventory/get/:productId", getInventoryByProduct);

export default route;
