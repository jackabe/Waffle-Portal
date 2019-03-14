import React, { Component } from 'react';
import './App.css';
import MapComponent from "./components/Map";
import LotHandler from "./components/LotHandler";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Geocode from "react-geocode";
import axios from 'axios';
import FontAwesome from "react-fontawesome";
import UserFilter from "./components/UserFilter";

Geocode.setApiKey("AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M");

Geocode.enableDebug();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 51.482171,
                longitude: -3.171731,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            },
            showAlert: false,
            alertTitle: '',
            alertInfo: '',
            markers: []
        };

        this.getLotsByLocation = this.getLotsByLocation.bind(this);
    }

    componentDidMount() {
        this.findLocation();
    }

    getLotsByLocation (lat, lng, city)  {
        let region = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        };

        this.onRegionChange(region);

        let formData = new FormData();
        formData.append('city', city);
        formData.append('latitude', lat);
        formData.append('longitude', lng);

        // Post to flask and get parking lot response
        axios({
            method: 'post',
            url: 'http://18.188.105.214/getCarParks',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then((response) => {
                let data = response.data;
                let i = 0;
                let markers = [];
                for (i; i < data.length; i++) {
                    let details = LotHandler.getLotDetails(data[i]);
                    let prices = LotHandler.getLotPrices(data[i]);
                    let spaces = LotHandler.getLotSpaces(data[i], details);

                    let marker = {
                        details: details,
                        price: prices['1'].toFixed(2),
                        spaces: spaces,
                        coords: {
                            latitude: details.lat,
                            longitude: details.long
                        }
                    };

                    markers.push(marker);

                    // As not async, check all done before updating state
                    if (i === data.length - 1) {
                        this.setState({markers: markers});
                        this.setState({loading: false});
                    }
                }
                if (markers.length === 0) {
                    this.setState({loading: false});
                    this.setState({
                        showAlert: true,
                        alertTitle: 'No Parking Lots',
                        alertInfo: 'Sorry, but we currently do not support this area! Check our website to see when we are coming to you!'
                    });
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    findLocation = () => {
        // Get latidude & longitude from address.
        Geocode.fromAddress("CF244AL").then(
            response => {
                const city = response.results[0]['address_components'][2]
                const { lat, lng } = response.results[0].geometry.location;
                this.getLotsByLocation(lat, lng, city['long_name'])
            },
            error => {
                console.error(error);
            }
        );
    };

    loadUserLocations = () => {
        axios({
            method: 'get',
            url: 'http://18.188.105.214/getUserLocations',
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then((response) => {
                let data = response.data;
                let i = 0;
                let markers = [];
                for (i; i < data.length; i++) {
                    let marker = {
                        details: {
                            lot_id : i
                        },
                        coords: {
                            latitude: data[i]['latitude'],
                            longitude: data[i]['longitude']
                        }
                    };

                    markers.push(marker);

                    // As not async, check all done before updating state
                    if (i === data.length - 1) {
                        this.setState({markers: markers});
                        this.setState({loading: false});
                    }
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    onSideBarClick = (route) => {
        if (route === 'home') {
            window.open('/', '_self');
        }
        else if (route === 'users') {
            this.loadUserLocations();
        }
        else {
            this.setState({
                showAlert: true,
                alertTitle: 'No route yet',
                alertInfo: 'Sorry, no route has been added for '+route+' yet!'
            });
        }
    };

    onRegionChange = (region) => {
        this.setState({ region });
    };

    render() {

      return (
        <div className='app'>
            <div>
                <SweetAlert
                    show={this.state.showAlert}
                    title={this.state.alertTitle}
                    text={this.state.alertInfo}
                    showConfirmButton={false}
                    showCancelButton
                    cancelButtonText='Close'
                    animation="slide-from-top"
                    type="info"
                    onCancel={() => this.setState({ showAlert: false })}
                />
            </div>

            <MapComponent
                data={this.state.region}
                markers={this.state.markers}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div className='map'/>}
                containerElement={<div className='map'/>}
                mapElement={<div className='map'/>}
            />

            <div className="side-bar-container">
                <h3 className='nav-logo'>waffle</h3>
                <ul>
                    <li onClick={() => this.onSideBarClick('home')}><FontAwesome
                        name='home'
                        size='2x'
                        style={{ color: '#ffffff' }}
                    /></li>

                    <li onClick={() => this.onSideBarClick('dashboard')}><FontAwesome
                        name='rocket'
                        size='2x'
                        style={{ color: '#ffffff' }}
                    /></li>

                    <li onClick={() => this.onSideBarClick('lots')}><FontAwesome
                        name='car'
                        size='2x'
                        style={{ color: '#ffffff' }}
                    /></li>

                    <li onClick={() => this.onSideBarClick('users')}><FontAwesome
                        name='users'
                        size='2x'
                        style={{ color: '#ffffff' }}
                    /></li>

                    <li onClick={() => this.onSideBarClick('user')}><FontAwesome
                        name='user'
                        size='2x'
                        style={{ color: '#ffffff' }}
                    /></li>

                    <li onClick={() => this.onSideBarClick('settings')}><FontAwesome
                        name='cog'
                        size='2x'
                        style={{ color: '#ffffff' }}
                    /></li>
                </ul>

                <FontAwesome
                    onClick={() => this.onSideBarClick('logout')}
                    name='sign-out'
                    className='logout'
                    size='2x'
                    style={{ color: '#ffffff' }}
                />

            </div>

            <UserFilter/>

            <div className='logo-container'>
                <h3 className='logo'>waffle</h3>
            </div>
        </div>
    );
  }
}

export default App;
