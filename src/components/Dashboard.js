import React, { Component } from 'react';
import '../App.css';
// import { ClipLoader } from 'react-spinners';
// import FontAwesome from "react-fontawesome";
import axios from "axios";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dailyVouchers: '',
            totalVouchers: '',
            dailyBookings: '',
        };
    }

    componentDidMount() {
        this.getInsights();
        this.getBookingInsights();
    }


    getInsights = () => {
        axios({
            method: 'get',
            url: 'http://18.188.105.214/getAllOffers'
        })
            .then((response) => {
                let data = response.data;
                this.processOfferInsights(data)
            })
            .catch((response) => {
                console.log(response)
            });
    }

    getBookingInsights = () => {
        // Update methods POST, GET in flask
        axios({
            method: 'get',
            url: 'http://18.188.105.214/getBookings'
        })
            .then((response) => {
                let data = response.data;
                this.processBookingInsights(data);
            })
            .catch((response) => {
                console.log(response)
            });
    }

    processBookingInsights(bookingList){
        let dailyBooking = 0;
        // Booking dates stored as UNIX Timestamp so converting current date into correct format to compare.
        let date = new Date();
        let dd = date.getUTCDate();
        // This is 0-11 but it doesn't matter as we are converting the booking date the same way
        let mm = date.getUTCMonth();
        let yyyy = date.getUTCFullYear();
        let dateCompare = ("" + dd + mm + yyyy);

        let i =0;
        for(i; i < bookingList.length; i++){
            let bookingDate = bookingList[i]['arrival'];

            let bookingUnix = new Date(bookingDate * 1000);
            // Converting timestamp to date
            let bookingDD = bookingUnix.getUTCDate();
            let bookingMM = bookingUnix.getUTCMonth();
            let bookingYYYY = bookingUnix.getUTCFullYear();

            let bookingCompare = ("" + bookingDD + bookingMM + bookingYYYY);
            if(dateCompare == bookingCompare){
                dailyBooking +=1;
            }
        }

        this.setState({dailyBookings: dailyBooking});

    }

    processOfferInsights(offerList){
        let totalVouchers = 0;
        let dailyVouchers = 0;
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd;
        }

        if(mm<10) {
            mm = '0'+mm;
        }

        let string_today = dd + '-' + mm + '-' + yyyy;

        let i = 0;
        for (i; i < offerList.length; i++){
            let offer = {
                logo: offerList[i]['logo'],
                company: offerList[i]['store'],
                offer: offerList[i]['offer'],
                expiry: offerList[i]['expiry_date'],
                offerId: offerList[i]['offer_id'],
                redemptionDate: offerList[i]['redemption_date'],
                scans: offerList[i]['scans'],
                redeem: offerList[i]['redeem'],
            };

            if ( offer.redemptionDate == string_today && offer.redeem === true){
                dailyVouchers += 1;
                totalVouchers += 1;
            }else if (offer.redeem === true){
                totalVouchers += 1;
            }

            this.setState({dailyVouchers: dailyVouchers});
            this.setState({totalVouchers: totalVouchers});
        }
    }

    render() {
        return (
            <div className='dashboard'>
                <h2 className='heading'>Welcome..</h2>
                <h2 className='heading'>The daily insights for today are:</h2>
                <div className='container'>
                    <div className='Row'>

                        <div className='insight-circle'>
                            <h1 className='invisible-text'>.</h1>
                            <h4>Number of offers redeemed:</h4>
                            <h2>{this.state.dailyVouchers}</h2>
                        </div>

                        {/*<div className='insight-circle'>*/}
                            {/*<h1 className='invisible-text'>.</h1>*/}
                            {/*<h4>Total number of offers redeemed:</h4>*/}
                            {/*<h1>{this.state.totalVouchers}</h1>*/}
                        {/*</div>*/}

                        <div className='insight-circle'>
                            <h1 className='invisible-text'>.</h1>
                            <h4>Money made from surge pricing:</h4>
                            <h2>{this.state.dailyBookings}</h2>
                        </div>

                        <div className='insight-circle'>
                            <h1 className='invisible-text'>.</h1>
                            <h4>Number of bookings due:</h4>
                            <h2>£14.00</h2>
                        </div>

                        <div className='insight-circle'>
                            <h1 className='invisible-text'>.</h1>
                            <h4>Most popular car park:</h4>
                            <h2>NCP Rapports</h2>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default Dashboard;
