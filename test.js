import React, { useState } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalRectSeries,
    LineSeries,
    Crosshair
  } from 'react-vis';
  
  var maxX = new Date('Jan 01 1000')
  var minX = new Date('Jan 01 2200')

  //here instead of maindata use your props.data;
  var maindata = []
  export default function Test(props) {

    maindata = props.data
    const supdata = maindata.map((d,i)=>{
        const supd ={x : new Date(d.x+" 2017"),y:d.y}
        maxX = Math.max(maxX,supd.x)//for generating maxX
        minX = Math.min(minX,supd.x);
        return supd;
    })

    const [crosshairValues,setcrosshairValues] = useState([])
    const [currentIndex,setcurrentIndex] = useState(0);

    const myonMouseLeave = () => {
        setcrosshairValues([])
          };

    const  onNearestX = (value, {index}) => {
            // console.log("v",value,index)    
        setcrosshairValues([value])
        setcurrentIndex(index)//setting the current index to the index of the closest element
        // console.log("main",value,crosshairValues[0],supdata[index]);
        };

    return (
      <XYPlot
        onMouseLeave={myonMouseLeave}
        xDomain={[minX,maxX]}//even if i remove this its working bc the component is automatically searching for max and min
        xType="time"
        width={600}
        height={300}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45}/>
        <YAxis />
        <LineSeries data={supdata} onNearestX={onNearestX} style={{stroke: 'blue'}} />
        <Crosshair values={crosshairValues} className={'test-class-name'}>
            {/* <div style={{background: 'black'}}>
                <h3>Values of crosshair</h3>
                <p>{maindata[currentIndex].x} : {maindata[currentIndex].y}</p>
            </div>     */}
        </Crosshair>
      </XYPlot>
    );
  }


  

//   const DATA = [
//     { x: new Date('Jan 01 2017'), y: 0.4},
//     { x: new Date('Jan 03 2017'), y: 2.2},
//     { x:new Date('Jan 04 2017'), y: 1},
//     { x: new Date('Jan 06 2017'), y: 2.5},
//     { x: new Date('Jan 08 2017'), y: 1},
//     { x: new Date('Jan 10 2017'), y: 1},
//     { x: new Date('Jan 15 2017'), y: 2},
//     { x: new Date('Jan 16 2017'), y: 1.2},
//     { x: new Date('Jan 19 2017'), y: 2.4},
//     { x: new Date('Jan 25 2017'), y: 2},
//     { x: new Date('Jan 29 2017'), y: 2}
//   ].map((el,i)=>{
//       const s = { x: el.x , y: el.y};
//     //maxX = Math.max(maxX,el.x)//for generating maxX
//       return s;
//   });
