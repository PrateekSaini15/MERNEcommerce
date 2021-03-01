import React from "react";
import { connect } from "react-redux";
import { getallProducts } from "../../../redux/actions/productActions";
import { addToCart } from "../../../redux/actions/cartActions";
import CategoryList from "../../../components/CategorySelect/CategorySelect";
import Pagination from "../../../components/PaginationComponent/PaginationComponent";
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "",
      currentSortTypeForPrice: "default",
      currentPage: 1,
      pageSize: 5,
      startIndex: 0,
      endIndex: 1,
    };
    this.getMarkup = this.getMarkup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createList = this.createList.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.getChildrenCategory = this.getChildrenCategory.bind(this);
    this.addCategoryToList = this.addCategoryToList.bind(this);
    this.numberFormat = this.numberFormat.bind(this);
    this.sortProductsByPrice = this.sortProductsByPrice.bind(this);
    this.setStartEndIndex = this.setStartEndIndex.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getFilterProductsLength = this.getFilterProductsLength.bind(this);
    this.createCard = this.createCard.bind(this);
  }

  componentDidMount() {
    this.props.getallProducts();
  }

  setStartEndIndex(newPage) {
    const { pageSize } = this.state;
    const totalItems = this.getFilterProductsLength();
    const currentPage = newPage;
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    this.setState({
      ...this.state,
      startIndex: startIndex,
      endIndex: endIndex,
      currentPage: newPage,
    });
  }

  numberFormat(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }

  createCard(product) {
    let baseUrl;
    if (product.productPictures.length) {
      baseUrl = `http://localhost:5000/uploads/${product.productPictures[0].img}`;
    } else {
      baseUrl = "logo192.png";
    }
    return (
      <div className="col-sm-6" key={product._id}>
        <div className="card" style={{ width: "18rem" }}>
          <img src={baseUrl} className="card-img-top" alt={product.name} />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {this.numberFormat(product.price)}
            </h6>
            <p className="card-text">{product.description}</p>
            <button
              className="btn"
              onClick={() => this.props.addToCart(product)}
            >
              <i className="bi bi-cart-plus" style={{ color: "green" }}></i>
            </button>
          </div>
        </div>
      </div>
    );
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

  sortProductsByPrice(a, b) {
    const sortType = this.state.currentSortTypeForPrice;
    if (sortType === "default") {
      return a;
    } else if (sortType === "ascending") {
      return a.price - b.price;
    } else if (sortType === "descending") {
      return b.price - a.price;
    }
  }

  getMarkup() {
    const products = this.props.products;
    const tempMarkup = [...products]
      .sort(this.sortProductsByPrice)
      .map((product) => {
        let mark = "";
        if (this.state.currentCategory === "") {
          mark = this.createCard(product);
        } else {
          let category = [];
          this.getChildrenCategory(this.props.categories, category);
          if (category.includes(product.category)) {
            mark = this.createCard(product);
          }
        }
        return mark;
      });

    const markup = tempMarkup.filter((markup) => markup !== "");

    return markup.slice(this.state.startIndex, this.state.endIndex + 1);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.id]: event.target.value });
  }

  handlePageChange(newPage) {
    this.setStartEndIndex(newPage);
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

  getFilterProductsLength() {
    let length = 0;
    if (this.state.currentCategory === "") {
      length = this.props.products.length;
    } else {
      let category = [];
      this.getChildrenCategory(this.props.categories, category);
      this.props.products.forEach((product) => {
        if (category.includes(product.category)) {
          length++;
        }
      });
    }
    return length;
  }

  render() {
    const markup = this.getMarkup();
    const totalItems = this.getFilterProductsLength();
    return (
      <>
        <h4 className="display-4">Products</h4>

        <div className="row">
          <div className="col-2">
            <CategoryList
              id="currentCategory"
              default="All"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-2">
            <select
              id="currentSortTypeForPrice"
              className="form-select"
              onChange={this.handleChange}
            >
              <option value="default">default</option>
              <option value="ascending">Low to high</option>
              <option value="descending">High to low</option>
            </select>
          </div>
        </div>
        {/* <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>{markup}</tbody>
        </table> */}
        <div className="row">{markup}</div>
        <Pagination
          currentPage={this.state.currentPage}
          totalItems={totalItems}
          pageSize={this.state.pageSize}
          handlePageChange={this.handlePageChange}
        />
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
