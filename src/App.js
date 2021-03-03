/*
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import Chart1 from './Chart1';
import Chart2 from './Chart2';

function App() {
  return (
    <div className="App">
      <h1>Simple visualisation</h1>
        <Chart2/>
    </div>
  );
}

export default App;

*/
import React from 'react';
import ReactDOM from "react-dom";
import { scaleBand, scaleLinear, max } from 'd3';
import * as d3 from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 160*5.5;
const height = 160*4;

const margin = {top:20, right:20, bottom:20, left: 250}

const message = data => {
	let message = '';
	message = message+Math.round(d3.csvFormat(data).length/1024)+' kB ';
	message = message+data.length+' rows ';
	message = message+data.columns.length+' columns';
	return message;
}

//function app => returns an object
const App = () => {
	const data = useData();
	if (!data) {
		// load loading msg if not ready
		return <pre>Loading...</pre>
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yValue = d => d.Country;
	const xValue = d => d.Population;

	const yScale = scaleBand()
			.domain(data.map(yValue))
			.range([0,innerHeight]);
		
	const xScale = scaleLinear()
		.domain([0, max(data, xValue)])
		.range([0,innerWidth]);

	return (
		<svg width={width} height={height}>
			{/*added keys*/}
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisLeft yScale={yScale}/>
				<AxisBottom xScale={xScale} innerHeight={innerHeight}/>
				<Marks data={data} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue}/>
			</g>
		</svg>
		
	)
	//return <div>Data is {data ? message(data): 'loading'}</div>
 };

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
