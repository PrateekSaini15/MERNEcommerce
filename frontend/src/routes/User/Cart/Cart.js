import React from "react";
import { connect } from "react-redux";
import { getCart, clearCart } from "../../../redux/actions/cartActions";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createMarkup = this.createMarkup.bind(this);
  }

  componentDidMount() {
    this.props.getCart();
  }

  createMarkup() {
    const items = this.props.items;
    const markup = items.map((item) => (
      <tr key={item.productName}>
        <td>{item.productName}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
      </tr>
    ));
    return markup;
  }

  render() {
    const markup = this.createMarkup();
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
          <tbody>{markup}</tbody>
        </table>
        <button className="btn btn-danger" onClick={this.props.clearCart}>
          Clear Cart
        </button>
      </>
    );
  }
}
function mapStateToProps(store) {
  return { items: store.cart.items };
}
const mapActionToProps = { getCart, clearCart };
export default connect(mapStateToProps, mapActionToProps)(Cart);
