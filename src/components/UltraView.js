import React, { Component } from 'react';
import '../App.css';
import FontAwesome from "react-fontawesome";
import io from 'socket.io-client';

export default class UltraView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBooking: false,
            reg: '',
            arrival: '',
            departure: '',
            carLogs: ['Connecting to Waffle Ultra View logging system. Please wait...']
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);

    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        const socket = io('http://18.188.105.214');
        socket.on('connect', () => {
            socket.on('management', (data) => {
                let logs = this.state.carLogs;
                logs.push(data);
                this.setState({carLogs: logs});
            });
        });
        socket.on('disconnect', () => {
            let logs = this.state.carLogs;
            let message = 'Disconnected, trying to reconnect';
            logs.push(message);
            this.setState({carLogs: logs});
        });
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
        this.setState({showBooking: true});
        this.setState({reg: booking['reg']});
        this.setState({arrival: booking['arrival']});
        this.setState({departure: booking['departure']});
    };

    render() {
        console.log(this.props.logs);
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
                        {this.props.logs ?
                            <div className='logs'>
                                {this.state.carLogs.map(log => (
                                    <div>
                                        <FontAwesome
                                            name='caret-right'
                                            className='log-arrow'
                                            color='grey'
                                            size='lg'/>
                                        <span>{log}</span>
                                    </div>
                                ))}
                            </div>
                            : null
                        }
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
