import express from "express";
import {
  getInventoryByProduct,
  addEntryToProductInventory,
} from "../../controllers/merchant/inventoryController.js";
const route = express.Router();

route.get("/inventory/get/:productId", getInventoryByProduct);
route.post("/inventory/add", addEntryToProductInventory);
export default route;
