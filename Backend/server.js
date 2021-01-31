import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";

import userRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/admin/adminAuthRoute.js";

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

app.post("/", (req, res) => res.status(200).json(req.body));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
