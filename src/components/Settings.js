import React, { Component } from 'react';
import '../App.css';
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='settings'>
                <h3 className='heading'>Settings</h3>
            </div>
        );
    }
}

export default Settings;
