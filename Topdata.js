import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Topcharts from './Topcharts';

export default function Topdata(props) {
    
  let variable=props.variable
  
  if(variable=='deaths')
  variable='deceased'
  var ydata='total'+variable
  var [data,setdata]=useState([])
  const[confirmedlist,setconfirmedlist]=useState([])
  const[activelist,setactivelist]=useState([])
  const[deceasedlist,setdeceasedlist]=useState([])
  const[recoveredlist,setrecoveredlist]=useState([])
  const timeseries = "https://api.covid19india.org/data.json"
  useEffect(()=>{
  Axios.get(timeseries)
  .then( d => {
    if(d.status === 200 ){
      d=d.data.cases_time_series
      for(let i in d)
      {
          confirmedlist.push({date:d[i].date,"totalconfirmed":parseInt(d[i].dailyconfirmed)})
          activelist.push({date:d[i].date,"totalactive":parseInt(d[i].dailyconfirmed-d[i].dailydeceased-d[i].dailyrecovered)})
          deceasedlist.push({date:d[i].date,"totaldeceased":parseInt(d[i].dailydeceased)})
          recoveredlist.push({date:d[i].date,"totalrecovered":parseInt(d[i].dailyrecovered)})
      }
      if(variable=='confirmed')
      setdata(confirmedlist.slice(Math.max(confirmedlist.length -15, 0)))
      if(variable=='active')
      setdata(activelist.slice(Math.max(activelist.length - 15, 0)))
      if(variable=='deceased')
      setdata(deceasedlist.slice(Math.max(deceasedlist.length - 15, 0)))
      if(variable=='recovered')
      setdata(recoveredlist.slice(Math.max(recoveredlist.length - 15, 0)))

    }
    else{
      console.log("err")
    }
  })
},[])
if(data.length!=0)
{return (
  <div>
      <Topcharts data={data} xdata="date" ydata={ydata}/>
  </div>
  )}
    return(<h1>Loading..</h1>)
}
