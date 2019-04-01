import React, { Component } from 'react';
import BookingService from '../scripts/BookingService';
import LotChartsView from '../components/LotChartsView';

class BookingTimesGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        BookingService.getBookingsForLot('Lnjg7Cc3umNVFYlsx2wt').then(
            response => {
                let data = response;
                this.setState({data:data});
                let bookingCount = this.getBookings();
                this.setState({bookingCount:bookingCount});
                console.log(this.state.bookingCount);
            }
        ).catch((response) => {
            console.log(response)
        });
    }

    getBookings = () => {
        let data = this.state.data;
        let count = {};
        let bookingCounter = 0;
        for(bookingCounter; bookingCounter < data.length; bookingCounter++){
            let arrival = data[bookingCounter]['arrival'];
            if (count[arrival]) {
                count[arrival] = count[arrival] + 1;
            }
            else {
                count[arrival] = 1
            }
        }
        return count;
    };

    render(){
        return (
            <h1> Data Visualisation </h1>
        );
    }
}

export default BookingTimesGraph