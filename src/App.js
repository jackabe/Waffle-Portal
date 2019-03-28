import React, { Component } from 'react';
import Geocode from "react-geocode";
import SweetAlert from 'sweetalert-react';
import fetch from 'axios';
import FontAwesome from "react-fontawesome";
import {ClipLoader} from "react-spinners";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LotHandler from "./scripts/LotHandler";
import BookingService from "./scripts/BookingService";
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
import axios from 'axios';
import {GoogleMap} from "react-google-maps";
import LotChartsView from "./components/LotChartsView";

Geocode.setApiKey("AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M");
Geocode.enableDebug();

const maxStep = 4;

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
            blur: {
                filter: 'blur(5px)'
            },
            showAlert: false,
            alertTitle: '',
            alertInfo: '',
            markers: [],
            markersStatic: [],
            loading: true,
            parkingUsers: [],
            lots: [],
            openBox: false,
            lotName: '',
            lotCapacity: '',
            lotCity: '',
            insights: true,
            step: 1
        };
        this.getLotsByLocation = this.getLotsByLocation.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.findLocation();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (event.target.className !== 'map-marker-box') {
            this.setState({
                openBox: false,
            });
        }
    }

    handleStep = () => {
        let step = this.state.step + 1;
        this.setState({
            step: step
        });
        if (step === maxStep) {
            this.setState({insights: false})
        }
    };

    handleBackStep = () => {
        let step = this.state.step - 1;
        this.setState({
            step: step
        })
    };

    openLotBox = (lot) => {
        this.setState({openBox: true});
        this.setState({lotName: lot['details']['name']});
        this.setState({lotCapacity: lot['details']['capacity']});
        this.setState({lotCity: lot['details']['city']});
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

    getLotsByLocation (lat, lng, city)  {
        this.setState({loading: true});
        let region = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        };

        this.onRegionChange(region);

        // Post to flask and get parking lot response
        fetch({
            method: 'get',
            url: 'http://18.188.105.214/getAllCarParks',
        })
            .then((response) => {
                let data = response.data;
                let i = 0;
                let markers = [];
                for (i; i < data.length; i++) {
                    let details = LotHandler.getLotDetails(data[i]);
                    let prices = LotHandler.getLotPrices(data[i]);
                    let bays = LotHandler.getBays(data[i]);
                    let capacity = details['capacity'];
                    // let spacesAndBookings = LotHandler.getSpacesAndBookings(data[i], details);
                    BookingService.getBookingsForLot(details['lot_id'])
                        .then(response => {
                            let marker = {
                                details: details,
                                price: prices['1'].toFixed(2),
                                capacity: capacity,
                                bays: LotHandler.getAvailableSpaces(bays, response),
                                coords: {
                                    latitude: details.lat,
                                    longitude: details.long
                                },
                                bookings: response,
                            };

                            markers.push(marker);

                            if (i === data.length) {
                                this.setState({markers: markers});
                                this.setState({lots: markers});
                                this.setState({loading: false});
                            }
                        }).catch(error => {
                            console.log(error.message);
                    });
                    // As not async, check all done before updating state
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

                    {this.state.insights ?
                        <div>
                            <span onClick={() => this.setState({insights: false})} className='skip'><a>Skip insights</a></span>
                            <div className='welcome-container'>
                                {this.state.step === 1 ?
                                    <section className="header-content">
                                        <h1 className="header-title animate-pop-in">waffle</h1>
                                        <h3 className="header-subtitle animate-pop-in">Parking management in one
                                            place</h3>
                                        <p onClick={this.handleStep} className="header-button animate-pop-in"><a>Begin
                                            insights</a></p>
                                    </section>
                                    :
                                    null
                                }
                                {this.state.step === 2 ?
                                    <section className="header-content">
                                        <div className='arrows'>
                                            <div>
                                            <span onClick={this.handleBackStep} className='back'>
                                                <FontAwesome
                                                    name='caret-left'
                                                    size='lg'/>
                                             </span>
                                            </div>
                                            <div>
                                                <p className='welcome-title animate-pop-in'>Today, in terms of revenue,
                                                    bookings and lot popularity</p>
                                            </div>
                                            <div>
                                            <span onClick={this.handleStep} className='next-insight'>
                                                <FontAwesome
                                                    name='caret-right'
                                                    size='lg'/>
                                             </span>
                                            </div>
                                        </div>

                                        <div className='insight-circle animate-pop-in-1'>
                                            <div>
                                                <h4>Revenue</h4>
                                                <h2>£54.54</h2>
                                            </div>
                                        </div>
                                        <div className='insight-circle animate-pop-in-2'>
                                            <div>
                                                <h4>Bookings</h4>
                                                <h2>132</h2>
                                            </div>
                                        </div>
                                        <div className='insight-circle animate-pop-in-3'>
                                            <div>
                                                <h4>Popular</h4>
                                                <h2>NCP Rapports</h2>
                                            </div>
                                        </div>

                                        <p className='welcome-date'>Data last updated
                                            at {new Date(new Date().getTime() / 1000 * 1e3).toISOString().slice(-13, -5)}</p>
                                    </section>
                                    :
                                    null
                                }
                                {this.state.step === 3 ?
                                    <section className="header-content">
                                        <div className='arrows'>
                                            <div>
                                            <span onClick={this.handleBackStep} className='back'>
                                                <FontAwesome
                                                    name='caret-left'
                                                    size='lg'/>
                                             </span>
                                            </div>
                                            <div>
                                                <p className='welcome-title animate-pop-in'>Today, in terms of revenue,
                                                    bookings and lot popularity</p>
                                            </div>
                                            <div>
                                            <span onClick={this.handleStep} className='next-insight'>
                                                <FontAwesome
                                                    name='caret-right'
                                                    size='lg'/>
                                             </span>
                                            </div>
                                        </div>

                                        <div className='insight-graph animate-pop-in-1'>
                                            <div>
                                                <LotChartsView type='revenue' chartType='line'/>
                                            </div>
                                        </div>
                                        <div className='insight-graph animate-pop-in-2'>
                                            <div>
                                                <LotChartsView type='bookings' chartType='line'/>
                                            </div>
                                        </div>
                                        <div className='insight-graph animate-pop-in-3'>
                                            <div>
                                                <LotChartsView type='popular' chartType='bar'/>
                                            </div>
                                        </div>

                                        <p className='welcome-date'>Data last updated
                                            at {new Date(new Date().getTime() / 1000 * 1e3).toISOString().slice(-13, -5)}</p>
                                    </section>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        :
                        null
                    }

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
                            <li onClick={() => this.setState({insights: true, step: 1})}>
                                <FontAwesome
                                    name='rocket'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
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
                            style={{color: 'tomato'}}
                        />
                    </div>

                    <div className='logo-container'>
                        <h3 className='logo'>waffle</h3>
                    </div>

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
  
    ParkingManagement = () => {
        return (
            <ParkingManagement lots={this.state.lots}/>
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
