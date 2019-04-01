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
        let bookings =  {
            x: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            y: [0, 2, 3, 5, 12, 7, 5, 15, 10, 7, 5, 3, 2, 1, 1, 3, 1, 1, 1, 0],
            // type: 'scatter',
            // marker: {color: 'white'},
            // name: "Booking Count"
        };

        let price = {
            x: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            y: [1, 1, 2.24, 2.8, 3.4, 2.6, 2.4, 4.3, 2.7, 2.4, 2.24, 2.24, 2, 1, 1, 1, 1, 1, 1, 1],
            // type: 'bar',
            // marker: {color: 'tomato'},
            // name: "Price"
        };

        // <Plot
        //     data={[
        //         bookings, price
        //     ]}
        //     layout={ {width: 1520, height: 900, title: 'No. of Bookings vs Time', plot_bgcolor: 'rgba(40,44,52,1)'} }
        // />

        return (
            <div className="future">

                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                        }}
                        data={[
                            {x : 5, y: 0},
                            {x : 6, y: 2},
                            {x : 7, y: 3},
                            {x : 8, y: 3},
                            {x : 9, y: 10},
                            {x : 10, y: 16},
                            {x : 11, y: 6},
                            {x : 12, y: 12},
                            {x : 13, y: 16},
                            {x : 14, y: 7},
                            {x : 15, y: 5},
                            {x : 16, y: 3},
                            {x : 17, y: 2},
                            {x : 18, y: 5},
                            {x : 19, y: 2},
                            {x : 20, y: 1},
                            {x : 21, y: 1},
                            {x : 22, y: 0},
                            {x : 23, y: 0},
                            {x : 24, y: 0},
                        ]}
                    />
                    <VictoryBar
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                        }}
                        data={[
                            {x : 5, y: 2},
                            {x : 6, y: 2},
                            {x : 7, y: 2},
                            {x : 8, y: 2},
                            {x : 9, y: 2.75},
                            {x : 10, y: 3.5},
                            {x : 11, y: 2.2},
                            {x : 12, y: 2.9},
                            {x : 13, y: 2.5},
                            {x : 14, y: 2.3},
                            {x : 15, y: 2.1},
                            {x : 16, y: 2},
                            {x : 17, y: 2},
                            {x : 18, y: 2.1},
                            {x : 19, y: 2},
                            {x : 20, y: 2},
                            {x : 21, y: 2},
                            {x : 22, y: 2},
                            {x : 23, y: 2},
                            {x : 24, y: 2},
                        ]}
                    />
                </VictoryChart>
            </div>
        );
    }
}

export default BookingTimesGraph