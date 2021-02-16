import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

import { logoutUser } from "../../../redux/actions/authActions";
import Catalog from "../Catalog/Catalog";
import Cart from "../../User/Cart/Cart";

class Home extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <Nav className="flex-column">
          <LinkContainer to={`${match.url}products`}>
            <Nav.Link>Products</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${match.url}cart`}>
            <Nav.Link>Cart</Nav.Link>
          </LinkContainer>
        </Nav>
        <Switch>
          <Route path={`${match.url}products`} component={Catalog} />
          <Route path={`${match.url}cart`} component={Cart} />
        </Switch>
        <Button onClick={this.props.logoutUser}>Logout</Button>
      </>
    );
  }
}

export default connect(null, { logoutUser })(Home);
