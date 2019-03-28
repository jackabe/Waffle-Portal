import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import FontAwesome from "react-fontawesome";
import UltraView from "./UltraView";
import LotChartsView from "./LotChartsView";
import SweetAlert from 'sweetalert-react';

export default class ParkingManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lot: {details: {lot_id: ''}},
            city: null,
            name: "",
            capacity: "",
            map: false,
            charts: false,
            manage: true,
            latitude: "",
            longitude: "",
            carParks: [],
            openForm: false,
            search_city: "",
            search: false,
            showNav: false,
            openSelector: false,
            showAlert: false,
            alertTitle: '',
            alertInfo: '',
            type: '',
        };
        this.inputOnChange = this.inputOnChange.bind(this);
        this.postLotData = this.postLotData.bind(this);
        this.openForm = this.openForm.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (event.target.className !== 'lot-list-item') {
            this.setState({
                openSelector: false,
            });
        }
        if (event.target.className !== 'users-side-nav' && event.target.className === '') {
            this.setState({
                showNav: false,
            });
        }
    }

    inputOnChange(event) {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    postLotData = () => {
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('city', this.state.city);
        formData.append('capacity', this.state.capacity);
        formData.append('latitude', this.state.latitude);
        formData.append('longitude', this.state.longitude);

        // Post to flask and get parking lot response
        axios({
            method: 'post',
            url: 'http://18.188.105.214/lots/new',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then((response) => {
                this.setState({
                    showAlert: true,
                    type: 'success',
                    alertTitle: 'Lot added!',
                    alertInfo: 'You have successfully created the parking lot ' +this.state.name
                });
            })
            .catch(function (response) {
                console.log(response);
                this.setState({
                    showAlert: true,
                    type: 'info',
                    alertTitle: 'Error',
                    alertInfo: 'There was a problem with that request'
                });
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

    openSelector = () => {
        if (this.state.openSelector) {
            this.setState({
                openSelector: false
            })
        }
        else {
            this.setState({
                openSelector: true
            })
        }
    };

    onSideBarClick = (route) => {
        if (route === 'open-nav') {
            this.setState({
                showNav: true,
            });
        }
        else if (route === 'lot-manage') {
            this.setState({
                manage: true,
                map: false,
                charts: false
            });
        }
        else if (route === 'lot-map') {
            this.setState({
                map: true,
                manage: false,
                charts: false
            });
        }
        else if (route === 'lot-graphs') {
            this.setState({
                charts: true,
                manage: false,
                map: false
            });
        }
        else {
            this.setState({
                showAlert: true,
                alertTitle: 'No route yet',
                alertInfo: 'Sorry, no route has been added for ' + route + ' yet!'
            });
        }
    };

    render() {
        return (
            <div className='parking-management'>
                <div className='lot-selector'>
                    <div className='selector-inline'>
                        {this.state.lot['details']['lot_id'] === '' ?
                            <p className='selector-text'>Select a lot to view data for</p>
                            :
                            <p className='selector-text'>{this.state.lot['details']['name']}</p>
                        }
                        <FontAwesome
                            onClick={this.openSelector}
                            name='caret-down'
                            className='lot-selector-icon'
                            size='2x'
                        />
                    </div>
                    {this.state.openSelector ?
                        <div className='lot-list'>
                            <ul>
                                {this.props.lots.map(lot => (
                                    <li onClick={() => this.setState({
                                        lot: lot,
                                        openSelector: false
                                    })}>
                                        <span className='lot-list-item'>{lot['details']['name']}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        :
                        null
                    }
                </div>

                {this.state.map ?
                    <div>
                        <h3>Ultra View</h3>
                        <UltraView lot={this.state.lot} openSelector={this.openSelector}/>
                    </div>
                    :
                    null
                }

                {this.state.charts ?
                    <div>
                        <h3>Chart View</h3>
                        <LotChartsView lot={this.state.lot}/>
                    </div>
                    :
                    null
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
                                    onClick={() => this.onSideBarClick('lot-manage')}
                                    name='table'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li>
                                <FontAwesome
                                    onClick={() => this.onSideBarClick('lot-map')}
                                    name='map'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li>
                                <FontAwesome
                                    onClick={() => this.onSideBarClick('lot-graphs')}
                                    name='line-chart'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </ul>
                    </div>
                    : null
                }

                {this.state.manage ?
                    <div>
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
                                        {this.props.lots.map(carpark => (
                                            <tr id={carpark['details']['lot_id']}>
                                                <td className="column1">
                                                    {carpark['details']['lot_id']}
                                                </td>
                                                <td className="column2">
                                                    {carpark['details']['name']}
                                                </td>
                                                <td className="column3">
                                                    {carpark['details']['lat']}
                                                </td>
                                                <td className="column4">
                                                    {carpark['details']['long']}
                                                </td>
                                                <td className="column5">
                                                    {carpark['details']['city']}
                                                </td>
                                                <td className="column6">
                                                    {carpark['details']['capacity']}
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
                                <input type="text" value={this.state.name} onChange={this.inputOnChange} name="name"
                                       placeholder="name"/>
                                <input type="text" value={this.state.city} onChange={this.inputOnChange} name="city"
                                       placeholder="city"/>
                                <input type="text" value={this.state.capacity} onChange={this.inputOnChange}
                                       name="capacity" placeholder="capacity"/>
                                <input type="text" value={this.state.latitude} onChange={this.inputOnChange}
                                       name="latitude" placeholder="latitude"/>
                                <input type="text" value={this.state.longitude} onChange={this.inputOnChange}
                                       name="longitude" placeholder="longitude"/>
                                <br/>
                                <button onClick={this.postLotData}>Save</button>
                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    null
                }

                <SweetAlert
                    show={this.state.showAlert}
                    title={this.state.alertTitle}
                    text={this.state.alertInfo}
                    showConfirmButton={false}
                    showCancelButton
                    cancelButtonText='Close'
                    animation="slide-from-top"
                    type={this.state.type}
                    onCancel={() => this.setState({ showAlert: false })}
                />

            </div>
        )
    }
}

