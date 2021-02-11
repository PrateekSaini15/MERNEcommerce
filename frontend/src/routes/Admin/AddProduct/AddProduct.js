import React from "react";
import { connect } from "react-redux";
import FormInput from "../../../components/FormInput/FormInput";
import FormTextarea from "../../../components/FormTextarea/FormTextarea";
import FormInputSelection from "../../../components/FormInputSelection/FormInputSelection";
import { fetchCategories } from "../../../redux/actions/categoryActions";
import { addProduct } from "../../../redux/actions/productActions";
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: null,
      quantity: null,
      description: "",
      images: [],
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchCategories();
  }

  handleChange(event) {
    if (event.target.id === "images") {
      this.setState({
        ...this.state,
        [event.target.id]: [...event.target.files],
      });
    } else {
      this.setState({
        ...this.state,
        [event.target.id]: event.target.value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = new FormData();
    form.append("name", this.state.name);
    form.append("category", this.state.category);
    form.append("price", this.state.price);
    form.append("quantity", this.state.quantity);
    form.append("description", this.state.description);
    this.state.images.forEach((image) => {
      form.append("productPicture", image);
    });
    this.props.addProduct(form);
  }

  render() {
    return (
      <div className="container">
        <h2 className="display-5">Add Product</h2>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label="Name"
            required={true}
            onChange={this.handleChange}
          />
          <FormInputSelection
            type="text"
            label="Category"
            required={true}
            list={this.props.categories}
            default="select a category"
            onChange={this.handleChange}
          />
          <FormInput
            type="number"
            min={1}
            label="Price"
            required={true}
            onChange={this.handleChange}
          />
          <FormInput
            type="number"
            min={1}
            label="Quantity"
            required={true}
            onChange={this.handleChange}
          />
          <FormTextarea
            type="textarea"
            label="Description"
            required={true}
            onChange={this.handleChange}
          />
          {this.state.images.length > 0
            ? this.state.images.map((image, index) => (
                <li key={index}>{image.name}</li>
              ))
            : null}
          <FormInput
            type="file"
            label="Images"
            required={true}
            multiple={true}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { categories: store.category.categoryList };
}

export default connect(mapStateToProps, { addProduct, fetchCategories })(
  AddProduct
);
