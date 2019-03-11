import React, { Component } from 'react';
import './App.css';
import SideBar from "./components/SideBar";
import MapComponent from "./components/Map";
import LotHandler from "./components/LotHandler";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Geocode from "react-geocode";

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
            alertInfo: ''
        };
    }

    componentDidMount() {
        this.findLocation();
    }

    getLotsByLocation = (lat, lng, city) => {
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
        fetch('http://18.188.105.214/getCarParks', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            mode: 'cors',
            body: formData
        }).then(response => {
            let markers = [];
            console.log(response)
            let data = JSON.parse(response['_bodyText']);
        }).catch(error => {
            const { code, message } = error;
            console.log(message);
        });

    };

    findLocation = () => {
        // Get latidude & longitude from address.
        Geocode.fromAddress("CF244AL").then(
            response => {
                const city = response.results[0]['address_components'][2]
                const { lat, lng } = response.results[0].geometry.location;
                this.getLotsByLocation(lat, lng, city)
            },
            error => {
                console.error(error);
            }
        );
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
                    onCancel={() => this.setState({ showError: false })}
                />
            </div>

            <MapComponent
                data={this.state.region}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div className='map'/>}
                containerElement={<div className='map'/>}
                mapElement={<div className='map'/>}
            />
            <SideBar/>
            <div className='logo-container'>
                <h3 className='logo'>waffle</h3>
            </div>
        </div>
    );
  }
}

export default App;
