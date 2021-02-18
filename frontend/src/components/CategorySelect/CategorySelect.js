import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../redux/actions/categoryActions";

class CategorySelect extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
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
    const options = [];
    const option = this.createList(this.props.categories, options);
    return (
      <select
        id={this.props.id}
        className="form-select"
        onChange={this.props.onChange}
      >
        <option value="">{this.props.default}</option>
        {option}
      </select>
    );
  }
}

function mapStateToProps(store) {
  return {
    categories: store.category.categoryList,
  };
}

const mapActionToProps = {
  fetchCategories,
};

export default connect(mapStateToProps, mapActionToProps)(CategorySelect);
