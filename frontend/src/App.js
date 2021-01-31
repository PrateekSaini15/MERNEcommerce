import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Navbar/Header";
import Home from "./routes/Landing/Home/Home";
import UserSignin from "./routes/Landing/UserSignin/UserSignin";
import UserSignup from "./routes/Landing/UserSignup/UserSignup";
import store from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact={true} path="/user/signin" component={UserSignin} />
              <Route exact={true} path="/user/signup" component={UserSignup} />
              <ProtectedRoute exact={true} path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </>
    );
  }
}

export default App;
