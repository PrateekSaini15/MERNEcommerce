import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";
import path from "path";
import { upload } from "./Middlewares/multer.js";
import { fileURLToPath } from "url";

//self made modules
import userRoutes from "./routes/user/authRoute.js";
import merchantAuthRoutes from "./routes/merchant/merchantAuthRoute.js";
import adminAuthRoutes from "./routes/admin/adminAuthRoute.js";
import categoryRoutes from "./routes/admin/categoryRoute.js";
import productRoutes from "./routes/admin/productRoute.js";
import userProductRoutes from "./routes/user/userProductRoutes.js";
import merchantRoutes from "./routes/merchant/merchantRoutes.js";
import orderRoute from "./routes/user/orderRoute.js";
import cartRoutes from "./routes/user/cartRoute.js";
import { isMerchant } from "./Middlewares/isMerchantMiddleware.js";
import { isUser } from "./Middlewares/isUserMiddleware.js";
//constants
env.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
// mongoose.connect(`mongodb://localhost/${process.env.MONGODB_DATABASE}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Connceted to database ${process.env.MONGODB_DATABASE}`);
});

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/user/product", userProductRoutes);
app.use("/api/user/order", isUser, orderRoute);
app.use("/api/merchant", merchantAuthRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/merchant", isMerchant, merchantRoutes);
app.use(
  "/api/product",
  isMerchant,
  upload.array("productPicture"),
  productRoutes
);
app.use("/api/cart", isUser, cartRoutes);
app.use("/api", userRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
  app.get("*", (req, resp) => {
    resp.sendFile(
      path.join(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}
app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
