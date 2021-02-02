import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";

import { fetchCategories } from "../../../redux/actions/categoryActions";
class ShowCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      newCategory: {
        categoryName: "",
        parentId: "",
      },
    };
    this.createList = this.createList.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  createList(categories) {
    const currentCategory = [];
    for (let i = 0; i < categories.length; i++) {
      currentCategory.push(
        <ListGroup.Item key={categories[i]._id}>
          {categories[i].name}
          {categories[i].children
            ? this.createList(categories[i].children)
            : null}
        </ListGroup.Item>
      );
    }
    return currentCategory;
  }

  render() {
    return (
      <>
        <h2>Categoreis</h2>
        <ListGroup>{this.createList(this.props.categoryList)}</ListGroup>
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    categoryList: store.category.categoryList,
  };
}

export default connect(mapStateToProps, { fetchCategories })(ShowCategories);
