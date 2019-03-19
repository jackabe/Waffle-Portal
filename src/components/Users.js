import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";
import PropTypes from 'prop-types';
import MapComponent from "./Map";
import {Link} from "react-router-dom";

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            noUsers: false,
            loading: true,
            showUsers: [],
            value: true,
            showNav: false,
            userFilter: false,
            region: {
                latitude: 51.482171,
                longitude: -3.171731,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            },
            markers: [
                {
                    coords: {latitude: 51.4756882, longitude: -3.1788092},
                    details: {lot_id: 39},
                    show: true,
                    userId: "KUfa5sxh9efBABZmCZybDUlU5s42"
                 },
                {
                    coords: {latitude: 51.4997257, longitude: -3.1787463},
                    details: {lot_id: 377},
                    show: true,
                    userId: "iSpLh7cFf0W8qCxd48eL4Gk0zAr2"
                },
                {
                    coords: {latitude: 51.4880452, longitude: -3.1734272},
                    details: {lot_id: 205},
                    show: true,
                    userId: "Z67YnrL30DOOxlzYFhcqXWAbmJm2"
                },
            ],
            markersStatic: [
                {
                    coords: {latitude: 51.4756882, longitude: -3.1788092},
                    details: {lot_id: 39},
                    show: true,
                    userId: "KUfa5sxh9efBABZmCZybDUlU5s42"
                },
                {
                    coords: {latitude: 51.4997257, longitude: -3.1787463},
                    details: {lot_id: 377},
                    show: true,
                    userId: "iSpLh7cFf0W8qCxd48eL4Gk0zAr2"
                },
                {
                    coords: {latitude: 51.4880452, longitude: -3.1734272},
                    details: {lot_id: 205},
                    show: true,
                    userId: "Z67YnrL30DOOxlzYFhcqXWAbmJm2"
                },
            ],
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.loadUsers();
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

    loadUsers = () => {
        let formData = new FormData();
        formData.append('table', 'user_details');
        axios({
            method: 'post',
            data: formData,
            url: 'http://18.188.105.214/collections',
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
            let data = response.data;
            let i = 0;
            let users = [];
            for (i; i < data.length; i++) {
                let user = {

                };
                users.push(user);
                // As not async, check all done before updating state
                if (i === data.length - 1) {
                    this.setState({users: users});
                    this.setState({loading: false});
                }
            }
            if (users.length === 0) {
                this.setState({loading: false});
                this.setState({
                    noUsers: true
                });
            }
        })
        .catch((response) => {
            console.log(response);
            // Set first to show
            let users = [
                {
                    id: 'Z67YnrL30DOOxlzYFhcqXWAbmJm2',
                    firstName: 'Jack',
                    lastName: 'Allcock',
                    show: true
                },
                {
                    id: 'iSpLh7cFf0W8qCxd48eL4Gk0zAr2',
                    firstName: 'Morgan',
                    lastName: 'Jones',
                    show: true
                },
                {
                    id: 'KUfa5sxh9efBABZmCZybDUlU5s42',
                    firstName: 'Subash',
                    lastName: 'Poudyal',
                    show: true
                }
            ];
            this.setState({users: users});
            this.setState({loading: false});
        });
    };

    handleUserChange(event) {
        const markers = this.state.markersStatic;
        const target = event.target;
        const clickToShow = target.type === 'checkbox' ? target.checked : target.value;
        const userId = target.name;
        const users = this.state.users;
        let showUsers = [];

        // Change all users to show if clicked to show and vice versa
        let i = 0;
        for (i; i < users.length; i++) {
            if (users[i].id === userId) {
                users[i]['show'] = clickToShow;
            }
        }
        // Update checkbox's
        this.setState({
            [userId]: clickToShow,
            users: users,
        });
        // Change all locations by user id if checked or not
        i = 0;
        for (i; i < markers.length; i++) {
            if (markers[i].userId === userId) {
                markers[i]['show'] = clickToShow;
            }
        }
        // Only send a list of checked markers back to map
        i = 0;
        for (i; i < markers.length; i++) {
            if (markers[i]['show']) {
                showUsers.push(markers[i])
            }
        }

        this.setState({
            markers: showUsers,
        });
    }

    getLastLocationsForUsers = () => {
        let locations = this.props.data;
        let groups = {};
        for (let i = 0; i < locations.length; i++) {
            let userId = locations[i].userId;
            if (!groups[userId]) {
                groups[userId] = [];
            }
            groups[userId].push(locations[i]);
        }
        locations = [];
        for (let groupName in groups) {
            locations.push(groups[groupName][groups[groupName].length - 1]);
        }

        // callback to app.js
        this.props.userCallback(locations)
    };

    onSideBarClick = (route) => {
        if (route === 'open-nav') {
            this.setState({
                showNav: true,
            });
        }
        else if (route === 'user-filter') {
            if (this.state.userFilter) {
                this.setState({
                    userFilter: false,
                });
            }
            else if (route === 'close') {
                this.setState({
                    userFilter: false,
                });
            }
            else {
                this.setState({
                    userFilter: true,
                });
            }
        }
        else {
            this.setState({
                userFilter: false,
                showAlert: true,
                alertTitle: 'No route yet',
                alertInfo: 'Sorry, no route has been added for '+route+' yet!'
            });
        }
    };

    render() {
        return (
            <div>

                <MapComponent
                    data={this.state.region}
                    parkingUsers={[]}
                    markers={this.state.markers}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div className='map'/>}
                    containerElement={<div className='map'/>}
                    mapElement={<div className='map'/>}
                />

                <div className='users-side-tab'>
                    <FontAwesome
                        onClick={() => this.onSideBarClick('open-nav')}
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
                                    onClick={() => this.onSideBarClick('user-filter')}
                                    name='filter'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li onClick={() => this.onSideBarClick('user-locations')}>
                                <FontAwesome
                                    name='location-arrow'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li onClick={() => this.onSideBarClick('user-locations-circles')}>
                                <FontAwesome
                                    name='circle'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li onClick={() => this.onSideBarClick('user-locations-parkers')}>
                                <FontAwesome
                                    name='car'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li onClick={() => this.onSideBarClick('user-locations-offers')}>
                                <FontAwesome
                                    name='qrcode'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </ul>
                    </div>
                    : null
                }

                {this.state.userFilter ?
                    <div className="user-filter-container">
                        <span className='close'><FontAwesome
                            onClick={() => this.onSideBarClick('close')}
                            name='eye-slash'
                            size='1x'
                            className='nav-image'/></span>
                        <h3>Filter by User</h3>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={50}
                            color={'#ffffff'}
                            loading={this.state.loading}
                        />
                        <div className="user-list">
                            {this.state.users.map(user => (
                                <div className='user' key={user.id}>
                                    <label className='user-label'>
                                        {user.id + ' (' + user.firstName + ' ' + user.lastName +')'}
                                        <input
                                            type="checkbox" name={user.id} checked={user['show']} onChange={this.handleUserChange}/>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default Users;

Users.propTypes = {
    children: PropTypes.element.isRequired,
};