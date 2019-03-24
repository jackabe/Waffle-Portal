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
                    <div className='spaces'>
                        {lot['spacesAndBookings'].map(space => (
                            <div className='space'>

                            </div>
                        ))}
                    </div>
                }
            </div>
        );
    }
}