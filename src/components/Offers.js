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
                        details: data[i]['offer'],
                        expiry: data[i]['expiry_date'],
                        offerId: data[i]['offer_id'],
                        redemptionDate: data[i]['redemption_date'],
                        scans: data[i]['scans'],
                        redeem: data[i]['redeem'],
                        userId: data[i]['user_id']
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

                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <table>
                                <thead>
                                <tr className="offer-table-header">
                                    <th className="column1">ID</th>
                                    <th className="column2">Details</th>
                                    <th className="column3">User ID</th>
                                    <th className="column4">Store</th>
                                    <th className="column5">Expiry Date</th>
                                    <th className="column6">Redemption Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.offers.map(offer => (
                                    <tr id={offer['offerId']}>
                                        <td className="column1">
                                            {offer['offerId']}
                                        </td>
                                        <td className="column2">
                                            {offer['details']}
                                        </td>
                                        <td className="column3">
                                            {offer['userId']}
                                        </td>
                                        <td className="column4">
                                            {offer['company']}
                                        </td>
                                        <td className="column5">
                                            {offer['expiry']}
                                        </td>

                                        {(offer['redemptionDate']) != "" ?
                                            <td className="column6">
                                                {offer['redemptionDate']}
                                            </td>
                                            :
                                            <td className="column6">
                                                This offer has yet to be redeemed
                                            </td>
                                        }

                                    </tr>

                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Offers;
