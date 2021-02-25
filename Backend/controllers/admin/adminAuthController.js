import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";

import User from "../../models/user.js";
import validateSigninInput from "../../validators/signinValidator.js";
import validateSignupInput from "../../validators/signupValidator.js";
env.config();

export async function adminSignin(req, res) {
  const { email, password } = req.body;
  const { error, isValid } = validateSigninInput({ email, password });

  if (!isValid) {
    return res.status(400).json(error);
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.role === "admin") {
        const passwordMatched = await bcrypt.compare(
          password,
          user.hashPassword
        );
        if (passwordMatched) {
          const payload = {
            _id: user._id,
            role: user.role,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3600 },
            (error, token) => {
              res.json({ token: "Bearer " + token });
            }
          );
        } else {
          res.status(400).json({ message: "Password is incorrect" });
        }
      } else {
        res.status(400).json({ message: "You are not a admin user" });
      }
    } else {
      res.status(400).json({ message: "Email doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function adminSignup(req, res) {
  const { error, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    res.status(400).json(error);
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        hashPassword: req.body.password1,
        contactNumber: req.body.contactNumber,
        profilePicture: req.body.profilePicture,
        role: "admin",
      });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newUser.hashPassword, salt);
      newUser.hashPassword = hashPassword;
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
