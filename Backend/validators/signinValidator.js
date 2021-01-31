import validator from "validator";
import isEmpty from "is-empty";

export default function validateSigninInput(data) {
  const errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is not entered";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is not valid.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is empty";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
}
