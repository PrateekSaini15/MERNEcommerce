import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

import { logoutUser } from "../../../redux/actions/authActions";
import Catalog from "../Catalog/Catalog";
import Cart from "../../User/Cart/Cart";
import Order from "../../User/Order/Order";
import { getCart } from "../../../redux/actions/cartActions";
class Home extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const { match } = this.props;
    return (
      <>
        <div className="row">
          <div className="col-2">
            <Nav className="flex-column">
              <LinkContainer to={`${match.url}products`}>
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`${match.url}cart`}>
                <Nav.Link>
                  Cart(
                  {this.props.items.length
                    ? this.props.items.reduce((total, item) => {
                        return total + item.quantity;
                      }, 0)
                    : 0}
                  )
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={`${match.url}orders`}>
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>
            </Nav>
            <Button onClick={this.props.logoutUser}>Logout</Button>
          </div>
          <div className="col-10">
            <Switch>
              <Route path={`${match.url}products`} component={Catalog} />
              <Route path={`${match.url}cart`} component={Cart} />
              <Route path={`${match.url}orders`} component={Order} />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  return { items: store.cart.items };
}

const mapActionToProps = { logoutUser, getCart };

export default connect(mapStateToProps, mapActionToProps)(Home);
