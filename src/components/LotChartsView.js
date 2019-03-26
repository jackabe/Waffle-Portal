import React, { Component } from 'react';
import '../App.css';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';


export default class LotChartsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        const data = [
            {date: '24', bookings: 12},
            {date: '25', bookings: 5},
            {date: '26', bookings: 8},
            {date: '27', bookings: 32},
            {date: '28', bookings: 77},
            {date: '29', bookings: 12},
            {date: '30', bookings: 5},
        ];
        return (
            <div className='chart'>
                <VictoryChart
                    theme={VictoryTheme.material}
                >
                    <VictoryLine
                        data={data}
                        x={"date"}
                        y={"bookings"}
                    />
                </VictoryChart>
            </div>
        );
    }

    }