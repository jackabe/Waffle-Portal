import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";
import MapComponent from "./Map";
import {Marker} from "react-google-maps";
import SweetAlert from "sweetalert-react";

class Geofences extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            fences: [],
            openForm: false,
            value: true,
            showNav: false,
            geofenceMap: true,
            showLocationPins: false,
            geofenceTable: false,
            region: {
                latitude: 51.482171,
                longitude: -3.171731,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            },
            name: '',
            longitude: '',
            latitude: '',
            radius: '',
            fenceId: ''
        };

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.postNewGeofence = this.postNewGeofence.bind(this);
        this.openForm = this.openForm.bind(this);
    }

    componentDidMount() {
        this.loadFences();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (event.target.className !== 'users-side-nav' && event.target.className === '') {
            this.setState({
                showNav: false,
            });
        }
    }

    loadFences = () => {
        axios({
            method: 'get',
            url: 'http://18.188.105.214/geofences/get',
        })
            .then((response) => {
                let data = response.data;
                let i = 0;
                let fences = [];
                for (i; i < data.length; i++) {
                    let fence = {
                        id: data[i]['fence_id'],
                        longitude: data[i]['fence_longitude'],
                        latitude: data[i]['fence_latitude'],
                        radius: data[i]['fence_radius'],
                        name: data[i]['fence_name'],
                    };
                    fences.push(fence);
                    // As not async, check all done before updating state
                    if (i === fences.length - 1) {
                        this.setState({loading: false});
                        this.setState({fences: fences});
                    }
                }
                if (fences.length === 0) {
                    this.setState({loading: false});
                }
            })
            .catch((response) => {
                console.log(response);
                this.setState({loading: false});
            });
    };

    inputOnChange(event) {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    postNewGeofence = () => {
        let formData = new FormData();
        formData.append('fence_id', this.state.fenceId);
        formData.append('fence_name', this.state.name);
        formData.append('fence_latitude', this.state.latitude);
        formData.append('fence_longitude', this.state.longitude);
        formData.append('fence_radius', this.state.radius);
        // Post to flask and get parking lot response
        axios({
            method: 'post',
            url: 'http://18.188.105.214/geofence/add',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then((response) => {
                this.setState({
                    showAlert: true,
                    alertTitle: 'Success!',
                    alertInfo: 'Geofence added!'
                });
                this.loadFences();
            })
            .catch(function (response) {
                console.log(response);
            });
    };

    onSideBarClick = (route) => {
        if (route === 'open-nav') {
            this.setState({
                showNav: true,
            });
        }
        else if (route === 'geofence-map') {
            this.setState({
                geofenceMap: true,
                geofenceTable: false,
                showLocationPins: false
            });
        }
        else if (route === 'geofence-table') {
            if (this.state.geofenceTable) {
                this.setState({
                    geofenceTable: false,
                });
            }
            else {
                this.setState({
                    geofenceTable: true,
                    geofenceMap: false,
                });
            }
        }
        else if (route === 'geofence-locations') {
            this.setState({
                showLocationPins: true,
                geofenceMap: true,
            })
        }
        else {
            this.setState({
                showAlert: true,
                alertTitle: 'No route yet',
                alertInfo: 'Sorry, no route has been added for '+route+' yet!'
            });
        }
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
            <div>
                <SweetAlert
                    show={this.state.showAlert}
                    title={this.state.alertTitle}
                    text={this.state.alertInfo}
                    showConfirmButton={false}
                    showCancelButton
                    cancelButtonText='Close'
                    animation="slide-from-top"
                    type="success"
                    onCancel={() => this.setState({ showAlert: false })}
                />

                {this.state.geofenceMap ?
                    <div>
                        <MapComponent
                            data={this.state.region}
                            parkingUsers={[]}
                            markers={[]}
                            cluser={false}
                            fencePins={this.state.showLocationPins}
                            fences={this.state.fences}
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div className='map'/>}
                            containerElement={<div className='map'/>}
                            mapElement={<div className='map'/>}
                        />
                    </div>
                    :
                    <div className='geofences-manage'>
                        <h3>Manage Geofences</h3>
                        <div className="container-table100">
                            <div className="wrap-table100">
                                <div className="table100">
                                    <table>
                                        <thead>
                                            <tr className='geofences-table-header'>
                                                <th className="column1">ID</th>
                                                <th className="column2">Name</th>
                                                <th className="column3">Latitude</th>
                                                <th className="column4">Longitude</th>
                                                <th className="column5">Radius</th>
                                                <th className="column6">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.fences.map(fence => (
                                                    <tr id={fence['id']}>
                                                        <td className="column1">
                                                            {fence['id']}
                                                        </td>
                                                        <td className="column2">
                                                            {fence['name']}
                                                        </td>
                                                        <td className="column3">
                                                            {fence['latitude']}
                                                        </td>
                                                        <td className="column4">
                                                            {fence['longitude']}
                                                        </td>
                                                        <td className="column5">
                                                            {fence['radius']}
                                                        </td>
                                                        <td className="column6">
                                                            <FontAwesome
                                                                name='trash'
                                                                className='table-icon'
                                                                size='lg'
                                                            />
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
                            <div className='goefence-form'>
                                <div className='lot-form'>
                                    <input type="text" value={this.state.fenceId} onChange={this.inputOnChange}
                                           name="fenceId" placeholder="ID"/> <br/>
                                    <input type="text" value={this.state.name} onChange={this.inputOnChange}
                                           name="name" placeholder="Name"/> <br/>
                                    <input type="text" value={this.state.latitude} onChange={this.inputOnChange}
                                           name="latitude" placeholder="Latitude"/> <br/>
                                    <input type="text" value={this.state.longitude} onChange={this.inputOnChange}
                                           name="longitude" placeholder="Longitude"/> <br/>
                                    <input type="text" value={this.state.radius} onChange={this.inputOnChange}
                                           name="radius" placeholder="Radius"/> <br/>

                                    <button className='button' onClick={this.postNewGeofence}>Save</button>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                }

                <div className='users-side-tab' onClick={() => this.onSideBarClick('open-nav')}>
                    <FontAwesome
                        name='arrow-left'
                        className='tab-center'
                        size='2x'
                    />
                </div>

                {this.state.showNav ?
                    <div className='users-side-nav'>
                        <ul>
                            <li>
                                <FontAwesome
                                    onClick={() => this.onSideBarClick('geofence-map')}
                                    name='street-view'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li onClick={() => this.onSideBarClick('geofence-locations')}>
                                <FontAwesome
                                    name='location-arrow'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li>
                                <FontAwesome
                                    onClick={() => this.onSideBarClick('geofence-table')}
                                    name='table'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </ul>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default Geofences;

