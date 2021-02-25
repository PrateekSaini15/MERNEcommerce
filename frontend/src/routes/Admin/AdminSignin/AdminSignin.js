import React from "react";
import { connect } from "react-redux";

import FormInput from "../../../components/FormInput/FormInput";
import { loginAdmin } from "../../../redux/actions/adminAuthActions";
class AdminSignin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginDetails = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginAdmin(loginDetails);
  }

  render() {
    return (
      <>
        <div className="container">
          <h4 className="display-4 text-center">Admin Signin</h4>
          <form onSubmit={this.handleSubmit}>
            <FormInput
              id="email"
              label="Email"
              type="email"
              value={this.state.email}
              required={true}
              onChange={this.handleChange}
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              value={this.state.password}
              required={true}
              onChange={this.handleChange}
            />
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </>
    );
  }
}

const mapActionToProps = {
  loginAdmin,
};

export default connect(null, mapActionToProps)(AdminSignin);
