import React from "react";

class FormInput extends React.Component {
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
          <input
            type={this.props.type}
            id={this.props.label.toLowerCase()}
            min={this.props.min ? this.props.min : null}
            max={this.props.max ? this.props.max : null}
            required={this.props.required ? true : false}
            multiple={this.props.multiple ? true : false}
            className="form-control"
            onChange={this.props.onChange}
          />
          <span>
            {this.props.multiple ? "Hold control to select multiple" : ""}
          </span>
        </div>
      </div>
    );
  }
}
export default FormInput;
