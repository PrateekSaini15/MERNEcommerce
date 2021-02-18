import React from "react";
import { connect } from "react-redux";
import {
  getCart,
  clearCart,
  removeItem,
} from "../../../redux/actions/cartActions";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createMarkup = this.createMarkup.bind(this);
    this.getTotalQuantityAndPrice = this.getTotalQuantityAndPrice.bind(this);
    this.numberFormat = this.numberFormat.bind(this);
  }

  componentDidMount() {
    this.props.getCart();
  }

  numberFormat(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }

  getTotalQuantityAndPrice() {
    const items = this.props.items;
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return (
      <tr style={{ fontWeight: "bold" }}>
        <td>Total</td>
        <td>{this.numberFormat(totalPrice)}</td>
        <td>{totalQuantity}</td>
        <td>
          <button className="btn btn-danger" onClick={this.props.clearCart}>
            Clear Cart
          </button>
        </td>
      </tr>
    );
  }

  createMarkup() {
    const items = this.props.items;
    const markup = items.map((item) => (
      <tr key={item.productName}>
        <td>{item.productName}</td>
        <td>{this.numberFormat(item.price)}</td>
        <td>{item.quantity}</td>
        <td>
          <button
            className="btn"
            onClick={() => {
              this.props.removeItem(item);
            }}
          >
            <i className="bi bi-cart-x" style={{ color: "red" }}></i>
          </button>
        </td>
      </tr>
    ));
    return markup;
  }

  render() {
    const markup = this.createMarkup();
    const totalMarkup = this.getTotalQuantityAndPrice();
    return (
      <>
        <h4 className="dispaly-4">Cart</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">quantity</th>
            </tr>
          </thead>
          <tbody>
            {markup}
            {totalMarkup}
          </tbody>
        </table>
      </>
    );
  }
}
function mapStateToProps(store) {
  return { items: store.cart.items };
}
const mapActionToProps = { getCart, clearCart, removeItem };
export default connect(mapStateToProps, mapActionToProps)(Cart);
