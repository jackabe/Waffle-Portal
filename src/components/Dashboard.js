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
        };
    }

    componentDidMount() {
        this.getInsights();
        this.getBookingInsights();
    }


    getInsights = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1/getAllOffers'
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
            url: 'http://127.0.0.1/getBookings'
        })
            .then((response) => {
                let data = response.data;
                this.getBookingInsights(data);
            })
            .catch((response) => {
                console.log(response)
            });
    }

    processBookingInsights(bookingList){

    }

    processOfferInsights(offerList){
        console.log("offers: " + offerList);

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
                <h3 className='heading'>Dashboard</h3>
                <div className='container'>
                    <div className='Row'>

                        <div className='insight-circle'>
                            <h1 className='invisible-text'>.</h1>
                            <h4>Number of offers redeemed today:</h4>
                            <h1>{this.state.dailyVouchers}</h1>
                        </div>

                        <div className='insight-circle'>
                            <h1 className='invisible-text'>.</h1>
                            <h4>Total number of offers redeemed:</h4>
                            <h1>{this.state.totalVouchers}</h1>
                        </div>


                    </div>
                </div>


            </div>
        );
    }
}

export default Dashboard;
