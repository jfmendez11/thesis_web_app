import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Brush
} from 'recharts';

import {
  hexToRgb
} from "assets/jss/material-dashboard-react.js";

import CustomTooltip from "./CustomTooltip.js";

const rgba = (hex) => {
  return "rgba(" + hexToRgb(hex) + ",.62)" ;
};

export default class BarGraph extends PureComponent {
  constructor(props) {
    super(props);
  }

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
        <XAxis dataKey={this.props.xAxisDataKey} angle={this.props.angle} interval={0}>
          <Label value={this.props.xAxisDataKey} offset={0} position="insideBottom" />
        </XAxis>
        <YAxis yAxisId={0}>
          <Label value={dataKeys[0]} offset={0} position="insideBottomLeft" angle={-90}/>
        </YAxis>
        {
          this.props.shared ? (
            <YAxis yAxisId={1} orientation="right">
              <Label value={dataKeys[1]} offset={0} position="insideTopRight" offset={100} angle={-90}/>
            </YAxis>
          ) : ("")
        }
        <Tooltip />
        {
          this.props.brush ? (
            <Brush dataKey={this.props.xAxisDataKey} y={300} height={30} stroke="#8884d8" />
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