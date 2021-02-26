import MerchantOrder from "../../models/merchantOrder.js";

export async function getMerchantOrders(req, res) {
  const user = res.locals.user;
  try {
    const orders = await MerchantOrder.find({ merchantId: user });
    res.status(201).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
}
