import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { logoutAdmin } from "../../../redux/actions/adminAuthActions";
import ShowCategories from "../../../routes/Admin/ShowCategories/ShowCategories";
import AddCategory from "../../../routes/Admin/AddCategory/AddCategory";
class AdminHome extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div className="row">
        <div className="col-3">
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  onClick={this.props.logoutAdmin}
                >
                  Logout
                </button>
              </li>
              <li className="nav-item">
                <LinkContainer to={`${match.url}/categories`}>
                  <a className="nav-link">Categories</a>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to={`${match.url}/category/add`}>
                  <a className="nav-link">Add Category</a>
                </LinkContainer>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-9">
          <h4 className="display-4 text-center">Admin Home</h4>
          <Switch>
            <Route
              path={`${match.url}/categories`}
              component={ShowCategories}
            />
            <Route path={`${match.url}/category/add`} component={AddCategory} />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapActionsToProps = {
  logoutAdmin,
};

export default connect(null, mapActionsToProps)(AdminHome);
