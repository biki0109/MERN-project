import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateTraining extends Component {

    
    constructor(props) {
        super(props);

        this.onChangeClientName = this.onChangeClientName.bind(this);
        this.onChangeClientID = this.onChangeClientID.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: "0",
            clientID: "0",
            ptID: "3",
            clientNames: [],
            clientNames_ID: new Array(),
            description: '',
            date: new Date(),
            totalTraining: 0,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users/')
        .then(response => {
            if (response.data.length > 0) {
                console.log(response.data)
                this.setState({
                    clientNames: response.data.map(user => user.name),
                    clientName: response.data[0].name,
                    clientNames_ID: response.data.map(user => ({['id']: user.id, ['name']: user.name})),      
                })
            }
        })
        
        axios.get('http://localhost:8080/trainings/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    totalTraining: response.data.length+1,
                })
            } else {
                this.setState({
                    totalTraining: 1,
                })
            }
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
            id: this.state.totalTraining,
            ptID: '3', //chỗ này chưa login chưa lấy id của pt dc
            clientID: this.state.clientNames_ID.find(a => a.name === this.state.clientName).id,
            clientName: this.state.clientName,
            description: this.state.description,
            date: this.state.date,
        }

        axios.post('http://localhost:8080/trainings/add', training)
        .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create training schedule</h3>
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
                    <input type = "submit" value = "Create Training Schedule" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}