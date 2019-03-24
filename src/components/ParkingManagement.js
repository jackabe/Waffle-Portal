import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import LotHandler from "../scripts/LotHandler";


export default class ParkingManagement extends Component {

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
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}