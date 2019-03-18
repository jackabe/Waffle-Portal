import React, { Component } from 'react';
import '../App.css';
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";

class Offers extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='offers'>
                <h3 className='heading'>Offers</h3>
            </div>
        );
    }
}

export default Offers;
