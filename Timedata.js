import React, { useState } from 'react';
import Axios from 'axios';
import Tscharts from './Tscharts'
import { Card } from 'reactstrap';
import Linechart from './linechart'
import '../../../node_modules/react-vis/dist/style.css';
import Chart from './mychart'
import Test from './test'

export default function Timedata() {
    const[confirmedlist,setconfirmedlist]=useState([])
    const[activelist,setactivelist]=useState([])
    const[deceasedlist,setdeceasedlist]=useState([])
    const[recoveredlist,setrecoveredlist]=useState([])
    const timeseries = "https://api.covid19india.org/data.json"
    Axios.get(timeseries)
    .then( d => {
      if(d.status === 200 ){
        d=d.data.cases_time_series
        for(let i in d)
        {
            confirmedlist.push({x:d[i].date,y:parseInt(d[i].totalconfirmed)})
            activelist.push({label:d[i].date,"value":parseInt(d[i].totalconfirmed-d[i].totaldeceased-d[i].totalrecovered)})
            deceasedlist.push({label:d[i].date,"value":parseInt(d[i].totaldeceased)})
            recoveredlist.push({label:d[i].date,"value":parseInt(d[i].totalrecovered)})
        }
        setconfirmedlist(confirmedlist)
        setactivelist(activelist)
        setdeceasedlist(deceasedlist)
        setrecoveredlist(recoveredlist)

      }
      else{
        console.log("err")
      }
    })
    if(confirmedlist.length!=0)
    {return (
        <div>
            <Test data ={confirmedlist} />
            <div>
                <Chart data={confirmedlist} xdata="date" ydata="totalconfirmed"/>
            </div>
            <div>
                <Chart data={activelist} xdata="date" ydata="totalactive"/>
            </div>
            <div>
                <Chart data={deceasedlist} xdata="date" ydata="totaldeceased"/>
            </div>
            <div>
                <Chart data={recoveredlist} xdata="date" ydata="totalrecovered"/>
            </div>


            
        </div>
            
            
          
        );}
        return(<h1>Loading..</h1>)
}
