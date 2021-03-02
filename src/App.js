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
import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from "react-dom";
import { csv, scaleBand, scaleLinear, max, range } from 'd3';
import * as d3 from 'd3';


const width = 160*4;
const height = 160*4;

const initialMousePosition = { x: width/2, y: height/2};
const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';
const margin = {top:20, right:20, bottom:20, left: 150}

const message = data => {
	let message = '';
	message = message+Math.round(d3.csvFormat(data).length/1024)+' kB ';
	message = message+data.length+' rows ';
	message = message+data.columns.length+' columns';
	return message;
}

//function app => returns an object
const App = () => {
	const [data, setData] = useState(null);
	
	useEffect(() => {

		const row = (d) => {
			//extract 2020 population
			d.Population = +d['2020'];
			return d
		}

		d3.csv(csvUrl,row).then(data => {
			//either null before loaded or loaded data
			setData(data.slice(0,20));
		
		});

	}, []);

	if (!data) {
		// load loading msg if not ready
		return <pre>Loading...</pre>
	}
	//console.log(data[0]);

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yScale = scaleBand()
		.domain(data.map(d => d.Country))
		.range([0,innerHeight]);
	
	const xScale = scaleLinear()
		.domain([0, max(data, d => d.Population)])
		.range([0,innerWidth]);

	console.log(xScale.ticks())

	return (
		<svg width={width} height={height}>
			{/*added keys*/}
			<g transform={`translate(${margin.left},${margin.top})`}>
				{xScale.ticks().map(tickValue =>  (
				<g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
					<line y2={innerHeight} stroke="black" />
					<text 
						style={{ textAnchor:'middle' }} 
						dy=".71em" 
						y={innerHeight+4}
					>
						{tickValue}
					</text>
				</g>
				))}
				{yScale.domain().map(tickValue =>  (
				<g transform={`translate(0,${yScale(tickValue)+yScale.bandwidth()/2})`}>
					<text 
						key={tickValue}
						style={{textAnchor:'end'}} 
						x={-3} 
						dy=".32em"
					>
						{tickValue}
					</text>
				</g>
				))}
				{data.map(d => (
					<rect
						key={d.Country}
						y={yScale(d.Country)}
						width={xScale(d.Population)}
						height={yScale.bandwidth()}
					/>
				))}
			</g>
		</svg>
		
	)
	//return <div>Data is {data ? message(data): 'loading'}</div>

	
 };

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
