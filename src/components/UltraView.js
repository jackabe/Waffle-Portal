import React, { Component } from 'react';
import '../App.css';
import FontAwesome from "react-fontawesome";

export default class UltraView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBooking: false,
            reg: '',
            arrival: '',
            departure: '',
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);

    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (event.target.className !== 'booking-info') {
            this.setState({
                showBooking: false,
            });
        }
    }

    viewBooking = (booking) => {
        console.log(booking)
        this.setState({showBooking: true});
        this.setState({reg: booking['reg']});
        this.setState({arrival: booking['arrival']});
        this.setState({departure: booking['departure']});
    };

    render() {
        const lot = this.props.lot;
        return (
            <div className='ultra-view-layout'>
                {lot['details']['lot_id'] === '' ?
                    <div>
                        <div className='no-selection'>
                            <h3>Please select a parking lot</h3>
                            <FontAwesome
                                onClick={this.props.openSelector}
                                name='arrow-right'
                                className='no-selection-icon'
                                size='2x'
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <div className='lot-info'>
                            <span>Name: {lot['details']['name']}</span>
                            <span>Capacity: {lot['details']['capacity']}</span>
                        </div>
                        <div className='spaces'>
                            {lot['bays'].map(space => (
                                <div>
                                    {space['booked']?
                                        <div onClick={() => this.viewBooking(space['booked'])}>
                                            {space['booked']['active'] ?
                                                <div className='space-filled-active'>
                                                    <span>{space['bay_id']}</span>
                                                </div>
                                                :
                                                <div className='space-filled'>
                                                    <span>{space['bay_id']}</span>
                                                </div>
                                            }
                                        </div>
                                    :
                                        <div className='space'>
                                            <span>{space['bay_id']}</span>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {this.state.showBooking ?
                    <div className='booking-info'>
                        <h3>Booking information</h3>
                        <p>Registration plate: {this.state.reg}</p>
                        {/* https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript */}
                        <p>Arrival: {new Date(this.state.arrival * 1e3).toISOString().slice(-13, -5)}</p>
                        <p>Departure: {new Date(this.state.departure * 1e3).toISOString().slice(-13, -5)}</p>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}
