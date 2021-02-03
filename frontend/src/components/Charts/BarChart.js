import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Brush
} from 'recharts';

import {
  hexToRgb
} from "assets/jss/material-dashboard-react.js";

const rgba = (hex) => {
  return "rgba(" + hexToRgb(hex) + ",.62)" ;
};

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

export default class BarGraph extends PureComponent {
  render() {
    let dataKeys = this.props.dataKey.split(";");
    let keys = [];
    for(let i = 0; i < this.props.topics; i++) {
      keys.push(i);
    }
    return (
      <BarChart
        width={this.props.width ? this.props.width*0.95 : 300}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        barSize={20}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis 
          dataKey={this.props.xAxisDataKey} 
          angle={this.props.angle} 
          interval={this.props.hasInterval ? 'preserveStartEnd' : 0} 
          height={this.props.xAxisHeight ? this.props.xAxisHeight : 46} 
          tick={<CustomizedAxisTick />}/>
        <YAxis yAxisId={0}>
          <Label value={dataKeys[0]} dx={-10} angle={-90}/>
        </YAxis>
        {
          this.props.shared ? (
            <YAxis yAxisId={1} orientation="right" >
              <Label value={dataKeys[1]} dx={20} angle={-90}/>
            </YAxis>
          ) : ("")
        }
        <Tooltip />
        {
          this.props.brush ? (
            <Brush dataKey={this.props.xAxisDataKey} startIndex={0} endIndex={this.props.data.length - 1 < 39 ? this.props.data.length - 1 : 39} stroke="#8884d8" />
          ) : ("")
        }
        {
          !this.props.stack ? dataKeys.map((key, i) => (
            <Bar 
              key={key}
              yAxisId={this.props.shared ? i : 0}
              dataKey={key} 
              fill={i > 0 ? rgba(this.props.colors[i]) : this.props.colors[i]} />
          )) : keys.map((key, i) => (
            <Bar 
              key={key} 
              stackId={"a"} 
              dataKey={"Tópico " + key} 
              fill={this.props.colors["Tópico " + key]} />
          ))
        }
      </BarChart>
    );
  }
}