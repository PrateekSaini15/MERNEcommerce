import React from "react";
import { connect } from "react-redux";

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h4 className="display-4">Products</h4>
      </>
    );
  }
}

export default connect(null, null)(Catalog);
