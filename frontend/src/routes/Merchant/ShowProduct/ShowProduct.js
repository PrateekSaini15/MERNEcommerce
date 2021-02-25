import React from "react";
import { connect } from "react-redux";
import {
  getProductsForAdmin,
  deleteProduct,
} from "../../../redux/actions/productActions";
class ShowProduct extends React.Component {
  constructor(props) {
    super(props);
    this.createProductListMarkup = this.createProductListMarkup.bind(this);
    this.numberFormat = this.numberFormat.bind(this);
  }
  componentDidMount() {
    this.props.getProductsForAdmin();
  }

  numberFormat(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }

  createProductListMarkup() {
    const items = this.props.products;
    const markup = items.map((item) => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{this.numberFormat(item.price)}</td>
        <td>{item.quantity}</td>
        <td>
          <button
            className="btn"
            onClick={() => {
              this.props.history.push({
                pathname: "/merchant/home/inventory",
                state: item,
              });
            }}
          >
            <i className="bi bi-clipboard"></i>
          </button>
        </td>
        <td>
          {" "}
          <button
            className="btn"
            onClick={() => {
              this.props.history.push({
                pathname: "/merchant/home/product/update",
                state: item,
              });
            }}
          >
            <i className="bi bi-pencil" style={{ color: "green" }}></i>
          </button>{" "}
        </td>
        <td>
          <button
            className="btn"
            onClick={() => this.props.deleteProduct(item._id)}
          >
            <i className="bi bi-trash" style={{ color: "red" }}></i>
          </button>
        </td>
      </tr>
    ));
    return markup;
  }

  render() {
    const products = this.createProductListMarkup();
    return (
      <div className="row">
        <h4 className="text-center display-4">Products</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    products: store.product.products,
    remount: store.product.remount,
  };
}

export default connect(mapStateToProps, { getProductsForAdmin, deleteProduct })(
  ShowProduct
);
