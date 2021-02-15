import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export function isUser(req, res, next) {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decode.role !== "user") {
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
