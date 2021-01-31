import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export function isAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decode.role !== "admin") {
        res.json({ message: "Access denied" });
      }
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json({ message: "Access denied" });
  }
  next();
}
