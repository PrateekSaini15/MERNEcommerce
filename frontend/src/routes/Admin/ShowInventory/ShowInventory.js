import React from "react";
import { connect } from "react-redux";
import { getProductInventory } from "../../../redux/actions/inventoryActions";

class ShowInventory extends React.Component {
  constructor(props) {
    super(props);
    this.getMarkup = this.getMarkup.bind(this);
    this.createRow = this.createRow.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }
  componentDidMount() {
    this.props.getProductInventory(this.props.location.state._id);
  }

  formatDate(date) {
    const dateObject = new Date(date);
    const options = { timeStyle: "medium", dateStyle: "medium" };
    return new Intl.DateTimeFormat([], options).format(dateObject);
  }

  createRow(entry) {
    return (
      <tr key={entry._id}>
        <td>{this.formatDate(entry.Date)}</td>
        <td>{entry.stockQuantity}</td>
      </tr>
    );
  }

  getMarkup() {
    const entries = this.props.entries;
    const markup = entries.map(this.createRow);
    return markup;
  }

  render() {
    const name = this.props.location.state.name;
    const markup = this.getMarkup();
    return (
      <>
        <h4 className="display-4 text-center">Inventory</h4>
        <h5 className="display-5 text-center">{name}</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date(Time)</th>
              <th scope="col">Stock Quantity</th>
            </tr>
          </thead>
          <tbody>{markup}</tbody>
        </table>
      </>
    );
  }
}

function mapStateToProps(store) {
  return { entries: store.inventory.entries };
}

const mapActionToProps = {
  getProductInventory,
};

export default connect(mapStateToProps, mapActionToProps)(ShowInventory);
