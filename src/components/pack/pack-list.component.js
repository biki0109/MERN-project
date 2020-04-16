import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pack = props => (
    <tr>
      <td>{props.pack.name}</td>
      <td>{props.pack.content}</td>
      <td>{props.pack.duration}</td>
      <td>{props.pack.price}</td>
      <td>
        <Link to={"/packs/edit/"+props.pack._id} >Edit</Link> | <a href = "#" onClick={() =>{ props.deletePack(props.pack._id) }}>Delete</a>    
      </td>
    </tr>
)

export default class PackList extends Component {
    constructor(props) {
        super(props);

        this.deletePack = this.deletePack.bind(this);

        this.state = {
            packs: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/packs/')
        .then(res => {
            this.setState({
                packs: res.data,
            })
        })
        .catch((error) => {
           console.log(error);
        })
    }

    deletePack(id) {
        axios.delete('http://localhost:8080/packs/'+id)
        .then(res => {console.log(res.data)})
        this.setState({
            packs: this.state.packs.filter(el => el._id !== id)
        })
    }

    packList() {
        return this.state.packs.map(currentPack => {
            return <Pack pack={currentPack} deletePack={this.deletePack} key={currentPack._id}/>;
        })
    }

    render() {
        return (
            <div>
              <br/>
              <h3>All packs available</h3>
              <br/>
                <table className = "table">
                  <thead className = "thead-light">
                    <tr>
                      <th>Pack name</th>
                      <th>Content</th>
                      <th>Duration (months)</th>
                      <th>Price (VND)</th>
                      <th>Actions</th>
                    </tr>  
                  </thead>
                  <tbody>{this.packList()}</tbody>
                </table>
            </div>
        )
    }
}