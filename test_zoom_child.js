import React, { useRef, useEffect, useState } from "react";
import { select , line, curveCardinal, scaleLinear, axisBottom, axisRight, scaleBand, values, utcYears, scaleTime, extent, axisLeft, brushX, event, invert, zoom, zoomTransform, axisTop } from "d3";

import * as d3 from "d3"

function Test_Zoom_Child(props) {
  const data = props.data;
  const svg = select(".sup2");
  const [currentZoomState, setCurrentZoomState] = useState();
  
  useEffect(() => {



    var legend = svg.append('g')
    .attr('class', 'chart__legend')
    .attr('width', props.width)
    .attr('height', 30)
    .attr('transform', 'translate(50, 20)');

  legend.append('text')
    .attr('class', 'chart__symbol')
    .text('AI DATABASES')

  var rangeSelection =  legend
    .append('g')
    .attr('class', 'chart__range-selection')
    .attr('transform', 'translate(110, 0)');

    var dateRange = ['1w', '1m', '3m', '6m', '1y', '5y']
    for (var i = 0, l = dateRange.length; i < l; i ++) {
      var v = dateRange[i];
      rangeSelection
        .append('text')
        .attr('class', 'chart__range-selection')
        .text(v)
        .attr('transform', 'translate(' + (30 * i) + ', 0)')
        .on('click', function(d) { console.log("clic",d)  });
    }


   const yextent = extent(data, d=>d.value)
   const xextent = extent(data, d=>d.year)
 
//[new Date(Math.floor(props.selection[0]),0,0),new Date(Math.ceil(props.selection[1]),0,0)]
    var xscale =scaleTime().domain(props.selection).range([0, props.width])
   var yscale =scaleLinear().domain(yextent).range([props.height,0])

  

   if (currentZoomState) {
    const newxscale = currentZoomState.rescaleX(xscale);
    xscale.domain(newxscale.domain())
  }
  	

	svg.style("border","1px solid gray")


// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x));
   const xaxis = axisTop(xscale).ticks(data.length)
   svg
   .select(".x-axis")
   .attr("transform", "translate(0," + 281 + ")")
   .call(d3.axisBottom(xscale))


  //  .style("transform", `translateY(282px)`)
  //  .
   const yaxis = axisLeft(yscale);
   svg
   .select(".y-axis")
   .style("transform", `translateX(25px)`)
   .call(yaxis)

  
    const myLine = line()
      .x(d => xscale(new Date(Math.floor(d.year),0,0)))
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
      .attr("r", "4")
      .attr("fill", "yellow")
      .attr("cx", (d) => xscale(new Date(Math.floor(d.year),0,0)))
      .attr("cy", (d) => yscale(d.value) - 18)
      .on("mouseover", (d) => {	console.log("enteredd")})
      .on("mouseout",function(){console.log("leftt")})
      .transition()
      .attr("height", d => props.height - yscale(d.value))


      svg.selectAll(".helptext").remove();
      var x = svg.append("text")
.attr("x", props.width - 290)
.attr("y", 35)
.attr("class","helptext");

svg.selectAll(".Vtext").remove();
var VT = svg.append("text")
.attr("x", 100)
.attr("y", props.length)
.attr("class","Vtext")
.text("hiii");

	
	svg.on("mousemove",function(d){
	
	var mouse = d3.mouse(this);
	svg.selectAll(".vline").remove()
	
	var date = xscale.invert(mouse[0])
	var val = yscale.invert(mouse[1]).toString().slice(0,6)
	var yr = date.toString().slice(0,24);
	
	

	  var bisectDate = d3.bisector(function(d) { ; return new Date(d.year,0,0); }).left
 	var x0 = xscale.invert(d3.mouse(this)[0]);
	
        var i = bisectDate(data, x0, 1);
	
        var d0 = data[i - 1];
        var d1 = data[i];
        var d = x0 - new Date(d0.year,0,0)> new Date(d1.year,0,0) - x0 ? d1 : d0;

	
	svg.selectAll(".hline").remove()
  
	

        svg.append("line")
	.attr("class","hline")
	.attr("x1",0)
	.attr("y1",yscale(d.value) - 18)
	.attr("x2",props.width)
	.attr("y2",yscale(d.value) - 18)
  .attr("stroke","black")
  .style("stroke-dasharray", ("5, 6")) 
	.attr("stroke-width",0.8)
	
	x.text(yr+" : "+val)
	
	var lineyr = new Date(d.year,0,0).toString().slice(0,15);
	
	VT.attr("x",d3.mouse(this)[0]).text(lineyr+": "+d.value);
  
  svg
	.append("line")
	.attr("class","crosshair")
	.attr("class","vline")
	.attr("x1",mouse[0])
	.attr("y1",0)
	.attr("x2",mouse[0])
  .attr("y2",props.height)
  .style("stroke-dasharray", ("5, 6")) 
	.attr("stroke-width",0.8)
	.attr("stroke","black")	
})

svg.append("line").attr("x1",0).attr("y1",282).attr("x2",props.width).attr("y2",282).attr("stroke-width",0.7).attr("stroke","black")
svg.append("line").attr("y1",0).attr("x1",27).attr("y2",props.width).attr("x2",27).attr("stroke-width",0.7).attr("stroke","black")

   
      const zoomBehavior = zoom()
      .scaleExtent([1, 10])
      .translateExtent([
        [0, 0],
        [props.width, props.height]
      ])
      .on("zoom", () => {
        
        const zoomState = d3.event.transform;
      
        setCurrentZoomState(zoomState);
        
      });
      
    svg.call(zoomBehavior)
      
  }, [data, props.selection, currentZoomState]);

  if (!props.selection) {
    // console.log("inititalll")
    return null;
  }

  return (
      <React.Fragment>
    <svg className="sup2" width={props.width} height={props.height}>
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
       </React.Fragment>
  );

}

export default Test_Zoom_Child;
