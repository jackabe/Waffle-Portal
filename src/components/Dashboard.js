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
        this.getInsights();
    }


    getInsights(){

        fetch('http://18.188.105.214/getInsights', {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {

        }).catch(error => {

        })

    }


    render() {
        return (
            <div className='dashboard'>
                <h3 className='heading'>Dashboard</h3>
                <div className='container'>
                    <h4 className='heading'>The total number of vouchers redeemed today is...</h4>
                    <p></p>

                    <h4 className='heading'>The most popular store vouchers are being used at is...</h4>
                    <p></p>

                    <h4 className='heading'>The total number of bookings due today is...</h4>
                    <p></p>

                    <h4 className='heading'>The most popular car park is...</h4>
                    <p></p>
                </div>
            </div>
        );
    }
}

export default Dashboard;
