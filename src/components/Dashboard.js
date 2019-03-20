import React, { Component } from 'react';
import '../App.css';
// import { ClipLoader } from 'react-spinners';
// import FontAwesome from "react-fontawesome";

class Dashboard extends Component {
    // Initial Commit for CI
    constructor(props) {
        super(props);
        this.state = {
            dailyVouchers: '',
            mcDaily: '',
            mcTotal: '',
            bkDaily: '',
            bkTotal: '',
            subDaily: '',
            subTotal: '',
        };
    }

    componentDidMount() {
        this.getInsights();
    }


    getInsights(){

        fetch('http://127.0.0.1/getAllOffers', {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data',
            },

        }).then(response => {
            console.log(response.json())

            let data = response.json();
            this.processOfferInsights(data)

        }).catch(error => {
            console.log(error);
            const { code, message } = error;
        })
    }

    processOfferInsights(offerList){
        console.log("offers: " + offerList);

        let dailyRedemptions = 0
        let mcDaily = 0;
        let bkDaily = 0;
        let subDaily = 0;
        let mcTotal = 0;
        let bkTotal = 0;
        let subTotal = 0;

        let today = new Date().getDate();

        let i = 0;
        for (i; i < offerList.length; i++){
            let offer = {
                logo: offerList[i]['logo'],
                company: offerList[i]['store'],
                offer: offerList[i]['offer'],
                expiry: offerList[i]['expiry_date'],
                offerId: offerList[i]['offer_id'],
                redemptionDate: offerList[i]['redemption_date'],
                scans: offerList[i]['scans']
            };

            // Converting String to date.
            let parts = offer.redemptionDate.split("-");
            let date = new Date(parts[0], parts[1] - 1, parts[2]);

            if (offer.company === "McDonalds"){
                mcTotal += 1;
                if(date = today){
                    dailyRedemptions += 1
                    mcDaily += 1
                }
            }else if(offer.company === "Subway"){
                subTotal += 1;
                if(date = today){
                    dailyRedemptions += 1
                    subDaily += 1
                }
            }else{
                bkTotal += 1;
                if(date = today){
                    dailyRedemptions += 1
                    bkDaily += 1
                }
            }

            // this.setState({dailyVouchers: dailyRedemptions});
            // this.setState({mcDaily: mcDaily});
            // this.setState({bkDaily: bkDaily});
            // this.setState({subDaily: subDaily});
            // this.setState({mcTotal: mcTotal});
            // this.setState({bkTotal: bkTotal});
            // this.setState({subTotal: subTotal});
        }
    }

    render() {
        return (
            <div className='dashboard'>
                <h3 className='heading'>Dashboard</h3>
                <div className='container'>
                    <h4 className='heading'>The total number of vouchers redeemed today is...</h4>
                    <p>{this.state.dailyVouchers}</p>

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
