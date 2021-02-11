import React from "react";

class FormInputSelection extends React.Component {
  constructor(props) {
    super(props);
    this.createList = this.createList.bind(this);
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
    const markup = this.createList(this.props.list, options);
    return (
      <div className="row align-items-center">
        <div className="col-2">
          <label
            htmlFor={this.props.label.toLowerCase()}
            className="form-label"
          >
            {this.props.label}
          </label>
        </div>
        <div className="col-3">
          <select
            id={this.props.label.toLowerCase()}
            required={this.props.required}
            className="form-select"
            onChange={this.props.onChange}
          >
            <option value="">{this.props.default}</option>
            {markup}
          </select>
        </div>
      </div>
    );
  }
}
export default FormInputSelection;
