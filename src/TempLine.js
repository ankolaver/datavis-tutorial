import * as d3 from 'd3';
import { MarksStock} from './Marks';
import { AxisLeftFlower } from './AxisLeft';
import { AxisBottom } from './AxisBottom';

export const TempLine = ({data, width, height, margin}) => {
        
    const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

    //const xValue = d => d.timestamp;
    //const yValue = d => d.temperature;
    const xValue = d => d.Date;
    const yAxisLabel = "Price"
    const yValue = d => d.SP500;

    //.nice() make sure values end on suitable points
    const xScale = d3.scaleTime()
        .domain(d3.extent(data,xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight,0])
        .nice();

    return (
        <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
                xScale={xScale}
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                tickFormat={n => d3.timeFormat("%Y")(n)}
                xAxisLabel="Year"
            />
            <AxisLeftFlower yScale={yScale} innerHeight={innerHeight} yAxisLabel={yAxisLabel}/>
            <MarksStock
                data={data}
                xScale={xScale}
                yScale={yScale}
                xValue={xValue}
                yValue={yValue}
            />
            <text
                className="axis-lavel"
                x={innerWidth / 2}
                y={innerHeight + 90} 
                >
                S&P 500 Index
            </text>
        </g>
        
    )

};