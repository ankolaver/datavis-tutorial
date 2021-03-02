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
import React, { useState, useCallback } from 'react';
import ReactDOM from "react-dom";
import { range } from 'd3';
import { Face } from './Face';


const width = 160*9;
const height = 160*9;
const array = range(6*2);

const circleX = width / 2;
const circleY = height / 2;
const circleRadius = 30/4;
const initialMousePosition = { x: width/2, y: height/2};

//function app => returns an object
const App = () => {
	
	const [mousePosition, setMousePosition] = useState(initialMousePosition);
	
	//use callBack not re-rendered
	const handleMouseMove = useCallback(event => {
		//extract from json event object
		const { clientX, clientY } = event;
		//console.log({ x:clientX, y:clientY });
		setMousePosition({ x: clientX, y: clientY });
	}, [setMousePosition]);
	
	return (
		/*
		array.map(() => (
		<Face
		  width={width}
		  height={height}
		  centerX={width / 2}
		  centerY={height / 2}
		  strokeWidth={6 + Math.random() * 3}
		  eyeOffsetX={20 + Math.random() * 9}
		  eyeOffsetY={20 + Math.random() * 15}
		  eyeRadius={5 + Math.random() * 10}
		  mouthWidth={7 + Math.random() * 9}
		  mouthRadius={30 + Math.random() * 10}
		/>
		)),
		*/
		<svg width={width} height={height} onMouseMove={handleMouseMove}>
			<circle
				cx={mousePosition.x}
				cy={mousePosition.y}
				r={circleRadius}
			/>
		</svg>
	)
 };

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
