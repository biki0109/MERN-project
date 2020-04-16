import 'bootstrap/dist/css/bootstrap.min.css';
//import { Button } from 'reactstrap';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";

import './assets/newCSS/home.css';

import './App.css';
//Training
import Navbar from "./components/training/training-tracker.component";
import TrainingList from "./components/training/training-list.component";
import CreateTraining from "./components/training/create-training.component";
import EditTraining from "./components/training/edit-training.component";
//Pack
import PackTracker from "./components/pack/pack-tracker.component";
import PackList from "./components/pack/pack-list.component";
import CreatePack from "./components/pack/create-pack.component";
import EditPack from "./components/pack/edit-pack.component";

//new
import React, { Component } from 'react';
import { Container } from 'reactstrap'
import { Provider } from 'react-redux';

import { loadUser } from './actions/authActions';
import store from './store';
import AppNavbar from './components/AppNavbar'

//import CoursesList from './components/CoursesList';
//import ItemModal from './components/itemModal'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {

    const privateRoute = ( //chưa xài
      <Router>
      <div className = "container">
          <br/>
          <Route path = '/packs/' exact component={PackTracker} />
          <Route path = '/packs/' exact component={PackList} />
          <Route path = '/packs/edit/:id' component={EditPack} /> 
          <Route path = '/packs/create' component={CreatePack} />
          
      </div>
   
      <div className = "container">
          <Route path = '/trainings' exact component={Navbar} />
          <Route path = '/trainings' exact component={TrainingList} />
          <Route path = '/trainings/edit/:id' component={EditTraining} />
          <Route path = '/trainings/create' component={CreateTraining} />
      </div>
      </Router>
    );

    return (
      <Provider store={store}>
        <div className="">
          <AppNavbar />
          <Container>
            BODY
            <Router>
             <div className = "container">
              <br/>
                  <Route path = '/packs/' exact component={PackTracker} />
                  <Route path = '/packs/' exact component={PackList} />
                  <Route path = '/packs/edit/:id' component={EditPack} /> 
                  <Route path = '/packs/create' component={CreatePack} />
              </div>
   
              <div className = "container">
                  <Route path = '/trainings' exact component={Navbar} />
                  <Route path = '/trainings' exact component={TrainingList} />
                  <Route path = '/trainings/edit/:id' component={EditTraining} />
                  <Route path = '/trainings/create' component={CreateTraining} />
              </div>
            </Router>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
