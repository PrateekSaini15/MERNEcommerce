import React from "react";
import { connect } from "react-redux";
import { getallProducts } from "../../../redux/actions/productActions";
import { addToCart } from "../../../redux/actions/cartActions";
import CategoryList from "../../../components/CategorySelect/CategorySelect";
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "",
    };
    this.getMarkup = this.getMarkup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createList = this.createList.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.getChildrenCategory = this.getChildrenCategory.bind(this);
    this.addCategoryToList = this.addCategoryToList.bind(this);
    this.numberFormat = this.numberFormat.bind(this);
  }

  componentDidMount() {
    this.props.getallProducts();
  }

  numberFormat(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }

  createMarkup(product) {
    return (
      <tr key={product._id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{this.numberFormat(product.price)}</td>
        <td>
          <button className="btn" onClick={() => this.props.addToCart(product)}>
            <i className="bi bi-cart-plus" style={{ color: "green" }}></i>
          </button>
        </td>
      </tr>
    );
  }

  addCategoryToList(categories, list) {
    for (let i = 0; i < categories.length; i++) {
      list.push(categories[i]._id);
      if (categories[i].children.length > 0) {
        this.addCategoryToList(categories[i].children, list);
      }
    }
  }

  getChildrenCategory(categories, list) {
    const categoryId = this.state.currentCategory;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i]._id === categoryId) {
        list.push(categories[i]._id);
        if (categories[i].children.length > 0) {
          this.addCategoryToList(categories[i].children, list);
        }
      } else {
        if (categories[i].children.length > 0) {
          this.getChildrenCategory(categories[i].children, list);
        }
      }
    }
  }

  getMarkup() {
    const products = this.props.products;
    const markup = products.map((product) => {
      let mark;
      if (this.state.currentCategory === "") {
        mark = this.createMarkup(product);
      } else {
        let category = [];
        this.getChildrenCategory(this.props.categories, category);

        if (category.includes(product.category)) {
          mark = this.createMarkup(product);
        }
      }
      return mark;
    });
    return markup;
  }

  handleChange(event) {
    this.setState({ ...this.state, currentCategory: event.target.value });
  }

  createList(list, options) {
    list.forEach((element) => {
      let markup = (
        <option key={element._id} value={element._id}>
          {element.name}
        </option>
      );
      options.push(markup);
      if (element.children.length > 0) {
        this.createList(element.children, options);
      }
    });
    return options;
  }

  render() {
    const markup = this.getMarkup();
    return (
      <>
        <h4 className="display-4">Products</h4>
        <form className="form-inline">
          <CategoryList
            id="category"
            default="All"
            onChange={this.handleChange}
          />
        </form>
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
  return {
    products: store.userProduct.products,
    categories: store.category.categoryList,
  };
}

const mapActionToProps = {
  getallProducts,
  addToCart,
};

export default connect(mapStateToProps, mapActionToProps)(Catalog);
