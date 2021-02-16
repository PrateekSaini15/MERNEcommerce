import express from "express";

import { isAdmin } from "../../Middlewares/isAdminMiddleware.js";
import {
  createCategoryController,
  getCategoryController,
} from "../../controllers/categoryController.js";

const route = express.Router();

route.post("/create", isAdmin, createCategoryController);
route.get("/get", getCategoryController);

export default route;
