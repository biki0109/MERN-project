import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Training = props => (
    <tr>
      <td>{props.training.clientName}</td>
      <td>{props.training.clientID}</td>
      <td>{props.training.ptID}</td>
      <td>{props.training.description}</td>
      <td>{props.training.date.substring(0,10)}</td>
      <td>
        <Link to={"/trainings/edit/"+props.training.id} >Edit</Link> | <a href = "#" onClick={() =>{ props.deleteTraining(props.training.id) }}>Delete</a>    
      </td>
    </tr>
)

export default class TrainingList extends Component {
    constructor(props) {
        super(props);

        this.deleteTraining = this.deleteTraining.bind(this);

        this.state = {
            trainings: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/trainings/')
        .then(res => {
            this.setState({
                trainings: res.data,
            })
            console.log(res.data);
        })
        .catch((error) => {
           console.log(error);
        })
    }

    deleteTraining(id) {
        axios.delete('http://localhost:8080/trainings/'+id)
        .then(res => {console.log(res.data)})
        this.setState({
            trainings: this.state.trainings.filter(el => el.id !== id)
        })
    }

    trainingList() {
        return this.state.trainings.map(currentTraining => {
            return <Training training={currentTraining} deleteTraining={this.deleteTraining} key={currentTraining.id}/>;
        })
    }

    render() {
        return (
            <div>
              <br/>
              <h3>Training schedules</h3>
              <br/>
                <table className = "table">
                  <thead className = "thead-light">
                    <tr>
                      <th>Client's name</th>
                      <th>Client's ID</th>
                      <th>PT's ID</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>  
                  </thead>
                  <tbody>{this.trainingList()}</tbody>
                </table>
            </div>
        )
    }
}