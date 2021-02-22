import Inventory from "../../models/inventory.js";

export async function getInventoryByProduct(req, res) {
  const productId = req.params.productId;

  try {
    const inventory = await Inventory.find({ productId });
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
