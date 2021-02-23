import React from "react";
import { connect } from "react-redux";

import { getOrders } from "../../../redux/actions/orderActions";
class Order extends React.Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    console.log(this.props.orders);
    return (
      <>
        <h4 className="display-4 text-center">Order History</h4>
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
