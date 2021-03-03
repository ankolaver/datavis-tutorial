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
import * as d3 from 'd3';
import { useData } from './useData';
import { CountryBar } from './CountryBar';
import './App.css'; //necessary for css to be displayed

const width = 160*5.5;
const height = 160*4;

const margin = {top:20, right:20, bottom:40, left: 250}

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
		return <h2>Loading...</h2>
	}

	return (
		<>
		<h2>hello</h2>
		<svg width={width} height={height}>
			{/*added keys*/}
			<CountryBar 
				data={data}
				width={width}
				height={height}
				margin={margin}
			/>
		</svg>
		<h2>bye</h2>
		</>
	)
	//return <div>Data is {data ? message(data): 'loading'}</div>
 };

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
