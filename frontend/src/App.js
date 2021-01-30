import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Navbar/Header";
import Home from "./routes/Landing/Home/Home";
import UserSignin from "./routes/Landing/UserSignin/UserSignin";
import UserSignup from "./routes/Landing/UserSignup/UserSignup";
class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/user/signin" component={UserSignin} />
            <Route path="/user/signup" component={UserSignup} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
