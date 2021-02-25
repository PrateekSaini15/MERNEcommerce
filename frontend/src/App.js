import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Navbar/Header";
import Home from "./routes/Landing/Home/Home";
import UserSignin from "./routes/Landing/UserSignin/UserSignin";
import UserSignup from "./routes/Landing/UserSignup/UserSignup";
import MerchantSignin from "./routes/Merchant/MerchantSignin/MerchantSignin";
import MerchantHome from "./routes/Merchant/MerchantHome/MerchantHome";
import UserProtectedRoute from "./components/UserProtectedRoute/UserProtectedRoute";
import MerchantProtectedRoute from "./components/MerchantProtectedRoute/MerchantProtectedRoute";
import store from "./redux/store";

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/user/signin" component={UserSignin} />
              <Route path="/user/signup" component={UserSignup} />
              <Route path="/merchant/signin" component={MerchantSignin} />
              <MerchantProtectedRoute
                path="/merchant/home"
                component={MerchantHome}
              />
              <UserProtectedRoute path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </>
    );
  }
}

export default App;
