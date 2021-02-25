import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

class AdminProtectedRoute extends React.Component {
  render() {
    const { component, path } = this.props;
    return this.props.isAuthenticated ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect to="/admin/signin" />
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.adminAuth.isAuthenticated,
  };
}

export default connect(mapStateToProps, null)(AdminProtectedRoute);
