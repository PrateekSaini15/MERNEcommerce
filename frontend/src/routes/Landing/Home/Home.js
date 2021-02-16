import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

import { logoutUser } from "../../../redux/actions/authActions";
import Catalog from "../Catalog/Catalog";

class Home extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <Nav className="flex-column">
          <LinkContainer to={`${match.url}products`}>
            <Nav.Link>Products</Nav.Link>
          </LinkContainer>
        </Nav>
        <Switch>
          <Route path={`${match.url}products`} component={Catalog} />
        </Switch>
        <Button onClick={this.props.logoutUser}>Logout</Button>
      </>
    );
  }
}

export default connect(null, { logoutUser })(Home);
