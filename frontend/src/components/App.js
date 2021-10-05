import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MyProfile from "./MyProfile";
import Forum from "./Forum";
import { getUser, removeUser } from "../data/repository";
import Dashboard from "./Dashboard";
import MakeNewPost from "./MakeNewPost";

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
    <div className="App">
      <Router>
        {/* <Navbar user={user} logoutUser={logoutUser} /> */}
        <main role="main">
          <div className="container my-3">
            <Switch>
              <Route path = "/dashboard">
                <Dashboard user={user}/>
              </Route>
              <Route path="/login">
                <Login loginUser={loginUser} />
              </Route>
              <Route path = "/make">
                <MakeNewPost user = {user}/>
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
                <Home />
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
}
