import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function Topcharts(props){
  let data=props.data
  let ydata=props.ydata

    return (
      <LineChart width={100} height={30} data={data}>
        <Line type="monotone" dataKey={ydata} stroke="#8884d8" strokeWidth={2} dot={false}/>
      </LineChart>
    );
}
