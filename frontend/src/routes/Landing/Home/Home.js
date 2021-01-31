import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/actions/authActions";
class Home extends React.Component {
  render() {
    return (
      <>
        <Button onClick={this.props.logoutUser}>Logout</Button>
      </>
    );
  }
}

export default connect(null, { logoutUser })(Home);
