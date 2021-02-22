import React from "react";
import { connect } from "react-redux";

class ShowInventory extends React.Component {
  render() {
    return (
      <>
        <h4 className="display-4 text-center">Inventory</h4>
      </>
    );
  }
}

export default connect(null, null)(ShowInventory);
