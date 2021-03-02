import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import AdminSignin from "./routes/Admin/AdminSignin/AdminSignin";
import MerchantSignin from "./routes/Merchant/MerchantSignin/MerchantSignin";
import MerchantSignup from "./routes/Landing/MerchantSignup/MerchantSignup";
import UserSignin from "./routes/Landing/UserSignin/UserSignin";
import UserSignup from "./routes/Landing/UserSignup/UserSignup";
import AdminHome from "./routes/Admin/AdminHome/AdminHome";
import Home from "./routes/Landing/Home/Home";
import MerchantHome from "./routes/Merchant/MerchantHome/MerchantHome";
import Header from "./components/Navbar/Header";
import UserProtectedRoute from "./components/UserProtectedRoute/UserProtectedRoute";
import MerchantProtectedRoute from "./components/MerchantProtectedRoute/MerchantProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute/AdminProtectedRoute";
import store from "./redux/store";

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/admin/signin" component={AdminSignin} />
              <Route path="/merchant/signin" component={MerchantSignin} />
              <Route path="/merchant/signup" component={MerchantSignup} />
              <Route path="/user/signin" component={UserSignin} />
              <Route path="/user/signup" component={UserSignup} />
              <MerchantProtectedRoute
                path="/merchant/home"
                component={MerchantHome}
              />
              <AdminProtectedRoute path="/admin/home" component={AdminHome} />
              <UserProtectedRoute path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </>
    );
  }
}

export default App;
