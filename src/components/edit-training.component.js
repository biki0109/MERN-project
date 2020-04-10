import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditTraining extends Component {
    constructor(props) {
        super(props);

        this.onChangeClientName = this.onChangeClientName.bind(this);
        this.onChangeClientID = this.onChangeClientID.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            id: "0",
            clientID: "",
            ptID: "3",
            clientNames: [],
            description: '',
            date: new Date(),
            totalTraining: 0,
        }
    }

    componentDidMount() {

        axios.get('http://localhost:8080/trainings/'+this.props.match.params.id)
        .then(res => {
            this.setState ({
                id: res.data.id,
                ptID: res.data.ptID,
                clientID: res.data.clientID,
                clientName: res.data.clientName,
                description: res.data.description,
                date: new Date(res.data.date),
            })
        })

        axios.get('http://localhost:8080/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    clientNames: response.data.map(user => user.name),
                })
            }
        })
        
        axios.get('http://localhost:8080/trainings/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    totalTraining: response.data.length,
                })
            } else this.setState({
                totalTraining: 1,
            })
        })
    }

    onChangeClientID(e) {
        this.setState({
            clientID: e.target.value
        })
    }

    onChangeClientName(e) {
        this.setState({
            clientName: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const training = {
            id: this.state.id,
            ptID: '3',
            clientID: this.state.clientID,
            clientName: this.state.clientName,
            description: this.state.description,
            date: this.state.date,
        }

        axios.post('http://localhost:8080/trainings/update/'+this.props.match.params.id, training)
        .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit training schedule</h3>
                <form onSubmit={this.onSubmit}>
                    <div className = "form-group">
                        <label>Client's name: </label>
                        <select ref = "userInput"
                            required
                            className = "form-control"
                            value={this.state.clientName}
                            onChange={this.onChangeClientName}>
                            {
                                this.state.clientNames.map(function(user) {
                                    return <option 
                                            key={user}>{user}
                                           </option> 
                                })  
                            }
                        </select>
                    </div>
                    
                    <div className = "form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            /> 
                    </div>

                    <div className = "form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div> 
                    </div>

                    <div className = "form-group">
                    <input type = "submit" value = "Edit Training Schedule" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}