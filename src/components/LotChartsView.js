import React, { Component } from 'react';
import '../App.css';
import { VictoryLine, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export default class LotChartsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        const type = this.props.type;
        let data = [];
        if (type === 'bookings') {
            data = [
                {date: '24', bookings: 12},
                {date: '25', bookings: 5},
                {date: '26', bookings: 8},
                {date: '27', bookings: 32},
                {date: '28', bookings: 77},
                {date: '29', bookings: 12},
                {date: '30', bookings: 5},
            ];
        }
        else if (type === 'revenue') {
            data = [
                {date: '24', bookings: 58},
                {date: '25', bookings: 28},
                {date: '26', bookings: 33},
                {date: '27', bookings: 88},
                {date: '28', bookings: 66},
                {date: '29', bookings: 130},
                {date: '30', bookings: 120},
            ];
        }
        else if (type === 'offers') {
            data = [
                {date: 'McDonalds', bookings: 12},
                {date: 'Subway', bookings: 5},
                {date: 'Burger King', bookings: 8},
            ];
        }
        return (
            <div className='chart'>
                {this.props.chartType === 'line' ?
                    <div>
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
                            <VictoryLine
                                style={{ data: { stroke: "tomato", strokeWidth: 5, strokeLinecap: "round" } }}
                                padding={{ top: 20, bottom: 60 }}
                                animate={{
                                    duration: 3000,
                                    onLoad: { duration: 1000 }
                                }}
                                data={data}
                                x={"date"}
                                y={"bookings"}
                            />
                        </VictoryChart>
                    </div>
                    :
                    <div>
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
                            <VictoryBar
                                style={{ data: { stroke: "tomato", strokeWidth: 5, strokeLinecap: "round" } }}
                                padding={{ top: 20, bottom: 60 }}
                                animate={{
                                    duration: 3000,
                                    onLoad: { duration: 1000 }
                                }}
                                data={data}
                                x={"date"}
                                y={"bookings"}
                            />
                        </VictoryChart>
                    </div>
                }
            </div>
        );
    }
}
