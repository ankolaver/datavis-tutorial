import * as d3 from 'd3';
import { MarksFlower } from './MarksFlower';
import { AxisLeftFlower } from './AxisLeftFlower';
import { AxisBottom } from './AxisBottom';

export const FlowerScatter = ({data}) => {
    const width = 160*5.5;
	const height = 160*4;
    const margin = {top:20, right:20, bottom:40, left: 250};
    
    const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.sepal_length;
    const yValue = d => d.sepal_width;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data,xValue))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerHeight]);

    return (
        <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={n => d3.format('.2s')(n).replace('G','B')}
            />
            <AxisLeftFlower yScale={yScale}/>
            <MarksFlower
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            />
        </g>
        
    )

};