import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class LineGraph extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let keys = [];
    for(let i = 0; i < this.props.topics; i++) {
      keys.push(i);
    }
    return (
      <LineChart
        width={500}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="Fecha" interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map(topic => (
           <Line type="monotone" dataKey={"Tópico " + topic} stroke={topic%2 === 0 ? "#8884d8" : "#82ca9d"} />
        ))
        }
      </LineChart>
    );
  }
}