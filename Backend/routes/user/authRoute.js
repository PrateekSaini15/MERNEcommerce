import express, { json } from "express";

import {
  signupController,
  signinController,
  isLoggedin,
} from "../../controllers/user/authController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);

export default router;
