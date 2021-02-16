import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createMarkup = this.createMarkup.bind(this);
  }

  createMarkup() {
    const items = this.props.items;
    const markup = items.map((item) => (
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.cartQuantity}</td>
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
      </>
    );
  }
}
function mapStateToProps(store) {
  return { items: store.cart.items };
}
const mapActionToProps = {};
export default connect(mapStateToProps, mapActionToProps)(Cart);
