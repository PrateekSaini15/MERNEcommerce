import React from "react";
import { connect } from "react-redux";

import { getOrders } from "../../../redux/actions/orderActions";
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);
    this.createTableBody = this.createTableBody.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }
  componentDidMount() {
    this.props.getOrders();
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
        <td>{item.price}</td>
        <td>{item.quantity}</td>
      </tr>
    );
  }

  createTable(order, index) {
    const markup = order.items.map(this.createTableBody);
    return (
      <table className="table" key={order._id}>
        <caption className="caption-top">{`${this.formatDate(order.date)} ${
          order.status
        }`}</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{markup}</tbody>
      </table>
    );
  }

  render() {
    console.log(this.props.orders);
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
  };
}

const mapActionToProps = {
  getOrders,
};

export default connect(mapStateToProps, mapActionToProps)(Order);
