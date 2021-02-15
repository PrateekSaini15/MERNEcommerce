import { json } from "express";
import Cart from "../models/cart.js";

export async function addToCart(req, res) {
  const cart = await Cart.findOne({ user: res.locals.user }).exec();

  if (cart) {
    try {
      let productExist = false;
      for (let i = 0; i < cart.cartItems.length; i++) {
        if (cart.cartItems[i].product == req.body.item.product) {
          cart.cartItems[i].quantity += req.body.item.quantity;
          productExist = true;
        }
      }
      if (!productExist) {
        cart.cartItems = [...cart.cartItems, req.body.item];
      }
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } catch (error) {
      console.log(error);
      json.status(400).json(error);
    }
  } else {
    const cart = new Cart({
      user: res.locals.user,
      cartItems: [req.body.item],
    });
    try {
      const newCart = await cart.save();
      res.status(200).json(newCart);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
}
