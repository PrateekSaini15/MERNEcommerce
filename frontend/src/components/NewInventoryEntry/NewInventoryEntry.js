import React from "react";
import FormInput from "../FormInput/FormInput";
import "./style.css";
class NewInvetoryEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState((prevState) => ({
      prevState,
      [event.target.id]: event.target.value,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const entry = {
      productId: this.props.productId,
      quantity: this.state.quantity,
    };
    this.props.addEntryToInventory(entry);
    this.props.toggle();
  }

  render() {
    return (
      <>
        <div className="popup">
          <div className="popup_inner">
            <h6 className="display-6 text-center">New Entry</h6>
            <form onSubmit={this.handleSubmit}>
              <div className="row align-item-center">
                <FormInput
                  id="quantity"
                  label="Quantity"
                  type="number"
                  required="true"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-success">
                      Add
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-danger"
                      onClick={this.props.toggle}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default NewInvetoryEntry;
