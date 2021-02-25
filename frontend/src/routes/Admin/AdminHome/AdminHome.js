import React from "react";
import { connect } from "react-redux";
import { logoutAdmin } from "../../../redux/actions/adminAuthActions";
class AdminHome extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-2">
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
            </ul>
          </nav>
        </div>
        <div className="col-10">
          <h4 className="display-4 text-center">Admin Home</h4>
        </div>
      </div>
    );
  }
}
const mapActionsToProps = {
  logoutAdmin,
};

export default connect(null, mapActionsToProps)(AdminHome);
