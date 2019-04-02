import React, { Component } from 'react';
import '../App.css';
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";
import BookingTimesGraph from "./BookingTimesGraph";

class Prices extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='prices'>
                <h3 className='heading'>Prices</h3>
                <BookingTimesGraph/>
            </div>
        );
    }
}

export default Prices;
