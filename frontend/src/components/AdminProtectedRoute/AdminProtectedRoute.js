import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
class AdminProtectedRoute extends Component {
  render() {
    const component = this.props.component;
    const path = this.props.path;
    return this.props.admin.isAuthenticated ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect to="/admin/signin" />
    );
  }
}

function mapStateToProps(store) {
  return {
    admin: store.admin,
  };
}

export default connect(mapStateToProps, null)(AdminProtectedRoute);
