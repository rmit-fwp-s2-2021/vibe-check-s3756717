import './App.css';
import PrivateRoute from './components/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './components/Profile';
import MakeNewPost from './components/MakeNewPost';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';


function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Landing}></Route>
            <PrivateRoute path = "/dash" exact component={Dashboard}></PrivateRoute>
            <PrivateRoute path = "/profile" exact component = {Profile}></PrivateRoute>
            <PrivateRoute path = "/make" exact component = {MakeNewPost}></PrivateRoute>
            <Route path = "/signUp" exact component = {SignUp}></Route>
            <Route path = "/signIn" exact component = {SignIn}></Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
