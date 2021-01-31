import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
class ProtectedRoute extends Component {
  render() {
    const component = this.props.component;
    const path = this.props.path;
    return this.props.auth.isAuthenticated ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect to="/user/signin" />
    );
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
  };
}

export default connect(mapStateToProps, null)(ProtectedRoute);
