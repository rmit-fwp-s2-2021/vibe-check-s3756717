import './App.css';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import Statistics from './components/Statistics';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Router>
          <NavBar/>
          <main role="main">
            <div className="container my-3">
              <Switch>
                <Route path = "/stats">
                  <Statistics />
                </Route>
                <Route path = "/posts">
                    <Posts />
                </Route>
                <Route path="/">
                  <Dashboard />
                </Route>
                
              </Switch>
            </div>
          </main>
        </Router>
    </div>
  );
}

export default App;
