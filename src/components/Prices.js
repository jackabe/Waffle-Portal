import React, { Component } from 'react';
import '../App.css';
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";
import BookingTimesGraph from "./BookingTimesGraph";

class Prices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            lot: {details: {lot_id: ''}},
            lotBookings: [],
            data: []
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event) {
        if (event.target.className !== 'lot-list-item') {
            this.setState({
                openSelector: false,
            });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    selectLot = (lot) => {
        this.setState({
            lot: lot,
            openSelector: false
        });
        this.formatBookingsById(lot['details']['lot_id']);
    };

    openSelector = () => {
        if (this.state.openSelector) {
            this.setState({
                openSelector: false
            })
        }
        else {
            this.setState({
                openSelector: true
            })
        }
    };

    formatBookingsById = (id) => {
        let bookings = this.props.bookings;
        let booking = 0;
        let xAxis = [];
        let yPriceAxis = [];
        let bookingsByHour = {};
        for (booking; booking < bookings.length; booking++) {
            if (bookings[booking]['lot_id'] === id) {
                let bookingUnix = new Date(bookings[booking]['arrival'] * 1000);
                let bookingCompare = (""+bookingUnix.getUTCDate()+'/'+bookingUnix.getUTCMonth()+'/'+bookingUnix.getUTCFullYear());
                let today = new Date();
                today = (""+today.getUTCDate()+'/'+today.getUTCMonth()+'/'+today.getUTCFullYear());
                if (today === bookingCompare) {
                    let departure = new Date(bookings[booking]['departure'] * 1000);
                    let duration = departure.getHours() - bookingUnix.getHours();
                    let bookingPrice = parseFloat(((bookings[booking]['price']) / duration).toFixed(3));
                    if (bookingsByHour[bookingUnix.getHours()]) {
                        bookingsByHour[bookingUnix.getHours()]['count'] = bookingsByHour[bookingUnix.getHours()]['count'] + 1;
                        bookingsByHour[bookingUnix.getHours()]['prices'].push(bookingPrice);
                    }
                    else {
                        bookingsByHour[bookingUnix.getHours()] = {
                            count: 1,
                            prices: [bookingPrice],
                        };
                    }
                }
            }
        }
        this.setState({data: bookingsByHour})
    };

    render() {
        return (
            <div className='prices'>
                <div className='lot-selector'>
                    <div className='selector-inline'>
                        {this.state.lot['details']['lot_id'] === '' ?
                            <p className='selector-text'>Select a lot to view data for</p>
                            :
                            <p className='selector-text'>{this.state.lot['details']['name']}</p>
                        }
                        <FontAwesome
                            onClick={this.openSelector}
                            name='caret-down'
                            className='lot-selector-icon'
                            size='2x'
                        />
                    </div>
                    {this.state.openSelector ?
                        <div className='lot-list'>
                            <ul>
                                {this.props.lots.map(lot => (
                                    <li onClick={() => this.selectLot(lot)}>
                                        <span className='lot-list-item'>{lot['details']['name']}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        :
                        null
                    }
                </div>

                <h3 className='heading'>Prices</h3>
                <BookingTimesGraph data={this.state.data}/>
            </div>
        );
    }
}

export default Prices;
