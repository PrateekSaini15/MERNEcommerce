import express from "express";

import {
  placeOrder,
  getOrders,
} from "../../controllers/user/orderController.js";

const route = express.Router();

route.post("/add", placeOrder);
route.get("/get", getOrders);

export default route;
