import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MyProfile from "./MyProfile";
import Forum from "./Forum";
import { getUser, removeUser } from "../data/repository";

export default function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Switch>
              <Route path="/login">
                <Login loginUser={loginUser} />
              </Route>
              <Route path="/register">
                <Register loginUser={loginUser} />
              </Route>
              <Route path="/profile">
                <MyProfile user={user} />
              </Route>
              <Route path="/forum">
                <Forum user={user} />
              </Route>
              <Route path="/">
                <Home user={user} />
              </Route>
            </Switch>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
