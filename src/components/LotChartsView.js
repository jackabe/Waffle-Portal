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
        if (type === 'offers') {
            for (let [key, value] of Object.entries(data)){
                dataToPlot.push({'date': key, 'offers': value});
            }
        }
        else {
            for (let [key, value] of Object.entries(data)){
                dataToPlot.push({'date': key.split('/')[0], bookings: value});
            }
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
                            <VictoryAxis
                                style={{ axis: { stroke: '#E0F2F1' },
                                    axisLabel: { fontSize: 16, fill: '#E0F2F1' },
                                    ticks: { stroke: '#ccc' },
                                    tickLabels: { fontSize: 14, fill: '#E0F2F1', fontWeight: 'bold' },
                                    grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
                                }} dependentAxis
                            />
                            <VictoryAxis
                                style={{ axis: { stroke: '#E0F2F1' },
                                    axisLabel: { fontSize: 16 },
                                    ticks: { stroke: '#ccc' },
                                    tickLabels: { fontSize: 10, fill: '#E0F2F1', fontWeight: 'bold' }
                                }}
                            />
                            <VictoryLine
                                style={{ data: { stroke: "tomato", strokeWidth: 5, strokeLinecap: "round" } }}
                                padding={{ top: 20, bottom: 60 }}
                                animate={{
                                    duration: 4000,
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
                            <VictoryAxis
                                style={{ axis: { stroke: '#E0F2F1' },
                                    axisLabel: { fontSize: 16, fill: '#E0F2F1' },
                                    ticks: { stroke: '#ccc' },
                                    tickLabels: { fontSize: 14, fill: '#E0F2F1', fontWeight: 'bold' },
                                    grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
                                }} dependentAxis
                            />
                            <VictoryAxis
                                style={{ axis: { stroke: '#E0F2F1' },
                                    axisLabel: { fontSize: 8, fill: '#E0F2F1' },
                                    ticks: { stroke: '#ccc' },
                                    tickLabels: { fontSize: 8, fill: '#E0F2F1', fontWeight: 'bold', angle: 20},
                                    grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
                                }} independantAxis
                            />
                            <VictoryBar
                                style={{ data: { stroke: "tomato", strokeWidth: 5, strokeLinecap: "round" } }}
                                padding={{ top: 20, bottom: 60 }}
                                animate={{
                                    duration: 4000,
                                    onLoad: { duration: 1000 }
                                }}
                                data={dataToPlot}
                                x={"date"}
                                y={"offers"}
                            />
                        </VictoryChart>
                    </div>
                }
            </div>
        );
    }
}
