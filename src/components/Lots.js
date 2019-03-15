import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import LotHandler from "./LotHandler";


export default class Lots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: null,
            name: "",
            lot_id: "",
            capacity: "",
            latitude: "",
            longitude: ""
        };
        this.inputOnChange = this.inputOnChange.bind(this);
        this.postLotData = this.postLotData.bind(this);
    };

    inputOnChange(event) {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    };



    postLotData = () => {
        let formData = new FormData();
        formData.append('lot_id', this.state.city);
        formData.append('name', this.state.name);
        formData.append('city', this.state.city);
        formData.append('capacity', this.state.capacity);
        formData.append('latitude', this.state.lat);
        formData.append('longitude', this.state.lng);

        // Post to flask and get parking lot response
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/newLot',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then((response) => {
                alert('Done')
            })
            .catch(function (response) {
                console.log(response);
            });
    };

    render() {

        return (
            <div className='lot-form'>
                <h3>Add a new parking lot</h3>
                <input type="text" value={this.state.lot_id} onChange={this.inputOnChange} name="lot_id" placeholder="id"/> <br />
                <input type="text" value={this.state.name} onChange={this.inputOnChange} name="name" placeholder="name"/> <br />
                <input type="text" value={this.state.city} onChange={this.inputOnChange} name="city" placeholder="city"/> <br />
                <input type="text" value={this.state.capacity} onChange={this.inputOnChange} name="capacity" placeholder="capacity"/> <br />
                <input type="text" value={this.state.latitude} onChange={this.inputOnChange} name="latitude" placeholder="latitude"/> <br />
                <input type="text" value={this.state.longitude} onChange={this.inputOnChange} name="longitude" placeholder="longitude"/> <br />

                <button onClick={this.postLotData}>Post</button>
            </div>
        );
    }
}