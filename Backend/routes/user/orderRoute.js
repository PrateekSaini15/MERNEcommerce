import express from "express";

import { placeOrder } from "../../controllers/user/orderController.js";

const route = express.Router();

route.post("/add", placeOrder);

export default route;
