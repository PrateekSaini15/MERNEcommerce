import express from "express";
import {
  addToCart,
  getCart,
  clearCart,
  removeItem,
} from "../../controllers/user/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get", getCart);
router.get("/clear", clearCart);
router.post("/delete", removeItem);
export default router;
