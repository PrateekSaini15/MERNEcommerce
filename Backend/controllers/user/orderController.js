import Order from "../../models/order.js";
import Cart from "../../models/cart.js";
import Inventory from "../../models/inventory.js";

async function addEntryToInventory(item) {
  const { productId, quantity } = item;
  const entry = new Inventory({
    productId: productId,
    stockQuantity: -quantity,
  });
  try {
    const newEntry = await entry.save();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function placeOrder(req, res) {
  const user = res.locals.user;

  try {
    const cart = await Cart.findOne({ user: user }).exec();
    if (cart) {
      if (cart.cartItems) {
        const items = cart.cartItems;
        items.forEach(addEntryToInventory);
        const order = new Order({
          user,
          items,
        });
        const newOrder = await order.save();
        await Cart.deleteOne({ user });
        res.status(200).json(newOrder);
      } else {
        res.status(400).json({ message: "Cart is empty" });
      }
    } else {
      res.statu(400).json({ message: "Cart doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
