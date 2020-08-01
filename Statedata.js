import React, { useState, useEffect } from "react"
import axios from 'axios'
import DatatablePage from "./Table";
import IndiaMap from "./Indiamap"
import { Link } from "react-router-dom";
import Tscharts from './Tscharts'
import Timedata from "./Timedata";
import { Card } from "reactstrap";
import Example from "./Topcharts";
import Topdata from "./Topdata";
import Medium from "../../medium";
function Statedata(props) {
 
  const url = "https://api.covid19india.org/data.json"
  const [selected,setSelected] = useState("confirmed")
  
let data=props.data
let top=[]
let rows=[]
for(let i in data)
{
  if(data[i]!=undefined&&data[i].Total!=undefined)
  {
    if(i!='India'&&i!='State Unassigned')
    rows.push({"state":<Link to={i} style={{color:'black'}}>{i}</Link>,'confirmed':parseInt(data[i].Total.confirmed),'active':parseInt(data[i].Total.active),'deaths':parseInt(data[i].Total.deaths),'recovered':parseInt(data[i].Total.recovered)})
    else if(i=='India')
    {
      var d=data['India'].Total
      for(let i in d)
      top.push({label:i,value:d[i]})
    }
  }
}
  var columns= [
    {
      label: 'StateName',
      field: 'state',
      sort: 'asc',
      width:260    },
    {
      label: 'Confirmed',
      field: 'confirmed',
      sort: 'asc',
      width:260    },
    {
      label: 'Active',
      field: 'active',
      sort: 'asc',
      width:260    },
    {
      label: 'Deaths',
      field: 'deaths',
      sort: 'asc',
      width:260    },
    {
      label: 'Recovered',
      field: 'recovered',
      sort: 'asc',
      width:260    }
  ]
  let tabledata={columns,rows}

  
  return (
    <>
          <div className="select-n" style={{marginLeft:'12.5vw',marginTop:'0 vh',}}>
                <select style={{height:'3vh',transform:'translate(0vw,8.5vh)',outline:'none',width:'10vw',paddingLeft:"1em",backgroundColor:"#ecf2fe",fontSize:'1em',}} defaultValue={selected} onChange={e=>{
                  setSelected(e.target.value)}}>
                <option value="" disabled selected>Select Variable</option>
                <option value="active">Active</option>
                <option value="confirmed">Confirmed</option>
                <option value="deaths">Deaths</option>
                </select>
          </div>
          <div>
          {/* <div style={{display:"flex",paddingBottom:'5vh',direction:"row",width:"48vw",transform:'translate(51vw,1vh)'}}>
              {top.map(s=>(
                <Card style={{borderRadius:'10px',color:'smokewhite',padding:'10px',marginRight:'10px',width:'400px'}}><div>{s.label}<br></br>{s.value}<br></br><Topdata variable={s.label}/></div></Card>
              ))}
          </div> */}
              <IndiaMap data={props.data} variable ={selected} />
                <div style={{display:'flex',flexdirection:'row',justifyContent:'space-between',padding:'1%'}}>
                    <div style={{width:"74%",paddingTop:"6%"}}>
                        <DatatablePage data={tabledata} xscrolling={false} yscrolling={true} searching={true} />
                    </div>
                    <div style={{float:'right',width:'23%',marginLeft:'0%',paddingTop:"3%"}}>
                      <Medium/>
                    </div>
                </div>
          </div>
      </>
  )

}
export default Statedata



 