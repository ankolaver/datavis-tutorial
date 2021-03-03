import React, { useState, useCallback, useEffect } from 'react';
import { csv, scaleBand, scaleLinear, max, range } from 'd3';
import * as d3 from 'd3';


const width = 160;
const height = 160;

const circleX = width / 2;
const circleY = height / 2;
const circleRadius = 30/4;

const initialMousePosition = { x: width/2, y: height/2};
const [mousePosition, setMousePosition] = useState(initialMousePosition);

//use callBack not re-rendered
const handleMouseMove = useCallback(event => {
    //extract from json event object
    const { clientX, clientY } = event;
    //console.log({ x:clientX, y:clientY });
    setMousePosition({ x: clientX, y: clientY });
}, [setMousePosition]);

const App = () => {
    return (
        
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
        
        <svg width={width} height={height} onMouseMove={handleMouseMove}>
            <circle
                cx={mousePosition.x}
                cy={mousePosition.y}
                r={circleRadius}
            />
        </svg>
    )
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;