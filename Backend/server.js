import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";
import { upload } from "./Middlewares/multer.js";
//self made modules
import userRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/admin/adminAuthRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import { isAdmin } from "./Middlewares/isAdminMiddleware.js";
//constants
env.config();
const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect(`mongodb://localhost/${process.env.MONGODB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Connceted to database ${process.env.MONGODB_DATABASE}`);
});

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", isAdmin, upload.array("productPicture"), productRoutes);
app.use("/api/product", isAdmin, productRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
