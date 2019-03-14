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
        let markers = this.props.markers;
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: data.latitude, lng: data.longitude }}
            >
                {markers.map(marker => (
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
