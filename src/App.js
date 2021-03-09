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
//React imports
import React from 'react';
import ReactDOM from "react-dom";
import * as d3 from 'd3';
import './App.css'; //necessary for css to be displayed
//import { View, Button,  StyleSheet } from 'react-native'; 
import './App.sass';

//Data imports
import { useFlower, useData, useTemp } from './useData';
import { CountryBar } from './CountryBar';
import { FlowerScatter } from './FlowerScatter';
import { TempLine } from './TempLine';
import { NavBar } from './NavBar';

const ShowStats = data => {
	let message = '';
	message = message+Math.round(d3.csvFormat(data).length/1024)+' kB ';
	message = message+data.length+' rows ';
	//message = message+data.columns.length+' columns';
	return message;
}

//function app => returns an object
const App = () => {
	const width = 160*5.5;
	const height = 160*4;

	const margin = {top:70, right:100, bottom:70, left: 100};

	const data = useData();
	const sepaldata = useFlower();
	const tempdata = useTemp();

	

	if (!sepaldata || !data || !tempdata) {
		// load loading msg if not ready
		return (
		<>
		<div className="columns is-mobile is-centered">
			<div className="column is-half">
			<article class="message is-success">
				<div class="message-header">
					<h1>Baking new graphics...</h1>
					<progress class="progress is-large is-primary" max="100">40%</progress>
				</div>
			</article>
			</div>
		</div>
		</>
		)
	}
	
	return (
		<>
		<NavBar/>
		
		<div class="container has-text-centered"> 
			<svg width={width} height={height+100}>
				{/*added keys*/}
				<CountryBar 
					data={data}
					width={width}
					height={height}
					margin={margin}
				/>
			</svg>
    	</div>

		<div className="columns is-mobile is-centered">
			<div className="column is-half">
				<article class="message is-info">
				<div class="message-header">
					<p>View flower differences</p>
					<button class="delete" aria-label="delete"></button>
				</div>
				<div class="message-body">
					Change the attributes in brackets
				</div>
				</article>
			</div>
		</div>


		<div id="flowerscatter" class="container has-text-centered">
		
		<FlowerScatter 
			data={sepaldata}
			width={width+100}
			height={height}
			margin={margin}
		/>
		</div>
		
		<div id="stock">
		<TempLine 
			data={tempdata}
			width={width+400}
			height={height}
			margin={margin}
		/>
		</div>
		</>
	)
	//return <div>Data is {data ? message(data): 'loading'}</div>
 };

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
