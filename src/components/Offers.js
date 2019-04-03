import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";
import OffersService from "../scripts/OffersService";
import BookingService from "../scripts/BookingService";
import LotHandler from "../scripts/LotHandler";
import SweetAlert from "sweetalert-react";

class Offers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            partners: [],
            openForm: false,
            name: "",
            logo:"",
            offer:"",
            showNav: false,
            offersView: true,
            partnerView: false,
            showAlert: false,
            alertTitle: '',
            alertInfo: '',
            type: '',
        };
        this.openForm = this.openForm.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.getOffers();
        this.getPartners();
    }

    handleClickOutside(event) {
        if (event.target.className !== 'users-side-nav' && event.target.className === '') {
            this.setState({
                showNav: false,
            });
        }
    }

    onSideBarClick = (route) => {
        if (route === 'open-nav') {
            this.setState({
                showNav: true,
            });
        }
        else if (route === 'offers-view') {
            this.setState({
                offersView: true,
                partnerView: false,
            });
        }
        else if (route === 'partners-view') {
            this.setState({
                offersView: false,
                partnerView: true,
            });
        }
        else {
            this.setState({
                showAlert: true,
                alertTitle: 'No route yet',
                alertInfo: 'Sorry, no route has been added for ' + route + ' yet!'
            });
        }
    };

    inputOnChange(event) {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    postPartnerData = () => {
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('logo', this.state.logo);
        formData.append('offer', this.state.offer);

        // Post to flask and get parking lot response
        axios({
            method: 'post',
            url: 'http://18.188.105.214/partner/create',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then((response) => {
                this.setState({
                    showAlert: true,
                    type: 'success',
                    alertTitle: 'Partner Created!',
                    alertInfo: 'You have successfully added a new partner: ' +this.state.name
                });
            })
            .catch(function (response) {
                console.log(response);
                this.setState({
                    showAlert: true,
                    type: 'info',
                    alertTitle: 'Error',
                    alertInfo: 'There was a problem with that request'
                });
            });
    };

    openForm() {
        if (this.state.openForm) {
            this.setState({
                openForm: false,
            });
        }
        else {
            this.setState({
                openForm: true,
            });
        }
    }


    getOffers = () => {
        OffersService.getOffers()
            .then(response => {
                let data = response;
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
                    if (i === offers.length - 1){
                        this.setState({offers: offers});
                    }
            }})
            .catch((response) => {
                console.log(response)
            });
    };

    getPartners = () => {
        axios({
            method: 'get',
            url: 'http://18.188.105.214/getAllPartners'
        })
            .then((response) => {
                let data = response.data;
                let i= 0;
                let partners = [];

                for(i; i < data.length; i++){

                    let partner = {
                        logo: data[i]['logo'],
                        name: data[i]['name'],
                        offer: data[i]['offer']
                    };

                    partners.push(partner);
                    if(i === partners.length - 1){
                        this.setState({partners: partners});

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
                <div className='users-side-tab' onClick={() => this.onSideBarClick('open-nav')}>
                    <FontAwesome
                        name='arrow-left'
                        className='tab-center'
                        size='2x'
                    />
                </div>

                {this.state.showNav ?
                    <div className='users-side-nav'>
                        <ul>
                            <li>
                                <FontAwesome
                                    onClick={() => this.onSideBarClick('offers-view')}
                                    name='money'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                            <li>
                                <FontAwesome
                                    onClick={() => this.onSideBarClick('partners-view')}
                                    name='briefcase'
                                    size='2x'
                                    className='nav-image'/>
                            </li>
                        </ul>
                    </div>
                    : null
                }

                {this.state.offersView ?
                    <div>
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
                    :
                    null
                }

                {this.state.partnerView ?
                        <div className='partners'>
                            <h3 className='heading'>Partners</h3>
                            <div className="container-table100">
                                <div className="wrap-table100">
                                    <div className="table100">
                                        <table>
                                            <thead>
                                            <tr className="offer-table-header">
                                                <th className="column1">Partner Name</th>
                                                <th className="column2">Offer provided</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.partners.map(partner => (
                                                <tr id={partner['name']}>
                                                    <td className="column1">
                                                        {partner['name']}
                                                    </td>
                                                    <td className="column2">
                                                        {partner['offer']}
                                                    </td>


                                                </tr>

                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                        <FontAwesome
                            name='plus-circle'
                            onClick={this.openForm}
                            className='add-button'
                            size='3x'
                        />
                        {this.state.openForm ?
                            <div className='lot-form'>
                                <h3>Add a new partner</h3>
                                <input type="text" value={this.state.name} onChange={this.inputOnChange} name="name"
                                       placeholder="Name"/>
                                <input type="text" value={this.state.logo} onChange={this.inputOnChange} name="logo"
                                       placeholder="Logo"/>
                                <input type="text" value={this.state.offer} onChange={this.inputOnChange}
                                       name="offer" placeholder="Offer"/>

                                <br/>
                                <button onClick={this.postPartnerData}>Save</button>
                            </div>
                            :
                            null
                        }
                        </div>
                    :
                    null
                }
                <SweetAlert
                    show={this.state.showAlert}
                    title={this.state.alertTitle}
                    text={this.state.alertInfo}
                    showConfirmButton={false}
                    showCancelButton
                    cancelButtonText='Close'
                    animation="slide-from-top"
                    type={this.state.type}
                    onCancel={() => this.setState({ showAlert: false })}
                />

    </div>

        );
    }
}

export default Offers;
