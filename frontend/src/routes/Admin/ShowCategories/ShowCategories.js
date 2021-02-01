import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchCategories } from "../../../redux/actions/categoryActions";

class ShowCategories extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <>
        <h1>Inside show categories</h1>
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    category: store.category,
  };
}

export default connect(mapStateToProps, { fetchCategories })(ShowCategories);
