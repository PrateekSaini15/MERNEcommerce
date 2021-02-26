import express from "express";
import {
  getInventoryByProduct,
  addEntryToProductInventory,
} from "../../controllers/merchant/inventoryController.js";
import { getMerchantOrders } from "../../controllers/merchant/merchantOrderController.js";

const route = express.Router();

route.get("/inventory/get/:productId", getInventoryByProduct);
route.post("/inventory/add", addEntryToProductInventory);
route.get("/orders/get", getMerchantOrders);
export default route;
