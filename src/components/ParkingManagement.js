import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import LotHandler from "../scripts/LotHandler";
import FontAwesome from "react-fontawesome";


export default class ParkingManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lotId: '',
            lotName: '',
            city: null,
            name: "",
            lot_id: "",
            capacity: "",
            map: false,
            charts: false,
            manage: true,
            latitude: "",
            longitude: "",
            showNav: false,
            openSelector: false
        };
        this.inputOnChange = this.inputOnChange.bind(this);
        this.postLotData = this.postLotData.bind(this);
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
                alertInfo: 'Sorry, no route has been added for '+route+' yet!'
            });
        }
    };

    render() {
        return (
            <div className='parking-management'>
                <div className='lot-selector'>
                    <div className='selector-inline'>
                        {this.state.lotId === '' ?
                            <p className='selector-text'>Select a lot to view data for</p>
                            :
                            <p className='selector-text'>{this.state.lotName}</p>
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
                                        lotId: lot['details']['lot_id'],
                                        lotName: lot['details']['name'],
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
                {this.state.manage ?
                    <div className='lot-form'>
                        <h3>Add a new parking lot</h3>
                        <input type="text" value={this.state.lot_id} onChange={this.inputOnChange} name="lot_id" placeholder="id"/> <br />
                        <input type="text" value={this.state.name} onChange={this.inputOnChange} name="name" placeholder="name"/> <br />
                        <input type="text" value={this.state.city} onChange={this.inputOnChange} name="city" placeholder="city"/> <br />
                        <input type="text" value={this.state.capacity} onChange={this.inputOnChange} name="capacity" placeholder="capacity"/>                           <br />
                        <input type="text" value={this.state.latitude} onChange={this.inputOnChange} name="latitude" placeholder="latitude"/>                           <br />
                        <input type="text" value={this.state.longitude} onChange={this.inputOnChange} name="longitude" placeholder="longitude"/>                         <br />
                        <button onClick={this.postLotData}>Post</button>
                    </div>
                    :
                    null
                }

                {this.state.map ?
                    <div>
                        <h3>Ultra View</h3>
                    </div>
                    :
                    null
                }

                {this.state.charts ?
                    <div>
                        <h3>Chart View</h3>
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
            </div>
        );
    }
}