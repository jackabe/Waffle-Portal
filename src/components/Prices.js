import React, { Component } from 'react';
import '../App.css';
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";

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
            </div>
        );
    }
}

export default Prices;
