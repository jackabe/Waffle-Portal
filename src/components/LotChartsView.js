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
        const data = this.props.data;
        let dataToPlot = [];
        for (let [key, value] of Object.entries(data)){
            dataToPlot.push({'date': key.split('/')[0], bookings: value});
        }
        dataToPlot.reverse();
        console.log(dataToPlot)
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
                                data={dataToPlot}
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
                                data={dataToPlot}
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
