import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/trainings" className = "navbar-brand">TrainingTracker</Link>
                <div className = "collapse navbar-collapse">
                <ul className = "navbar-nav mr-auto">
                    <li className = "navbar-item">
                    <Link to="/trainings" className = "nav-link">Training Schedule</Link>
                    </li>
                    <li className = "navbar-item">
                    <Link to="/trainings/create" className = "nav-link">Create Schedule</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}