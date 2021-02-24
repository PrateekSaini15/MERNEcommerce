import express from "express";

import {
  placeOrder,
  getOrders,
  cancelOrder,
} from "../../controllers/user/orderController.js";

const route = express.Router();

route.post("/add", placeOrder);
route.get("/get", getOrders);
route.post("/cancel", cancelOrder);
export default route;
