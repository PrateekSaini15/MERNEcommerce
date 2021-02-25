import React from "react";
import { connect } from "react-redux";

import FormInput from "../../../components/FormInput/FormInput";
import FormTextarea from "../../../components/FormTextarea/FormTextarea";
import FormInputSelection from "../../../components/FormInputSelection/FormInputSelection";
import { fetchCategories } from "../../../redux/actions/categoryActions";
import { updateProduct } from "../../../redux/actions/productActions";
class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValues = this.setValues.bind(this);
    this.state = {
      _id: "",
      name: "",
      price: null,
      quantity: null,
      description: "",
      images: [],
      category: "",
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.setValues();
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProduct(this.state);
    this.props.history.push("/merchant/home/products");
  }

  setValues() {
    const product = this.props.location.state;
    this.setState({
      ...this.state,
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
    });
  }

  render() {
    return (
      <>
        <h4 className="text-center display-4">Updating Product</h4>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label="Name"
            value={this.state.name}
            required={true}
            onChange={this.handleChange}
          />
          <FormInputSelection
            type="text"
            label="Category"
            value={this.state.category}
            required={true}
            list={this.props.categories}
            default="select a category"
            onChange={this.handleChange}
          />
          <FormInput
            type="number"
            min={1}
            label="Price"
            value={this.state.price}
            required={true}
            onChange={this.handleChange}
          />
          <FormTextarea
            type="textarea"
            label="Description"
            value={this.state.description}
            required={true}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-danger"
            onClick={() => this.props.history.push("/merchant/home/products")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
}

function mapStateToProps(store) {
  return { categories: store.category.categoryList };
}

export default connect(mapStateToProps, { fetchCategories, updateProduct })(
  UpdateProduct
);
