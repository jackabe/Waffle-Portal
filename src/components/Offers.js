import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";

class Offers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],

        };
    }

    componentDidMount() {
        this.getOffers();
    }


    getOffers = () => {
        axios({
            method: 'get',
            url: 'http://18.188.105.214/getAllOffers'
        })
            .then((response) => {
                let data = response.data;
                let i= 0;
                let offers = [];

                for(i; i < data.length; i++){
                    let offer = {
                        logo: data[i]['logo'],
                        company: data[i]['store'],
                        offer: data[i]['offer'],
                        expiry: data[i]['expiry_date'],
                        offerId: data[i]['offer_id'],
                        redemptionDate: data[i]['redemption_date'],
                        scans: data[i]['scans'],
                        redeem: data[i]['redeem'],
                    };
                    offers.push(offer);
                    if(i === offers.length - 1){
                        this.setState({offers: offers});

                    }
                }

            })
            .catch((response) => {
                console.log(response)
            });
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
