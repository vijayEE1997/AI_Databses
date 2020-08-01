import React, { useState, useEffect } from "react"
import DatatablePage from "./Table";
import { useParams } from "react-router";
import DistMap from "./India-dist";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";

var jsondata ={
  "Maharashtra":{path:"/maharashtra.json",main_name:"maharashtra_district",name : "Maharashtra"},
  "Gujarat":{path:"/gujarat.json",main_name:"gujarat_district",name : "Gujarat"},
  "Delhi":{path:"/delhi.json",main_name:"delhi_district",name : "Delhi"},
  "Madhya Pradesh":{path:"/madhyapradesh.json",main_name:"madhyapradesh_district",name : "Madhya Pradesh"},
  "Tamilnadu":{path:"/tamilnadu.json",main_name:"tamilnadu_district",name : "Tamilnadu"},
  "Uttar Pradesh":{path:"/uttarpradesh.json",main_name:"uttarpradesh_district",name : "Uttar Pradesh"},
  "Andhra Pradesh":{path:"/andhrapradesh.json",main_name:"andhrapradesh_district",name : "Andhra Pradesh"},
  "Telangana":{path:"/telangana.json",main_name:"telangana_district",name : "Telangana"}
  
  
  
  };
  function Districtdata(props) {
    const params=useParams()
    const [selected,setSelected] = useState("confirmed")
    const stateselected=params.statename
    var [temp,settemp]=useState([])
    const[list,setlist]=useState([])
    var [datalist,setdatalist]=useState([])

    useEffect(()=>{
    
        const stateurl = "https://api.covid19india.org/data.json"
        axios.get(stateurl)
        .then( d => {
          if(d.status === 200 ){
            let data = d.data.statewise
            let y=[]
            for(let i in data)
            {
                y[data[i].state]={"Total":{"confirmed":data[i].confirmed,"deaths":data[i].deaths,"active":data[i].active,"recovered":data[i].recovered}}
            }
            setlist(y)
          }
          else{
            console.log("err")
          }
        })
        const disturl = "https://api.covid19india.org/state_district_wise.json"
        axios.get(disturl)
        .then( data => {
          if(data.status === 200 ){
                    let temp = []
                    let d=data.data
                    for(let item in d){
                        let x=d[item].districtData
                        
                            temp[item]=x
                    }
                    
                    settemp(temp)
                }
            }
        )

        
},[])
let data=temp
for(let i in data){
    for(let j in list[i])
    data[i][j]=list[i][j]
}
data["India"]=list["Total"]
let exp=data[stateselected]
let rows=[]
for(let i in exp)
{
  if(i!='Total')
  rows.push({"district":i,'confirmed':parseInt(exp[i].confirmed),'active':parseInt(exp[i].active),'deaths':parseInt(exp[i].deceased),'recovered':parseInt(exp[i].recovered)})
}


var columns= [
  {
    label: 'DistrictName',
    field: 'district',
    sort: 'asc',
    width:150
  },
  {
    label: 'Confirmed',
    field: 'confirmed',
    sort: 'asc',
    width:150
  },
  {
    label: 'Active',
    field: 'active',
    sort: 'asc',
    width:150
  },
  {
    label: 'Deaths',
    field: 'deaths',
    sort: 'asc',
    width:150
  },
  {
    label: 'Recovered',
    field: 'recovered',
    sort: 'asc',
    width:150
  }
]
let tabledata={columns,rows}


function Createlist(){
  var query={
    "query": {
      "bool": {
        "must": [
            {"match": {"State.keyword":stateselected}}
        ]
      }
    },
    "aggs":{
        "data":{
            "composite" : {
              "size": 1000,
                "sources" : [
                    { "Title": { "terms" : { "field": "data.Title.keyword" } } },
                    { "Url": { "terms" : { "field": "data.Url.keyword" } } },
                    { "date": { "terms" : { "field": "Date.keyword" } } }
                
                ]
            }
        }
    },
    "size":0
}  
const url1='http://142.93.213.146:9200/covid_notifications/_search'

  axios.post(url1, query)
  .then( d => {
      if(d.status === 200 ){
          let data=d.data.aggregations.data.buckets
          let datalist=data.map(s=>{return{Title:s.key.Title,Url:s.key.Url,Date:s.key.date}})
          setdatalist(datalist)
      }
      else{
          console.log("err")
      }
  })
  .catch( error => {
      if (error) {
        console.log(error)
      }
      else{
          console.log("Error!");
      }
  });
  let h=[]
  let rows=[]
  h.push(<Card style={{padding:'10px',margintop:'10px',color:'smokewhite'}}>Displaying {datalist.length} Press Releases for {stateselected}</Card>)
  for(let i in datalist)
  {
      rows.push({'number':parseInt(i)+1,Date:datalist[i].Date,Description:datalist[i].Title,File:<><a href={datalist[i].Url} target='_blank'><i class="far fa-file-pdf" ></i></a></>})
  }
  var columns= [
      {
        label: '#',
        field: 'number',
        sort: 'asc',
        width:100
      },
      {
        label: 'Date',
        field: 'Date',
        sort: 'asc',
        width:350
      },
      {
        label: 'File',
        field: 'File',
        sort: 'asc',
        width:150,
        align:"center"
      },
      {
        label: 'Description',
        field: 'Description',
        sort: 'asc',
        width:1450
      }
    ]
  let tabledata={columns,rows}
  h.push(<><br></br><DatatablePage  data={tabledata} xscrolling={false} yscrolling={true}/></>)
  return(h)

 }

      
      
    return (
      <div style={{marginTop:'18vh',marginLeft:'10vh'}}>
        <div className="selectOptions" style={{display:'flex',flexDirection:'row',justifyContent:'center',width:'50%',transform:'translate(45.5vw,0)'}}>
              <div>
              <select style={{width:'15vw',height:"3vh",}} defaultValue={stateselected} onChange={e=>{
                window.location.pathname=e.target.value;
                console.log("selecteddd",e.target.value)}}>
                  <option value="/">India</option>
                    {Object.keys(jsondata).map((d)=>{
                    return <option value={d}>{d}</option>
                    })}
              </select>
              </div>
              <div style={{paddingLeft:'2vw'}}>
                      <select style={{width:'15vw',height:"3vh"}} defaultValue={selected} onChange={e=>{
                        setSelected(e.target.value)
                      }}>
                      <option value="" disabled selected>Select Variable</option>
                      <option value="active">Active</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="deceased">Deaths</option>
                      </select>
              </div>
        </div>
        <div>
          <div style={{display:"flex",direction:"row",justifyContent:'space-evenly',paddingTop:'5vh'}}>
              <div style={{marginLeft:"500"}}>
                  <DatatablePage  data={tabledata} xscrolling={false} yscrolling={true} searching={true} />
              </div>
              <div style={{float:"right"}}>
                   <strong><h1 style={{fontWeight:'600',transform:'translate(13vw,0)',width:'40vw'}}>District-wise Map: {stateselected}</h1></strong>
                <DistMap data={data} variable={selected} statename={stateselected} />
              </div>
              </div>
              <div style={{padding:'30px',margintop:'30px'}}>
                  {Createlist()}  
                  <br></br>
              </div>
          </div>
  </div>
    )
  
  }

export default Districtdata
