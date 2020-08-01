import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import { ct,scaleLinear}  from "d3"
import * as d3 from 'd3'
import { useHistory, useRouteMatch } from "react-router"
import Axios from 'axios';
import Chart from './covidgraph'
import Economicdashboard from "../../economicdashboard"

const projection = d3.geoMercator()
  .scale(1100)
  .translate([ -1150,750])

const Indiamap = (props) => {

  const variable = props.variable;
  const data = props.data;
  const history = useHistory();
  const timeseries = "https://api.covid19india.org/data.json"
  const { path, browserURL } = useRouteMatch();
  const [geographies, setGeographies] = useState([])
  const [statecode, setstatecode] = useState("india")
  const [statehovered, setstatehovered] = useState("India")
  var [confirmedlist,setconfirmedlist]=useState([])
  var [activelist,setactivelist]=useState([])
  var [deceasedlist,setdeceasedlist]=useState([])
  var [recoveredlist,setrecoveredlist]=useState([])
  var [list,setlist]=useState([])
    
  useEffect(() => {

    fetch("/india.json")
      .then(response => {
        if (response.status !== 200) {
          return
        }
        response.json().then(worlddata => {
          let x = feature(worlddata, worlddata.objects.india).features
          setGeographies(x)
        })
        
      })
    }, [props.data,props.variable])

    useEffect(() => {
      var data=props.data
      var cmin=10000000,cmax=0;

      for(let i in data){
        if(data[i]!=undefined)
        if(data[i]["Total"]!=undefined)
        {
        var value = parseInt(data[i]["Total"][variable]);

        if(i!="India"){
          if(value < cmin)
         {cmin=value;
        }
        
         if(value>cmax){
           cmax=value
         }
        }
        }
    }
      var colorScale= scaleLinear()
    .domain([cmin, cmax])
    .range([" #f9fcff", "#08306b"]);
    
  

    var svg = d3.select(".mapsvg");
    
   var states = svg.selectAll(".countries")
                .data(geographies)
                .enter()

        var mState = states.append("path").attr("d",(d,i)=>{return geoPath().projection(projection)(d)})
                .attr("fill",(d,i)=>{ var country = d.properties.st_nm
                   var val ;
                  var ref = data[country];
                  if(typeof(ref)==="undefined")
                   return colorScale(0)
                  val = parseInt(data[country]["Total"][variable])
                  return colorScale(val)
                  } )
                .attr("stroke"," #000000")
                // .append("rect").attr("width",50).attr("x",30).attr("y",40).attr("height",60).attr("fill","red")
                var tooltip =svg.append("g").attr("class","ttip")
                var bg =tooltip.append("rect")

                var txt=tooltip.append("text").attr("x",450).attr("y",70).attr("class","mytooltip");

                  mState.attr("class",(d,i)=>{ return "mystate"+i})

                mState.on("mouseover",(d,i,e)=>{ 
                  //svg.call(tip)
                  var mstate = d.properties.st_nm
                  d3.select(".mapsvg").selectAll(".mystate"+i).attr("fill","#00c3ff")
                  for(let i in data)
                  {
                    if(i==mstate)
                    setstatecode(data[mstate].statecode.toLowerCase())
                  
                  }
                  setstatehovered(mstate)
        
                  return tooltip.style("visibility", "visible");
                })
                .on("mouseout",(d,i,e)=>{                   
                  d3.select(".mapsvg").selectAll(".mystate"+i).attr("fill",(d)=>{
                    var country = d.properties.st_nm
                   var val ;
                  var ref = data[country];
                  // setstatecode("india")
                  if(typeof(ref)==="undefined")
                   return colorScale(0)
                  val = parseInt(data[country]["Total"][variable])
                  return colorScale(val)
                  })
                  return tooltip.style("visibility", "hidden");
                })
                .on("mousemove", function(d){    
                  var country = d.properties.st_nm
                  var val ;
                 var ref = data[country];
                 if(typeof(ref)==="undefined")
                  val="no data"
                 else{
                  val = parseInt(data[country]["Total"][variable])
                 }
                  // txt.text(country + ":" + val)
                  svg.selectAll(".mytooltip").text(country + ":" + val+" "+variable)
                  bg.attr("x",()=>{ return window.event.pageX-835}).attr("y",(d)=>{return window.event.pageY-200})
                  .attr("width",180).attr("height",30).attr("fill","silver")                  
                  txt.attr("x",()=>{ return window.event.pageX-825}).attr("y",(d)=>{return window.event.pageY-180})               
                })
                .on("click",(d)=>{
                  //console.log("clickedd",d.properties.st_nm);
                  window.location.pathname=d.properties.st_nm;
                })

                Axios.get(timeseries)
                      .then( d => {
                          if(d.status === 200 ){
                            d=d.data.cases_time_series
                            confirmedlist=[]
                            activelist=[]
                            deceasedlist=[]
                            recoveredlist=[]
                            for(let i in d)
                            {
                                confirmedlist.push({label:d[i].date,value:parseInt(d[i].dailyconfirmed)})
                                activelist.push({label:d[i].date,"value":parseInt(d[i].dailyconfirmed-d[i].totaldeceased-d[i].totalrecovered)})
                                deceasedlist.push({label:d[i].date,"value":parseInt(d[i].dailydeceased)})
                                recoveredlist.push({label:d[i].date,"value":parseInt(d[i].dailyrecovered)})
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
                
                  const url="https://api.covid19india.org/states_daily.json"
                  Axios.get(url)
                      .then( d => {
                          if(d.status === 200 ){
                            let data=d.data.states_daily
                            let stlist=[]
                            for(let j in data[0])
                            if(j!="status"&&j!="date")
                            {
                              stlist.push(j)
                            }
                            list=[]
                            for(let i in stlist)
                            {
                              var confirmedlist=[]
                              var activelist=[]
                              var deceasedlist=[]
                              var recoveredlist=[]
                              var st=stlist[i]
                              for(let j in data)
                              {
                                if(data[j].status=="Confirmed")
                                confirmedlist.push({label:data[j].date,value:parseInt(data[j][st])})
                                if(data[j].status=="Recovered")
                                recoveredlist.push({label:data[j].date,value:parseInt(data[j][st])})
                                if(data[j].status=="Deceased")
                                deceasedlist.push({label:data[j].date,value:parseInt(data[j][st])})
                              }
                              for(let j in confirmedlist)
                              activelist.push({label:confirmedlist[j].label,value:confirmedlist[j].value-recoveredlist[j].value-deceasedlist[j].value})
                              list[st]={confirmedlist:confirmedlist,activelist:activelist,recoveredlist:recoveredlist,deceasedlist:deceasedlist}
                            }
                            setlist(list)
                            

                          }
                          else{
                            console.log("err")
                          }
                        })

               

},[geographies])

    return (
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",padding:'1%'}}>
            <div className="Map-state-graphs" style={{width:'40%',marginTop:'8.2vh',height:'70vh'}}>
              <div>
                {((statecode=='india')?
              ((confirmedlist.length!=0&&activelist.length!=0&&deceasedlist.length!=0&&recoveredlist.length!=0)?
              <div style ={{display:"flex", flexDirection:"column",width:'100%'}}>
                <div style={{width:'100%',height:'auto'}}>                      
                  <Chart data={confirmedlist} xdata="date" ydata="dailyconfirmed"/>
                </div>
                <div style={{width:'100%',height:'30vh'}}>                      
                    <Chart data={recoveredlist} xdata="date" ydata="dailyrecovered"/>
                </div>
                {/* <div style ={{display:"flex", flexDirection:"row",justifyContent:'space-between'}}>
                <div style={{width:'24.5vw',height:'30vh'}}>                      
                  <Chart data={confirmedlist} xdata="date" ydata="totalconfirmed"/>
                </div>
                <div style={{width:'24.5vw',height:'30vh'}}>                      
                    <Chart data={activelist} xdata="date" ydata="totalactive"/>
                </div>
                </div> */}
                {/* <div style ={{display:"flex", flexDirection:"row",justifyContent:'space-between'}}>
                  <div style={{width:'24.5vw',height:'30vh'}}>                        
                    <Chart data={deceasedlist} xdata="date" ydata="totaldeceased"/>
                </div>
                <div style={{width:'24.5vw',height:'30vh'}}>                      
                    <Chart data={recoveredlist} xdata="date" ydata="totalrecovered"/>
                </div>
                </div> */}
              </div>:
              <h1>loading indaily..</h1>)
              :((confirmedlist.length!=0&&activelist.length!=0&&deceasedlist.length!=0&&recoveredlist.length!=0)?
              
                // <h1>{statehovered}</h1>
                <div style ={{display:"flex", flexDirection:"column",width:'100%'}}>
                  <div style={{width:'100%',height:'30vh'}}>
                    <Chart data={list[statecode].confirmedlist} xdata="date" ydata="Daily Confirmed" changer={statehovered}/>
                  </div>
                  <div style={{width:'100%',height:'30vh'}}>
                    <Chart data={list[statecode].deceasedlist} xdata="date" ydata="Daily Deceased" changer={statehovered}/>
                  </div>
                {/* <div style ={{display:"flex", flexDirection:"row"}}>
                 <div style={{width:'25vw',height:'30vh'}}>
                  <Chart data={list[statecode].confirmedlist} xdata="date" ydata="totalconfirmed" changer={statehovered}/>
                </div>
                <div style={{width:'25vw',height:'30vh'}}>
                    <Chart data={list[statecode].activelist} xdata="date" ydata="totalactive" changer={statehovered}/>
                </div>
                </div>
                <div style ={{display:"flex", flexDirection:"row"}}>
                  <div style={{width:'25vw',height:'30vh'}}>
                    <Chart data={list[statecode].deceasedlist} xdata="date" ydata="totaldeceased" changer={statehovered}/>
                  </div>
                <div style={{width:'25vw',height:'30vh'}}>
                    <Chart data={list[statecode].recoveredlist} xdata="date" ydata="totalrecovered" changer={statehovered}/>
                </div>
                </div> */}
              </div>:
              <h1>loading{statehovered}</h1>))}
              </div>
            </div>

            <div style={{width:'35%',padding:'2%',height:'70vh',paddingTop:'-1vh'}}>
            <svg className="mapsvg" width='100%' viewBox='130 -3 600 580' height='95%' style={{paddingTop:'1%',paddingBottom:'0%' , boxShadow:'1px 2px 2px 4px #e0e0e0'}}>
                <g className="countries"> </g>
            </svg>
            </div>
            <div style={{width:'23%'}}>
            <Economicdashboard/>
            </div>
            


            
        </div>

    
  
    
  )

}
export default Indiamap