import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { logoutAdmin } from "../../../redux/actions/authAdminActions";
import ShowCategories from "../ShowCategories/ShowCategories";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AddCategory from "../AddCategory/AddCategory";

class Home extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <Sidebar />
        <Switch>
          <Route path={`${match.url}/categories`} component={ShowCategories} />
          <Route path={`${match.url}/category/add`} component={AddCategory} />
        </Switch>
        <Button onClick={this.props.logoutAdmin}>Logout</Button>
      </>
    );
  }
}

export default connect(null, { logoutAdmin })(Home);
