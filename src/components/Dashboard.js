import React, { Component } from 'react';
import '../App.css';
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";

class Dashboard extends Component {
    // Initial Commit for CI
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='dashboard'>
                <h3 className='heading'>Dashboard</h3>
                <div className='container'>
                    
                </div>
            </div>
        );
    }
}

export default Dashboard;
