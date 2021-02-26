import React from "react";
import { connect } from "react-redux";

import { getOrders, cancelOrder } from "../../../redux/actions/orderActions";
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);
    this.createTableBody = this.createTableBody.bind(this);
    this.createTableFooter = this.createTableFooter.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.numberFormat = this.numberFormat.bind(this);
    this.getTotalPriceAndQuantity = this.getTotalPriceAndQuantity.bind(this);
  }
  componentDidMount() {
    this.props.getOrders();
  }

  numberFormat(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }

  formatDate(date) {
    const dateObject = new Date(date);
    const options = { timeStyle: "medium", dateStyle: "medium" };
    return Intl.DateTimeFormat([], options).format(dateObject);
  }

  createTableBody(item) {
    return (
      <tr key={item._id}>
        <td>{item.productName}</td>
        <td>{this.numberFormat(item.price)}</td>
        <td>{item.quantity}</td>
      </tr>
    );
  }

  getTotalPriceAndQuantity(items) {
    let totalPrice = items.reduce(
      (total, item) => item.price * item.quantity + total,
      0
    );
    let totalQuantity = items.reduce((total, item) => item.quantity + total, 0);
    return { totalPrice, totalQuantity };
  }

  createTableFooter(order) {
    const { totalPrice, totalQuantity } = this.getTotalPriceAndQuantity(
      order.items
    );
    return (
      <tr style={{ fontWeight: "bold" }}>
        <td>Total</td>
        <td>{this.numberFormat(totalPrice)}</td>
        <td>{totalQuantity}</td>
        <td
          style={
            order.status === "Placed" ? { color: "green" } : { color: "red" }
          }
        >
          {order.status}
        </td>
        <td>
          {order.status === "Placed" ? (
            <button
              className="btn btn-danger"
              onClick={() => this.props.cancelOrder(order._id)}
            >
              CancelOrder
            </button>
          ) : null}
        </td>
      </tr>
    );
  }

  createTable(order) {
    const markup = order.items.map(this.createTableBody);
    const footerMarkup = this.createTableFooter(order);
    return (
      <table className="table table-sm" key={order._id}>
        <caption className="caption-top">{`${this.formatDate(
          order.date
        )}`}</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{markup}</tbody>
        <tfoot>{footerMarkup}</tfoot>
      </table>
    );
  }

  render() {
    const markup = this.props.orders.map(this.createTable);
    return (
      <>
        <h4 className="display-4 text-center">Order History</h4>
        {markup}
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    orders: store.order.orders,
    rerender: store.order.rerender,
  };
}

const mapActionToProps = {
  getOrders,
  cancelOrder,
};

export default connect(mapStateToProps, mapActionToProps)(Order);
