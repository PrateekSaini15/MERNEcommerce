import React, { Component } from "react";
import { connect } from "react-redux";
import FormInput from "../../../components/FormInput/FormInput";
import { signupUser } from "../../../redux/actions/authActions";
class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      contact: "",
      profilePicture: "",
      password1: "",
      password2: "",
      passwordNotSame: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password1 !== this.state.password2) {
      this.setState((prevState) => ({ ...prevState, passwordNotSame: true }));
    } else {
      this.setState((prevState) => ({ ...prevState, passwordNotSame: false }));
      const signupDetails = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        contactNumber: this.state.contact,
        password1: this.state.password1,
        password2: this.state.password2,
      };
      const { history } = this.props;
      this.props.signupUser(signupDetails, history);
    }
  }

  render() {
    let error = this.state.passwordNotSame ? "Passwords are not same" : "";
    return (
      <div className="container">
        <h4 className="display-4 text-center">User sign up page</h4>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            id="firstName"
            label="First Name"
            value={this.state.firstName}
            required={true}
            onChange={this.handleChange}
          />
          <FormInput
            type="text"
            id="lastName"
            label="Last Name"
            value={this.state.lastName}
            required={true}
            onChange={this.handleChange}
          />
          <FormInput
            type="text"
            id="username"
            label="Username"
            value={this.state.username}
            required={true}
            onChange={this.handleChange}
          />
          <FormInput
            type="email"
            id="email"
            label="Email"
            value={this.state.email}
            required={true}
            onChange={this.handleChange}
          />
          <span style={{ color: "red" }}>{this.props.errors.email}</span>
          <FormInput
            type="number"
            id="contact"
            label="Contact Number"
            value={this.state.contact}
            required={true}
            onChange={this.handleChange}
          />
          <FormInput
            type="password"
            id="password1"
            label="Password"
            value={this.state.password1}
            required={true}
            onChange={this.handleChange}
          />
          <FormInput
            type="password"
            id="password2"
            label="Confirm password"
            value={this.state.password2}
            required={true}
            onChange={this.handleChange}
          />
          <span style={{ color: "red", backgroundColor: "yellow" }}>
            {error}
          </span>
          <button type="submit" className="btn btn-success">
            Signup
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    errors: store.auth.errors,
  };
}

const mapActionsToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(UserSignup);
