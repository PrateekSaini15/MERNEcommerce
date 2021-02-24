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
        const status = "Placed";
        items.forEach(addEntryToInventory);
        const order = new Order({
          user,
          items,
          status,
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

export async function getOrders(req, res) {
  const user = res.locals.user;
  try {
    const orders = await Order.find({ user });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(400).json({ message: "No order history" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function cancelOrder(req, res) {
  const orderId = req.body.orderId;
  try {
    const order = await Order.findOne({ _id: orderId });
    console.log(order);
    if (order) {
      if (order.status === "Cancelled") {
        res.status(400).json({ message: "order already cancelled" });
      } else {
        order.status = "Cancelled";
        const newOrder = await order.save();
        res.status(200).json(newOrder);
      }
    } else {
      res.status(400).json({ message: "order doesn't exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
