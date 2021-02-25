import express from "express";

import {
  adminSignin,
  adminSignup,
} from "../../controllers/admin/adminAuthController.js";

const route = express.Router();

route.post("/signup", adminSignup);
route.post("/signin", adminSignin);

export default route;
