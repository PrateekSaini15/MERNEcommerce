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
          <LinkContainer to={`${match.url}/categories`}>
            <Nav.Link>Show Categories</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${match.url}/category/add`}>
            <Nav.Link>Add Categories</Nav.Link>
          </LinkContainer>
        </Nav>
      </>
    );
  }
}
export default withRouter(Sidebar);
