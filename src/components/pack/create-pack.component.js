import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import PackTracker from './pack-tracker.component';

export default class CreatePack extends Component {

    
    constructor(props) {
        super(props);

        this.onChangePackName = this.onChangePackName.bind(this);
        this.onChangePackContent = this.onChangePackContent.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: "",
            name: "",
            content: "",
            duration: 0,
            price: 0,
            created_at: new Date(),
            totalTraining: 0,
        }
    }

    componentDidMount() {
     
        axios.get('http://localhost:8080/packs/')
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

    onChangePackName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangePackContent(e) {
        this.setState({
            content: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const pack = {
            id: this.state.totalTraining,
            name: this.state.name,
            content: this.state.content,
            duration: this.state.duration,
            price: this.state.price,
            date: this.state.created_at,
        }

        axios.post('http://localhost:8080/packs/add', pack)
        .then(res => console.log(res.data));
        alert("New pack is created");
        window.location = '/packs';
    }

    render() {
        return (
            <div>
                <PackTracker/>
                <br/>
                <h3>Create new pack</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className = "form-group">
                      <label>Pack name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangePackName}
                        /> 
                    </div>
                    
                    <div className = "form-group">
                        <label>Content: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onChangePackContent}
                        /> 
                    </div>

                    <div className = "form-group">
                      <label>Duration (months): </label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        /> 
                    </div>

                    <div className = "form-group">
                      <label>Price (VND): </label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            /> 
                    </div>

                    <div className = "form-group">
                    <input type = "submit" value = "Create New Pack" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}