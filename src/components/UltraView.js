import React, { Component } from 'react';
import '../App.css';
import FontAwesome from "react-fontawesome";

export default class UltraView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

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
                            {lot['spacesAndBookings'].map(space => (
                                <div>
                                    {/*{space['booked'] ?*/}
                                        {/*<div className='space-filled'>*/}
                                            {/*<span>{space['bayId']}</span>*/}
                                        {/*</div>*/}
                                        {/*:*/}
                                        <div className='space'>
                                            <span>{space['bay_id']}</span>
                                        </div>
                                    {/*}*/}
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        );
    }
}