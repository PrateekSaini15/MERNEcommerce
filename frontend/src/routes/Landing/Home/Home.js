import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { logoutUser } from "../../../redux/actions/authActions";
import ShowCategories from "../../Admin/ShowCategories/ShowCategories";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AddCategory from "../../Admin/AddCategory/AddCategory";

class Home extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <Switch>
          <Route path={`${match.url}categories`} component={ShowCategories} />
          <Route path={`${match.url}category/add`} component={AddCategory} />
        </Switch>
        <Button onClick={this.props.logoutUser}>Logout</Button>
      </>
    );
  }
}

export default connect(null, { logoutUser })(Home);
