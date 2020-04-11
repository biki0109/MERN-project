import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import 'jquery';
//import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Button} from 'react';

export default class Navbar extends Component {
    constructor(props) {

        super(props);
        
        this.toggleNavbar = this.toggleNavbar.bind(this);
        
        this.state = {
        
          collapsed: true,
        
        };
    }
    toggleNavbar() {

        this.setState({
        
          collapsed: !this.state.collapsed,
        
        });
    }
    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        //const classTwo = collapsed ? 'navbar-toggler navbar-toggler-left collapsed' : 'navbar-toggler navbar-toggler-left';
        return (
            
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg fixed-top" >
                
                <Link to="/trainings" className = "navbar-brand">Training Tracker</Link>
                <button
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={this.toggleNavbar} 
                    className="navbar-toggler"
                >
                <span className="navbar-toggler-icon" />
                </button>
                <div className={`${classOne}`}  id="navbarNavAltMarkup" onClick={this.toggleNavbar}>
                <ul className = "navbar-nav ">
                    <li className = "navbar-item ml-5">
                    <Link to="/trainings" className = "nav-link">Training Schedule</Link>
                    </li>
                    <li className = "navbar-item ml-5">
                    <Link to="/trainings/create" className = "nav-link">Create Schedule</Link>
                    </li>
                </ul>
                </div>
                
            </nav>
        );
    }
}