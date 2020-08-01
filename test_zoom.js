import React, { useRef, useEffect, useState } from "react";
import { select , line, curveCardinal, scaleLinear, axisBottom, axisRight, scaleBand, values, utcYears, scaleTime, extent, axisLeft, brushX, event, invert, zoom, zoomTransform } from "d3";

import { Children } from "react";
import Test_Zoom_Child from "./test_zoom_child";


function Test_Zoom(props) {
  const data = props.data;
  const [selection, setSelection] = useState('');
  
  var [previousSelection,setpreviousSelection]=useState('')


  useEffect(() => {
  const svg = select(".parentclass");
  const svgContent = svg.select(".content")
  // [new Date(2014,0,0),new Date(2016,0,0)]
  
  setpreviousSelection=selection;///why is it done like this(previous selection is not at all being updated)
  

   const yextent = extent(data, d=>d.value)
   const xextent = extent(data, d=>d.year)

  
   //const xscale =scaleLinear().domain(data.map((x) => x.year)).range([0,2000])
  // var xscale =scaleLinear().domain(xextent).range([0,props.width])
       var xscale =scaleTime().domain([new Date(xextent[0],0,0),new Date(xextent[1],0,0)]).range([0, props.width])

   var yscale =scaleLinear().domain(yextent).range([props.height,0])

  

  //  if (currentZoomState) {
  //   const newxscale = currentZoomState.rescaleX(xscale);
  //   xscale.domain(newxscale.domain())
  // }
  
   
  //  if (!currentZoomState) {
  //   if (!idleTimeout) 
  //     return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
  //     xscale =scaleLinear().domain(xextent).range([0,2000])
  //  }
  //   else {
  //   xscale.domain([selection[0], selection[1]])
  //   
  //   }
  

   const xaxis = axisBottom(xscale).ticks(data.length)

   svg
   .select(".x-axis")
   .style("transform", `translateY(100px)`)
   .call(xaxis)

   const yaxis = axisRight(yscale);
   svg
   .select(".y-axis")
   .style("transform", `translateX(2000px)`)
   .call(yaxis)

   
    const myLine = line()
      .x(d => xscale(new Date(d.year,0,0)))
      .y(d => props.height - yscale(d.value))
    .curve(curveCardinal);
      
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .style("transform", "scale(1, -1)")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue")
      

      svg
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", "blue")
      .attr("r", (d) =>
        d.year >= selection[0] && d.year <= selection[1] ? 8 : 6
      )
      .attr("fill", (d) =>
        d.year >= selection[0] && d.year <= selection[1] ? "orange" : "yellow"
      )
      .attr("cx", (d) => xscale(new Date(d.year,0,0)))
      .attr("cy", (d) => yscale(d.value) - 20)
      .on("mouseenter", (d) => {
        svg
          .selectAll(".tooltip")
          .data([d.value])
          .join(enter => enter.append("text").attr("y", yscale(d.value)))
          .attr("class", "tooltip")
          .text(d.value)
          .attr("x", xscale(new Date(d.year,0,0)))
          .attr("text-anchor", "middle")
          .attr("y", yscale(d.value)-10)
          .transition()
          .attr("opacity", 1)
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("height", d => props.height - yscale(d.value))

    
     
   
    //   const zoomBehavior = zoom()
    //   .scaleExtent([1, 10])
    //   .translateExtent([
    //     [0, 0],
    //     [props.width, props.height]
    //   ])
    //   .on("zoom", () => {
    //     // My Current Zoom State
    
    //     const zoomState = zoomTransform(svgRef.current);
    
    //     setCurrentZoomState(zoomState);
        

    //   });
    
      
    // svg.call(zoomBehavior)
      
    const brush = brushX().extent([[0,0], [props.width, props.height]]).on("start brush end", () => {
      if (event.selection && event.selection[0] !== event.selection[1]) 
      { 
      const index = event.selection.map(xscale.invert);
      
      
      setSelection(index);
    }

    })
    
    if (previousSelection === selection) {
      svg
        .select(".brush")
        .call(brush)
        .call(brush.move, null) //what is the use of this??
        // .call(brush.move, selection.map(xscale)); 
    
    }
    select(".twocharts").style("border","2px solid black")
    select(".parentclass").style("border","1px solid black")


  }, [data, selection, previousSelection]);

  return (
      <div className="twocharts" style={{width:"max-content"}}>

        <Test_Zoom_Child data={data} width = {1000} height = {300} selection = {selection}/><br/><br/>
    <svg className="parentclass" width={props.width} height={props.height}>
    <defs>
            <clipPath id="myClipPath">
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath="url(#myClipPath)"></g>
          <g className = "x-axis"></g>
          <g className = "y-axis"></g>
          <g className = "brush"></g>
        </svg>
        
       </div>
       
  );

}

export default Test_Zoom;