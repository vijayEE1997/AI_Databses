import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Axios from 'axios';
import { color } from 'd3';

export default function Tscharts(props) {
    var data=props.data
    let xdata=props.xdata
    let ydata=props.ydata
    return (
      <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey={xdata} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line  dataKey={ydata} stroke="#8884d8" dot={false} activeDot={{ r: 8 }} />
      </LineChart>
    );
}
