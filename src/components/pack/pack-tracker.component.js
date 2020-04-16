import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PackTracker extends Component {
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
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg" >
               
                <Link to="/packs" className = "navbar-brand">Pack</Link>
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
                    <Link to="/packs" className = "nav-link">Packs list</Link>
                    </li>
                    <li className = "navbar-item ml-5">
                    <Link to="/packs/create" className = "nav-link">Create pack</Link>
                    </li>
                </ul>
                </div>
                
            </nav>
        );
    }
}