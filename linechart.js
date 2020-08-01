import React, { Component } from 'react';
import { render } from 'react-dom';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { select, selectAll } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { transition } from 'd3-transition';

class Line extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    const node = this.ref.current;
    const { xScale, yScale, data, lineGenerator } = this.props;

    const initialData = data.map(d => ({
      name: d.name,
      value: 0
    }));

    select(node)
      .append('path')
      .datum(initialData)
      .attr('id', 'line')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', lineGenerator);


    this.updateChart()
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const {
          lineGenerator, xScale, yScale, data,
        } = this.props;

    const t = transition().duration(1000);

    const line = select('#line');
    const dot = selectAll('.circle');

    line
      .datum(data)
      .transition(t)
      .attr('d', lineGenerator);

  }
  render() {
    return <g className="line-group" ref={this.ref} />;
  }
}

const XYAxis = ({ xScale, yScale, height }) => {
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    transform: `translate(0, ${height})`
    
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: 'translate(0, 0)',
    ticks: 6,
  };
  return (
    <g className="axis-group">
      <Axis {...xSettings} />
      <Axis {...ySettings} />
    </g>
  );
};

class Axis extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.updateAxis();
  }
  renderAxis() {
    const { scale, orient, ticks } = this.props;
    const node = this.ref.current;
    let axis;

    if (orient === "bottom") {
      axis = axisBottom(scale);
    }
    if (orient === "left") {
      axis = axisLeft(scale)
        .ticks(ticks);
    }
    select(node).call(axis);
  }
  updateAxis() {
    const { scale, orient, ticks } = this.props;
    const t = transition().duration(1000)

    if (orient === "left") {
      const axis = axisLeft(scale).ticks(ticks); 
      selectAll(`.${orient}`).transition(t).call(axis)
    }
  }
  render() {
    const { orient, transform } = this.props;
    return (
      <g
        ref={this.ref}
        transform={transform}
        className={`${orient} axis`}
      />
    );
  }
}

function Linechart (props){

    const data= props.data
    // const xdata=props.xdata
    const xdata="name"
    const ydata="value"
    // const ydata=props.ydata
    console.log(xdata,ydata)
    const parentWidth = 500;
    // const data=[{"name":"31 March ","value":1635},{"name":"01 April ","value":2059},{"name":"02 April ","value":2545},{"name":"03 April ","value":3105},{"name":"04 April ","value":3684},{"name":"05 April ","value":4293},{"name":"06 April ","value":4777},{"name":"07 April ","value":5350},{"name":"08 April ","value":5915},{"name":"09 April ","value":6728},{"name":"10 April ","value":7599},{"name":"11 April ","value":8453},{"name":"12 April ","value":9211},{"name":"13 April ","value":10454},{"name":"14 April ","value":11485},{"name":"15 April ","value":12371},{"name":"16 April ","value":13432}]
    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX);

    return (
      <div>
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </div>
    )
}

export default Linechart
