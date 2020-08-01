import React, { useState, useEffect } from "react"
import {Line} from "react-chartjs-2"
import { Responsive } from "semantic-ui-react"
import annotation from "chartjs-plugin-annotation"


function Chart(props){

var [chartData,setchartData] = useState()
var [labels,setlabels] = useState([])
var [fields,setfields] = useState([])

let data=props.data
let ydata=props.ydata
const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };
  var changer=ydata
  if(props.changer!=undefined&&props.changer!="India")
  changer=props.changer
  
useEffect(()=>{
    labels=[]
    for(let i in data)
    {
        let x=data[i].label
        let y=x.substring(3,6)+x.substring(0,3)+x.substring(6,10)
        labels.push(y)
    }
    
    fields=[]
    for(let i in data)
    fields.push(data[i].value)

    setfields(fields)
    setlabels(labels)

    chartData=[]
    setchartData({
        labels : labels,
        datasets : [
            {
                label : ydata,
                data : fields,
                borderColor : "black",
                pointHoverRadius: 8,
                pointHoverBackgroundColor: "grey",
                pointHoverBorderColor: "black",
                pointHoverBorderWidth: 2,
                pointRadius:2.5
            },
        ],
        lineAtIndex:20
    })
},[changer])

    return(
        (chartData!=undefined)?
        (<div style={{}}>
            <div >
                <Line 
                data={chartData} 
                legend={legend}
                options={
                    {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                distribution: 'series',
                                // time: {
                                //     unit:'month',
                                //     // displayFormats: {
                                //     //     day: 'MMM D'
                                //     // }
                                // },
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                ticks: {
                                    beginAtZero: true
                                 }
                            }],
                            yAxes: [{
                                gridLines: {
                                    drawOnChartArea: false
                                }
                            }]
                        },
                        responsive : true,
                        title : {text:changer,display:true},
                        tooltips: {
                            intersect: true
                         },annotation: {
                            annotations: [{
                                type: 'line',
                                mode: 'vertical',
                                scaleID: 'x-axis-0',
                                value: "01-03-2020",
                                borderColor: 'rgb(256, 5, 15)',
                                borderWidth: 2,
                                label: {
                                  enabled: true,
                                  content: 'Covid-19',
                                  position: "top"
                                }
                              },
                            //   {
                            //     type: 'line',
                            //     mode: 'horizontal',
                            //     scaleID: 'y-axis-0',
                            //     value: "0",
                            //     borderColor: 'black',
                            //     borderWidth: 1,
                            //     }
                            ]
                          }
                    }
                }
                />
            </div>
        </div>):<h1>Chart loading...</h1>
    )

}
export default Chart