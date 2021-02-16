import React from "react";
import { connect } from "react-redux";
import { getallProducts } from "../../../redux/actions/productActions";
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getallProducts();
  }

  render() {
    return (
      <>
        <h4 className="display-4">Products</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </>
    );
  }
}

function mapActionToProps() {
  return { getallProducts };
}

export default connect(null, mapActionToProps)(Catalog);
