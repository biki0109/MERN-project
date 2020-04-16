import React, { Component } from 'react';
import PackTracker from './pack-tracker.component';
import axios from 'axios';

export default class EditPack extends Component {   
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
        axios.get('http://localhost:8080/packs/'+this.props.match.params.id)
        .then(res => {       
            this.setState ({
                id: res.data.id,
                name: res.data.name,
                content: res.data.content,
                duration: res.data.duration,
                price: res.data.price,
                created_at: new Date(res.data.created_at),
            })
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
            id: this.state.id,
            name: this.state.name,
            content: this.state.content,
            duration: this.state.duration,
            price: this.state.price,
            date: this.state.created_at,
        }
console.log(pack);
        axios.put('http://localhost:8080/packs/update/'+this.props.match.params.id, pack)
        .then(res => console.log(res.data));
        alert("Pack is updated");
        window.location = '/packs';
    }

    render() {
        return (
            <div>
                <PackTracker/>
                <br/>
                <h3>Update pack</h3>
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
                    <input type = "submit" value = "Update pack" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}