import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateSingupInput from "../validators/signupValidator.js";
import validateSinginInput from "../validators/signinValidator.js";
import User from "../models/user.js";
import env from "dotenv";

env.config();

export const signupController = (req, res) => {
  const { errors, isValid } = validateSingupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email id already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        hashPassword: req.body.password1,
        contactNumber: req.body.contactNumber,
        profilePicture: req.body.profilePicture,
      });

      bcrypt.genSalt(10, (error, salt) => {
        if (error) return res.status(500).json({ message: error.message });
        bcrypt.hash(newUser.hashPassword, salt, (error, hash) => {
          if (error) return res.status(500).json({ message: error.message });
          newUser.hashPassword = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((error) => res.status(500).json({ message: error.message }));
        });
      });
    }
  });
};

export const signinController = (req, res) => {
  const { errors, isValid } = validateSinginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "Email does not exist." });
    }
    bcrypt.compare(password, user.hashPassword).then((isMatch) => {
      if (isMatch) {
        const payload = {
          _id: user._id,
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
        res.status(400).json({ message: "password is incorrect" });
      }
    });
  });
};

export const isLoggedin = (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  const userId = jwt.verify(token[1], process.env.JWT_SECRET_KEY);

  next();
};
