import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export function isMerchant(req, res, next) {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decode.role !== "merchant") {
        res.status(400).json({ message: "Access denied" });
      } else {
        res.locals.user = decode._id;
      }
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ message: "You are not logged in" });
  }
  next();
}
