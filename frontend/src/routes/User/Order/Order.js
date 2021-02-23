import React from "react";
import { connect } from "react-redux";
class Order extends React.Component {
  render() {
    return (
      <>
        <h4 className="display-4 text-center">Order History</h4>
      </>
    );
  }
}

export default connect(null, null)(Order);
