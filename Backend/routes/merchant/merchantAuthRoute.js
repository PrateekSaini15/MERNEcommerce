import express from "express";

import {
  signupController,
  signinController,
  isLoggedin,
} from "../../controllers/merchant/merchantAuthController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);

export default router;
