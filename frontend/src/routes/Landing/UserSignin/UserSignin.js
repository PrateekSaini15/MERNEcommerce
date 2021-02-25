import React, { Component } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { loginUser, isLoggedin } from "../../../redux/actions/authActions";

class UserSignin extends Component {
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
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.loginUser(this.state);
  }

  componentDidMount() {
    this.props.isLoggedin();
  }

  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const error = this.props.error.loginError;
    return (
      <Container>
        <h4 className="display-4 text-center">User Signin</h4>
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
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, error: state.error };
}

export default connect(mapStateToProps, { loginUser, isLoggedin })(UserSignin);
