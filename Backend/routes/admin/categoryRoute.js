import express from "express";

import { isMerchant } from "../../Middlewares/isMerchantMiddleware.js";
import {
  createCategoryController,
  getCategoryController,
} from "../../controllers/categoryController.js";

const route = express.Router();

route.post("/create", isMerchant, createCategoryController);
route.get("/get", getCategoryController);

export default route;
