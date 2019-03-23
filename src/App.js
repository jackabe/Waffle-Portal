import React, { Component } from 'react';
import Geocode from "react-geocode";
import SweetAlert from 'sweetalert-react';
import fetch from 'axios';
import FontAwesome from "react-fontawesome";
import {ClipLoader} from "react-spinners";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LotHandler from "./scripts/LotHandler";
import MapComponent from "./components/Map";
import Dashboard from "./components/Dashboard";
import Offers from "./components/Offers";
import Geofences from "./components/Geofences";
import Settings from "./components/Settings";
import Prices from "./components/Prices";
import ParkingManagement from "./components/ParkingManagement";
import Users from "./components/Users";
import 'sweetalert/dist/sweetalert.css';
import './App.css';

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
            markers: [],
            markersStatic: [],
            loading: true,
            parkingUsers: [],
        };
        this.getLotsByLocation = this.getLotsByLocation.bind(this);
    }

    componentDidMount() {
        this.findLocation();
    }

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

    getLotsByLocation (lat, lng, city)  {
        this.setState({loading: true});
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
        fetch({
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

                    console.log(marker)

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
                this.setState({loading: false});
                console.log(response);
            });
    };

    onRegionChange = (region) => {
        this.setState({ region });
    };

    filterUsers = (locations) => {
        this.setState({markers: locations});
    };

    lastLocations = (locations) => {
        this.setState({parkingUsers: locations});
    };

    render() {

      return (
          <Router>
            <div className='app'>

                {this.state.loading ?
                    <div className='sweet-loading'>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={50}
                            color={'#ffffff'}
                            loading={this.state.loading}
                        />
                    </div>
                    : null
                }

                <div className="side-bar-container">
                    <h3 className='nav-logo'>waffle</h3>
                    <ul>
                        <Link to="/">
                            <li>
                                <FontAwesome
                                    name='home'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </Link>
                        <Link to="/dashboard">
                            <li>
                                <FontAwesome
                                    name='rocket'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </Link>
                        <Link to="/geofences">
                            <li>
                                <FontAwesome
                                    name='street-view'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </Link>
                        <Link to="/parking">
                            <li>
                                <FontAwesome
                                    name='car'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </Link>
                        <Link to="/users">
                            <li>
                                <FontAwesome
                                    name='users'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </Link>
                        <Link to="/offers">
                            <li>
                                <FontAwesome
                                    name='money'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </Link>
                        <Link to="/prices">
                            <li>
                                <FontAwesome
                                    name='dollar'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </Link>
                        <Link to="/settings">
                            <li>
                                <FontAwesome
                                    name='cog'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </Link>
                    </ul>

                    <FontAwesome
                        onClick={() => this.onSideBarClick('logout')}
                        name='sign-out'
                        className='logout'
                        size='2x'
                        style={{ color: 'tomato' }}
                    />
                </div>

                <div className='logo-container'>
                    <h3 className='logo'>waffle</h3>
                </div>

                <Route exact path="/" component={this.Map}/>
                <Route exact path="/dashboard" component={this.Dashboard}/>
                <Route exact path="/geofences" component={this.Geofences}/>
                <Route exact path="/parking" component={this.ParkingManagement}/>
                <Route exact path="/users" component={this.Users}/>
                <Route exact path="/offers" component={this.Offers}/>
                <Route exact path="/prices" component={this.Prices}/>
                <Route exact path="/settings" component={this.Settings}/>
            </div>
          </Router>
    );
  }

    Map = () => {
        return (
            <MapComponent
                data={this.state.region}
                markers={this.state.markers}
                fences={[]}
                cluser={false}
                parkingUsers={this.state.parkingUsers}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div className='map'/>}
                containerElement={<div className='map'/>}
                mapElement={<div className='map'/>}
            />
        )
    };

    Dashboard = () => {
        return (
            <Dashboard/>
        )
    };

    ParkingManagement = () => {
        return (
            <ParkingManagement/>
        )
    };

    Users = () => {
        return (
            <Users data={this.state.markersStatic} userCallback={this.filterUsers}/>
        )
    };

    Offers = () => {
        return (
            <Offers/>
        )
    };

    Prices = () => {
        return (
            <Prices/>
        )
    };

    Geofences = () => {
        return (
            <Geofences/>
        )
    };

    Info = () => {
        return (
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
        )
    };

    Settings = () => {
        return (
            <Settings/>
        )
    };

}

export default App;
