import validator from "validator";
import isEmpty from "is-empty";

export default function validateSingupInput(data) {
  const errors = {};
  data.firstName = isEmpty(data.firstName) ? "" : data.firstName;
  data.lastName = isEmpty(data.lastName) ? "" : data.lastName;
  data.username = isEmpty(data.username) ? "" : data.username;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password1 = isEmpty(data.password1) ? "" : data.password1;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;
  data.contactNumber = isEmpty(data.contactNumber) ? "" : data.contactNumber;
  data.profilePicture = isEmpty(data.profilePicture) ? "" : data.profilePicture;

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }
  if (validator.isEmpty(data.username)) {
    errors.username = "User name is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email address is not valid.";
  }
  if (validator.isEmpty(data.password1)) {
    errors.password1 = "Password is required";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }
  if (!validator.isLength(data.password1, { min: 6, max: 30 })) {
    errors.password1 =
      "Length of the password must be atleast 6 characters long.";
  }
  if (!validator.equals(data.password1, data.password2)) {
    errors.password2 = "Password must match";
  }
  if (validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = "Contact number is required";
  }
  if (validator.isEmpty(data.profilePicture)) {
    errors.profilePicture = "Profile picture is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
}
