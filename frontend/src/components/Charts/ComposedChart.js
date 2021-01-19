import React, { PureComponent } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';

export default class ComposedGraph extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ComposedChart
        width={this.props.width ? this.props.width*0.9 : 300}
        height={400}
        data={this.props.data}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey={this.props.xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={this.props.dataKey} barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey={this.props.dataKey} stroke="#ff7300" />
      </ComposedChart>
    );
  }
}