import React, { Component } from "react";
import {
  Button,
  FormControl,
  Form,
  FormGroup,
  Container,
} from "react-bootstrap";
import { connect } from "react-redux";
import { createCategory } from "../../../redux/actions/categoryActions";
class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        categoryName: "",
        parentId: "",
      },
      validFormInput: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      category: {
        ...this.state.category,
        [event.target.name]: event.target.value,
      },
    });
  }

  createCategoryList(categories, options = []) {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        this.createCategoryList(category.children, options);
      }
    }
    return options;
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      this.setState({ ...this.state, validFormInput: false });
      event.stopPropagation();
    } else {
      const newCategory = {
        ...this.state.category,
      };
      this.setState({ ...this.state, validFormInput: true });
      this.props.createCategory(newCategory);
    }
  }

  render() {
    return (
      <>
        <Container>
          <Form
            noValidate
            validated={this.state.validFormInput}
            onSubmit={this.handleSubmit}
          >
            <FormGroup controlId="formBasicCategoryName">
              <FormControl
                type="text"
                name="categoryName"
                placeholder="Category Name"
                required
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="formBasicParentId">
              <Form.Control
                as="select"
                name="parentId"
                onChange={this.handleChange}
                required
                custom
              >
                <option key={0} value="">
                  --Choose a Parent Category--
                </option>
                <option key={1} value="root">
                  New Parent Category
                </option>
                {this.createCategoryList(this.props.categories).map(
                  (option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  )
                )}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please choose a parent category
              </Form.Control.Feedback>
            </FormGroup>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

const mapSateToProps = (store) => ({
  categories: store.category.categoryList,
});

export default connect(mapSateToProps, { createCategory })(AddCategory);
