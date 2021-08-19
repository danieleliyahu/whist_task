import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Stats from "./components/Stats";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/admin">admin</Link>
        <Link to="/">home</Link>
        <Link to="/stats">stats</Link>
        <main>
          <Route path="/admin" component={Admin} exact></Route>
          <Route path="/stats" component={Stats} exact></Route>
          <Route path="/" component={Home} exact></Route>
        </main>
      </div>
    </Router>
  );
}

export default App;
