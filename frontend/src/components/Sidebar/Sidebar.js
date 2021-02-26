import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <Nav className="flex-column">
          <LinkContainer to={`${match.url}/product/add`}>
            <Nav.Link>Add Product</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${match.url}/products`}>
            <Nav.Link>Show Products</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${match.url}/orders`}>
            <Nav.Link>Show Orders</Nav.Link>
          </LinkContainer>
        </Nav>
      </>
    );
  }
}
export default withRouter(Sidebar);
