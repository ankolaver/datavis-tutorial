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

	const margin = {top:40, right:100, bottom:70, left: 140};

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
		<br /><br /><br /><br />
		<div class="container has-text-centered"> 
			<div className="columns is-mobile is-centered">
				<div className="column">
					<article class="message is-info">
					<div class="message-header">
						<p>Compare the population size of different countries</p>
						<button class="delete" aria-label="delete"></button>
					</div>
					
					</article>
				</div>
			</div>
			<svg width={width+100} height={height+100}>
				{/*added keys*/}
				<CountryBar 
					data={data}
					width={width}
					height={height}
					margin={margin}
				/>
			</svg>
    	</div>
		
		<div id="flowerscatter" class="container has-text-centered">
			<div className="columns is-mobile is-centered">
				<div className="column">
					<article class="message is-info">
					<div class="message-header">
						<p>Compare environmental impact of different methods of food production</p>
						<button class="delete" aria-label="delete"></button>
					</div>
					<div class="message-body">
						Change the attributes in brackets <br />
						Food Production Emissions from https://www.kaggle.com/selfvivek/environment-impact-of-food-production.
					</div>
					</article>
				</div>
			</div>
			<FlowerScatter 
				data={sepaldata}
				width={width+200}
				height={height}
				margin={margin}
			/>
		</div>
		
		<br/><br/><br/>
		<div className="columns is-mobile is-centered">
			<div className="column is-half">
				<article class="message is-info">
				<div class="message-header">
					<p>Compare S&P500 against the Consumer Price Index</p>
					<button class="delete" aria-label="delete"></button>
				</div>
				</article>
			</div>
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
