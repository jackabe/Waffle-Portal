import React, { Component } from 'react';
import '../App.css';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let data = this.props.data;
        let markers = this.props.data.markers;
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: data.latitude, lng: data.longitude }}
            >
                <Marker
                    position={{ lat: data.latitude, lng: data.longitude }}
                />
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(MapComponent));