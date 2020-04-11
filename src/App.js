import React from 'react';
import logo from './logo.svg';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import TrainingList from "./components/training-list.component";
import CreateTraining from "./components/create-training.component";
import EditTraining from "./components/edit-training.component";

function App() {
  return (
    <Router>
      <div className = "">
        Header here
      </div>
      
      <div className="App">
      Something goes here
      </div>
      
      <div className = "container">
        <Navbar />
        <br/>
        <Route path = '/trainings' exact component={TrainingList} />
        <Route path = '/trainings/edit/:id' component={EditTraining} />
        <Route path = '/trainings/create' component={CreateTraining} />
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Router>
  );
}

export default App;
