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
        let markersToShow = [];
        let markers = this.props.markers;
        let parkers = this.props.parkingUsers;

        if (parkers.length !== 0) {
            markersToShow = parkers;
        }
        else {
            markersToShow = markers
        }
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: data.latitude, lng: data.longitude }}
            >
                {markersToShow.map(marker => (
                    <Marker
                        key={marker.details.lot_id}
                        position={{ lat: marker.coords.latitude, lng: marker.coords.longitude }}
                    />
                ))}
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(MapComponent));
