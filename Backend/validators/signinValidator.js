import validator from "validator";
import isEmpty from "is-empty";

export default function validateSingupInput(data) {
  const errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (validator.isEmpty(data.email)) {
    error.email = "Email is not entered";
  } else if (!validator.isEmail(data.email)) {
    error.email = "Email is not valid.";
  }
  if (validator.isEmpty(data.password)) {
    error.password = "Password is empty";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
}
