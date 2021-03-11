import * as d3 from 'd3';
import React, { useState , useCallback , useMemo } from 'react';
import { MarksStock, MarksLabel} from './Marks';
import { AxisLeftScatter, AxisRightScatter } from './AxisLeft';
import { AxisBottom } from './AxisBottom';


export const TempLine = ({data, width, height, margin}) => {
        
    const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.Date;
    const yAxisLabel = "SP500-Percent";
    const yValue = d => d["SP500-Percent"];

    const y2Value = d => d["CPI-Percent"];
    const y2AxisLabel = "CPI-Percent";
    //.nice() make sure values end on suitable points
    const xScale = d3.scaleTime()
        .domain(d3.extent(data,xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight,0])
        .nice();
    
    const y2Scale = d3.scaleLinear()
        .domain(d3.extent(data, y2Value))
        .range([innerHeight,0])
        .nice();
        
    const dataLength = data.length;

    const initialMousePosition = { x: width/2, y: height/2 };
    const [mousePosition, setMousePosition] = useState(initialMousePosition);

    const handleMouseMove = useCallback(event => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
        
      }, [setMousePosition]);

    const maxDate = xScale.invert(innerWidth);
    const minDate = xScale.invert(0);
    const scaleDays = maxDate-minDate;

    return (
        <svg width={width} height={height} onMouseMove={handleMouseMove}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom
                    xScale={xScale}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                    tickFormat={n => d3.timeFormat("%Y")(n)}
                    xAxisLabel="Year"
                />
                <AxisLeftScatter yScale={yScale} innerHeight={innerHeight} yAxisLabel={yAxisLabel}/>
                {useMemo( () => (
                <MarksStock
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    y2Scale={y2Scale}
                    xValue={xValue}
                    yValue={yValue}
                    y2Value={y2Value}
                />
                ),[data, xScale, yScale, y2Scale])}
                <AxisRightScatter y2Scale={y2Scale} innerWidth={innerWidth} innerHeight={innerHeight} yAxisLabel={y2AxisLabel}/>
                <MarksLabel
                    scaleDays={scaleDays}
                    minDate={minDate}
                    dataLength={dataLength}
                    xScale={xScale}
                    yScale={yScale}
                    mouseValue={mousePosition.x}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                />
                <text
                    className="axis-lavel"
                    x={innerWidth / 2}
                    y={innerHeight + 90} 
                    >
                    S&P 500 Index
                </text>
            </g>
        </svg>
        
    )

};