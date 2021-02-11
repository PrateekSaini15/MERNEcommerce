import React from "react";

class FormTextarea extends React.Component {
  render() {
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
          <textarea
            id={this.props.label.toLowerCase()}
            required={this.props.required ? true : false}
            className="form-control"
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}
export default FormTextarea;
