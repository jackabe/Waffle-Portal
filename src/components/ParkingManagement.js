import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import LotHandler from "../scripts/LotHandler";
import FontAwesome from "react-fontawesome";
import SweetAlert from "sweetalert-react";


export default class ParkingManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Form
            city: null,
            name: "",
            lot_id: "",
            capacity: "",
            latitude: "",
            longitude: "",
            // Table
            carParks: [],
            openForm: false,
        };
        this.inputOnChange = this.inputOnChange.bind(this);
        this.postLotData = this.postLotData.bind(this);
        this.openForm = this.openForm.bind(this);
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

    openForm() {
        if (this.state.openForm) {
            this.setState({
                openForm: false,
            });
        }
        else {
            this.setState({
                openForm: true,
            });
        }
    }

    render() {

        return (

            <div className="carpark-manage">
                <h3>Manage Car Parks</h3>
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <table>
                                <thead>
                                    <tr className="carpark-table-header">
                                        <th className="column1">ID</th>
                                        <th className="column2">Name</th>
                                        <th className="column3">Latitude</th>
                                        <th className="column4">Longitude</th>
                                        <th className="column5">City</th>
                                        <th className="column6">Capacity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.carParks.map(carpark => (
                                            <tr id={carpark['id']}>
                                                <td className="column1">
                                                    {carpark['id']}
                                                </td>
                                                <td className="column2">
                                                    {carpark['name']}
                                                </td>
                                                <td className="column3">
                                                    {carpark['latitude']}
                                                </td>
                                                <td className="column4">
                                                    {carpark['longitude']}
                                                </td>
                                                <td className="column5">
                                                    {carpark['city']}
                                                </td>
                                                <td className="column6">
                                                    {carpark['capacity']}
                                                </td>
                                            </tr>

                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <FontAwesome
                    name='plus-circle'
                    onClick={this.openForm}
                    className='add-button'
                    size='3x'
                />

                {this.state.openForm ?
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
                    :
                    null
                }

            </div>
        );
    }
}