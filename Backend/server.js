import express from "express";
import mongoose from "mongoose";
import env from "dotenv";

env.config();
const app = express();

app.use(express.json());

mongoose.connect(`mongodb://localhost/${process.env.MONGODB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Connceted to database ${process.env.MONGODB_DATABASE}`);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
