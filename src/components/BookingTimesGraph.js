import React, { Component } from 'react';
import BookingService from '../scripts/BookingService';
import Plot from 'react-plotly.js';
import '../App.css';

class BookingTimesGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // componentDidMount() {
    //     BookingService.getBookingsForLot('Lnjg7Cc3umNVFYlsx2wt').then(
    //         response => {
    //             let data = response;
    //             this.setState({data:data});
    //             let bookingCount = this.getBookings();
    //             this.setState({bookingCount:bookingCount});
    //             console.log(this.state.bookingCount);
    //         }
    //     ).catch((response) => {
    //         console.log(response)
    //     });
    // }

    // getBookings = () => {
    //     let data = this.state.data;
    //     let count = {};
    //     let bookingCounter = 0;
    //     for(bookingCounter; bookingCounter < data.length; bookingCounter++){
    //         let arrival = data[bookingCounter]['arrival'];
    //         if (count[arrival]) {
    //             count[arrival] = count[arrival] + 1;
    //         }
    //         else {
    //             count[arrival] = 1
    //         }
    //     }
    //     return count;
    // };

    render(){
        let bookings =  {
            x: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            y: [0, 2, 3, 5, 12, 7, 5, 15, 10, 7, 5, 3, 2, 1, 1, 3, 1, 1, 1, 0],
            type: 'scatter',
            marker: {color: 'blue'},
            name: "Booking Count"
        };

        let price = {
            x: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            y: [1, 1, 1.24, 1.4, 1.9, 1.6, 1.4, 2.3, 1.7, 1.6, 1.4, 1.24, 1, 1, 1, 1, 1, 1, 1, 1],
            type: 'scatter',
            marker: {color: 'red'},
            name: "Price"
        };

        return (
            <div className="future">

                <Plot
                    data={[
                        bookings, price
                    ]}
                    layout={ {width: 1520, height: 900, title: 'No. of Bookings vs Time'} }
                />
            </div>
        );
    }
}

export default BookingTimesGraph