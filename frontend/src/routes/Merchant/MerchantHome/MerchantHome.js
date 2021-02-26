import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { logoutMerchant } from "../../../redux/actions/merchantAuthActions";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AddProduct from "../AddProduct/AddProduct";
import ShowProduct from "../ShowProduct/ShowProduct";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import ShowInventory from "../ShowInventory/ShowInventory";
import ShowOrder from "../ShowOrder/ShowOrder";

class Home extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div className="row">
        <div className="col-2" style={{ backgroundColor: "black" }}>
          <Sidebar />
          <Button onClick={this.props.logoutMerchant}>Logout</Button>
        </div>
        <div className="col-10">
          <Switch>
            <Route path={`${match.url}/product/add`} component={AddProduct} />
            <Route
              path={`${match.url}/product/update`}
              component={UpdateProduct}
            />
            <Route path={`${match.url}/inventory`} component={ShowInventory} />
            <Route path={`${match.url}/products`} component={ShowProduct} />
            <Route path={`${match.url}/orders`} component={ShowOrder} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(null, { logoutMerchant })(Home);
