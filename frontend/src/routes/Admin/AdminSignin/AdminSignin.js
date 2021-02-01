import React, { Component } from "react";
import { Form, Alert, Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  loginAdmin,
  isLoggedin,
} from "../../../redux/actions/authAdminActions";

class AdminSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.loginAdmin(this.state);
  }

  componentDidMount() {
    this.props.isLoggedin();
  }

  render() {
    if (this.props.admin.isAuthenticated) {
      return <Redirect to="/admin/home" />;
    }
    const error = this.props.error.loginError;
    return (
      <>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
                onChange={this.handleChange}
              />
              <Alert variant="danger" show={error.email ? true : false}>
                {error.email}
              </Alert>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={this.handleChange}
              />
              <Alert variant="danger" show={error.password ? true : false}>
                {error.password}
              </Alert>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  admin: store.admin,
  error: store.error,
});

export default connect(mapStateToProps, { loginAdmin, isLoggedin })(
  AdminSignin
);
