import React from "react";
import { connect } from "react-redux";
import { getMerchantOrders } from "../../../redux/actions/merchantOrderActions";

class ShowOrder extends React.Component {
  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);
    this.createTableBody = this.createTableBody.bind(this);
    this.numberFormat = this.numberFormat.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.createTableFooter = this.createTableFooter.bind(this);
    this.getTotalPriceAndQuantity = this.getTotalPriceAndQuantity.bind(this);
    this.statusColor = this.statusColor.bind(this);
  }
  componentDidMount() {
    this.props.getMerchantOrders();
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
    return new Intl.DateTimeFormat([], options).format(dateObject);
  }

  statusColor(status) {
    switch (status) {
      case "Pending":
        return "yellowgreen";
      case "Delivered":
        return "green";
      case "Canceled":
        return "red";
      default:
        return "";
    }
  }

  getTotalPriceAndQuantity(items) {
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return { totalPrice, totalQuantity };
  }

  createTableFooter(order) {
    const { totalPrice, totalQuantity } = this.getTotalPriceAndQuantity(
      order.items
    );
    const color = this.statusColor(order.status);
    return (
      <tr style={{ fontWeight: "bold" }}>
        <td>Total</td>
        <td>{totalPrice}</td>
        <td>{totalQuantity}</td>
        <td
          style={{
            color: color,
          }}
        >
          {order.status}
        </td>
      </tr>
    );
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

  createTable(order) {
    const bodyMarkup = order.items.map(this.createTableBody);
    const footerMarkup = this.createTableFooter(order);
    return (
      <table className="table" key={order._id}>
        <caption className="caption-top">{this.formatDate(order.date)}</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{bodyMarkup}</tbody>
        <tfoot>{footerMarkup}</tfoot>
      </table>
    );
  }
  render() {
    console.log(this.props.orders);
    const markup = this.props.orders.map(this.createTable);
    return (
      <>
        <h4 className="display-4 text-center">Orders</h4>
        {markup}
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    orders: store.merchantOrder.orders,
  };
}

const mapActionToProps = {
  getMerchantOrders,
};

export default connect(mapStateToProps, mapActionToProps)(ShowOrder);
