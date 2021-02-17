import Cart from "../models/cart.js";

export async function addToCart(req, res) {
  const cart = await Cart.findOne({ user: res.locals.user }).exec();

  if (cart) {
    try {
      let productExist = false;
      for (let i = 0; i < cart.cartItems.length; i++) {
        if (cart.cartItems[i].productId == req.body.item.productId) {
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
      res.status(400).json(error);
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

export async function getCart(req, res) {
  const user = res.locals.user;
  try {
    const cart = await Cart.findOne({ user: user }).exec();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function clearCart(req, res) {
  const user = res.locals.user;
  try {
    const cart = await Cart.findOne({ user: user }).exec();
    cart.cartItems = [];
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}
