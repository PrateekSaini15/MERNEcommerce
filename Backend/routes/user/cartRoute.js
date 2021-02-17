import express from "express";
import {
  addToCart,
  getCart,
  clearCart,
} from "../../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get", getCart);
router.get("/clear", clearCart);
export default router;
