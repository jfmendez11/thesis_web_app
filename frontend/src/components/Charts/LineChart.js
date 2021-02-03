import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
} from 'recharts';

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

export default class LineGraph extends PureComponent {
  render() {
    let keys = [];
    for(let i = 0; i < this.props.topics; i++) {
      keys.push(i);
    }
    return (
      <LineChart
        width={this.props.width ? this.props.width*0.9 : 300}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="Fecha" interval={0} height={76} tick={<CustomizedAxisTick />}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Brush dataKey="Fecha" startIndex={0} endIndex={this.props.data.length - 1 < 39 ? this.props.data.length - 1 : 39} stroke="#8884d8"/>
        {keys.map(topic => (
          <Line 
            key={"millosdavid@" + topic} 
            connectNulls 
            type="monotone" 
            dataKey={"Tópico " + topic} 
            stroke={this.props.colors["Tópico " + topic]} 
          />
        ))
        }
      </LineChart>
    );
  }
}