import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieGraph extends PureComponent {
  render() {
    return (
      <PieChart width={200} height={200}>
        <Tooltip />
        <Pie
          data={this.props.data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={this.props.colors[entry.name]} />)
          }
        </Pie>
      </PieChart>
    );
  }
}