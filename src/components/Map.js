import React, { Component } from 'react';
import '../App.css';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Circle
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
        let fences = this.props.fences;
        let showFences = false;

        if (parkers.length !== 0) {
            markersToShow = parkers;
        }
        else if (fences.length !== 0) {
            markersToShow = fences;
            showFences = true;
        }
        else {
            markersToShow = markers
        }
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: data.latitude, lng: data.longitude }}
            >
                {showFences ?  <div>
                        {markersToShow.map(fence => (
                            <Circle
                                radius={Number(fence['radius'])}
                                options={{strokeColor: '#ff6347', fillColor: '#ff6347' }}
                                key={fence['id']}
                                center={{ lat: Number(fence['latitude']), lng: Number(fence['longitude']) }}
                            />
                        ))}
                    </div>
                    :
                    <div>
                        {markersToShow.map(marker => (
                            <Marker
                                key={marker.details.lot_id}
                                position={{ lat: marker.coords.latitude, lng: marker.coords.longitude }}
                            />
                        ))}
                    </div>
                }
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(MapComponent));
