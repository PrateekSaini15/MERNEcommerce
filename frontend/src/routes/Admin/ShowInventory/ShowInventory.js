import React from "react";
import { connect } from "react-redux";
import {
  getProductInventory,
  addEntryToInventory,
} from "../../../redux/actions/inventoryActions";
import NewInvetoryEntry from "../../../components/NewInventoryEntry/NewInventoryEntry";
class ShowInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getNewEntry: false,
    };
    this.getBodyMarkup = this.getBodyMarkup.bind(this);
    this.createRow = this.createRow.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getFinalRowMarkup = this.getFinalRowMarkup.bind(this);
    this.toggleGetNewEntry = this.toggleGetNewEntry.bind(this);
    this.toggleGetNewEntry2 = this.toggleGetNewEntry2.bind(this);
  }
  componentDidMount() {
    this.props.getProductInventory(this.props.location.state._id);
  }

  toggleGetNewEntry2() {
    console.log(this.state);
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

  getBodyMarkup() {
    const entries = this.props.entries;
    const markup = entries.map(this.createRow);
    return markup;
  }

  toggleGetNewEntry() {
    this.setState((prevState) => ({
      prevState,
      getNewEntry: !prevState.getNewEntry,
    }));
  }

  getFinalRowMarkup() {
    return (
      <tr>
        <td></td>
        <td>
          <button className="btn" onClick={this.toggleGetNewEntry}>
            <i className="bi bi-clipboard-plus" style={{ color: "green" }}></i>
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const name = this.props.location.state.name;
    const bodyMarkup = this.getBodyMarkup();
    const finalRowMarkup = this.getFinalRowMarkup();
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
          <tbody>
            {bodyMarkup}
            {finalRowMarkup}
          </tbody>
        </table>
        {this.state.getNewEntry ? (
          <NewInvetoryEntry
            productId={this.props.location.state._id}
            addEntryToInventory={this.props.addEntryToInventory}
            toggle={this.toggleGetNewEntry}
          />
        ) : null}
      </>
    );
  }
}

function mapStateToProps(store) {
  return { entries: store.inventory.entries };
}

const mapActionToProps = {
  getProductInventory,
  addEntryToInventory,
};

export default connect(mapStateToProps, mapActionToProps)(ShowInventory);
