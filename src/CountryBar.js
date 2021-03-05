import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import * as d3 from 'd3';

export const CountryBar = ({data, width, height, margin}) => {
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;
	//console.log(width);
    //console.log("data",data);
	const yValue = d => d.Country;
	const xValue = d => d.Population;

	const yScale = d3.scaleBand()
			.domain(data.map(yValue))
			.range([0,innerHeight])
			.padding(0.2);
		
	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data, xValue)])
		.range([0,innerWidth]);

	return (

		<g transform={`translate(${margin.left},${margin.top})`}>

			<AxisLeft yScale={yScale}/>
			<AxisBottom 
				xScale={xScale} 
				innerHeight={innerHeight}
				tickFormat={n => d3.format('.2s')(n).replace('G','B')}
			/>
			<text
                className="axis-lavel"
                x={innerWidth / 2 - 90}
                y={innerHeight + 35} 
                >
                Population
            </text>
			<Marks data={data} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue}/>
		</g>
	)
};