import React, { Component } from 'react';
import BookingService from '../scripts/BookingService';
import Plot from 'react-plotly.js';
import '../App.css';
import {VictoryChart, VictoryTheme, VictoryLine, VictoryBar } from 'victory';
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

        let data = this.props.data;
        let xAxis = [];
        let yPriceAxis = [];
        let yPriceRealAxis = [];
        let yCountAxis = [];

        for (let [key, value] of Object.entries(data)){
            xAxis.push(key);
            yPriceAxis.push(value['prices']);
            yCountAxis.push(value['count']);
        }

        let i = 0;
        for (i; i < yPriceAxis.length; i++) {
            let j = 0;
            for (j; j < yPriceAxis[i].length; j++) {
                yPriceRealAxis.push(yPriceAxis[i][j])
            }
        }

        let bookings =  {
            x: xAxis,
            y: yCountAxis,
            type: 'scatter',
            marker: {color: 'white'},
            name: "Booking Count"
        };

        console.log(bookings)

        let price = {
            x: xAxis,
            y: yPriceRealAxis,
            type: 'scatter',
            marker: {color: 'tomato'},
            name: "Price"
        };

        console.log(price)

        return (
            <div className="price-chart">
                <Plot
                    data={[
                        bookings, price
                    ]}
                    layout={ {width: 1200, height: 800, title: 'No. of Bookings vs Time', plot_bgcolor: 'rgba(40,44,52,1)'} }
                />
            </div>
        );
    }
}

export default BookingTimesGraph