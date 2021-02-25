import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
class AdminProtectedRoute extends Component {
  render() {
    const component = this.props.component;
    const path = this.props.path;
    return this.props.merchant.isAuthenticated ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect to="/merchant/signin" />
    );
  }
}

function mapStateToProps(store) {
  return {
    merchant: store.merchantAuth,
  };
}

export default connect(mapStateToProps, null)(AdminProtectedRoute);
