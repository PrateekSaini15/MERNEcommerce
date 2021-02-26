import Order from "../../models/order.js";
import Cart from "../../models/cart.js";
import Inventory from "../../models/inventory.js";
import MerchantOrder from "../../models/merchantOrder.js";
import Product from "../../models/product.js";

async function saveMerchantOrder(merchantOrders, order) {
  const merchants = Object.keys(merchantOrders);
  try {
    for (let i = 0; i < merchants.length; i++) {
      const newMerchantOrder = new MerchantOrder({
        merchantId: merchants[i],
        orderId: order._id,
        items: merchantOrders[merchants[i]],
        status: "Pending",
      });
      await newMerchantOrder.save();
    }
  } catch (error) {
    console.log(error);
    res.statu(400).json(error);
  }
}

async function createMerchantOrder(order) {
  let merchants = {};
  const items = order.items;
  for (let i = 0; i < items.length; i++) {
    try {
      const product = await Product.findOne({ _id: items[i].productId });
      const merchantId = product.createdBy;
      if (!merchants[merchantId]) {
        merchants[merchantId] = [items[i]];
      } else {
        merchants[merchantId].push(items[i]);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  saveMerchantOrder(merchants, order);
}

async function addEntryToInventory(item, order) {
  let { productId, quantity } = item;
  if (order === "Placed") {
    quantity = -quantity;
  }
  const entry = new Inventory({
    productId: productId,
    stockQuantity: quantity,
  });
  try {
    const newEntry = await entry.save();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function changeStatusOfMerchantOrder(order) {
  order.status = "Canceled";
  try {
    await order.save();
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
        items.forEach((item) => addEntryToInventory(item, status));
        const order = new Order({
          user,
          items,
          status,
        });
        const newOrder = await order.save();
        createMerchantOrder(newOrder);
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
    if (order) {
      if (order.status === "Canceled") {
        res.status(400).json({ message: "order already cancelled" });
      } else {
        order.status = "Canceled";
        const newOrder = await order.save();
        order.items.forEach((item) => addEntryToInventory(item, order.status));
        let merchantOrders = await MerchantOrder.find({ orderId: order._id });
        merchantOrders.forEach(changeStatusOfMerchantOrder);
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
