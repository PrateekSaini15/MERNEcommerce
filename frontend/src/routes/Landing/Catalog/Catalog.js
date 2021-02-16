import React from "react";
import { connect } from "react-redux";
import { getallProducts } from "../../../redux/actions/productActions";
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMarkup = this.getMarkup.bind(this);
  }

  componentDidMount() {
    this.props.getallProducts();
  }

  getMarkup() {
    const products = this.props.products;
    const markup = products.map((product) => (
      <tr key={product._id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
      </tr>
    ));
    return markup;
  }

  render() {
    const markup = this.getMarkup();
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
          <tbody>{markup}</tbody>
        </table>
      </>
    );
  }
}

function mapStateToProps(store) {
  return { products: store.userProduct.products };
}

const mapActionToProps = {
  getallProducts,
};

export default connect(mapStateToProps, mapActionToProps)(Catalog);
