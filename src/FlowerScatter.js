import { useState } from 'react'; 
import * as d3 from 'd3';
import { MarksFlower } from './Marks';
import { AxisLeftFlower } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import { Dropdown } from './Dropdown';
import { ColorLegend } from './ColorLegend';

const attributes = [
    { value:'sepal_length', label:'Sepal Length'},
    { value:'sepal_width', label:'Sepal Width'},
    { value:'petal_length', label:'Petal Width'},
    { value:'petal_width', label:'Petal Width'},
    { value:'species', label:'Species'}
];

const getLabel = value => {
    for(let i = 0; i < attributes.length; i++){
      if(attributes[i].value === value){
        return attributes[i].label;
      }
    }
  };

export const FlowerScatter = ({data, width, height, margin}) => {
    const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

    const initialxAttribute = 'petal_length';
    const [xAttribute, setXAttribute] = useState(initialxAttribute);
    const xValue = d => d[xAttribute];
    const xAxisLabel = getLabel(xAttribute);

    const initialYAttribute = 'sepal_width';
    const [yAttribute, setYAttribute] = useState(initialYAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = getLabel(yAttribute);
    
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data,xValue))
        .range([0, innerWidth])
        .nice();
    //.nice() make sure values end on suitable points
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerHeight]);

    const colorValue = d => d.species;
    // give range of 3 colors to use
    const colorScale = d3.scaleOrdinal()
        .domain(data.map(colorValue))
        .range(['#5C8100','#F6B656','#B396AD']);

    const [hoveredValue, setHoveredValue] = useState(null);
    const filteredData = data.filter(d => hoveredValue === colorValue(d))
    return (
        <>
        <label for="x-select">X:</label>
        <Dropdown
            options={attributes}
            id="x-select"
            selectedValue={xAttribute}
            onSelectedValueChange={setXAttribute}
        />
        <label for="y-select">Y:</label>
        <Dropdown
            options={attributes}
            id="y-select"
            selectedValue={yAttribute}
            onSelectedValueChange={setYAttribute}
        />
        <svg width={width+200} height={height+50}>
        
        <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
                xScale={xScale}
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                tickFormat={n => d3.format('.2s')(n).replace('G','B')}
                xAxisLabel={xAxisLabel}
            />
            <AxisLeftFlower yScale={yScale} innerHeight={innerHeight} yAxisLabel={yAxisLabel}/>
            
            <g transform={`translate(${innerWidth + 60}, 60)`}>
                <ColorLegend
                    colorScale={colorScale}
                    LegendTitle="Species"
                    onHover={setHoveredValue}
                    hoveredValue={hoveredValue}
                />                       
            </g>
            {/*if hovered 0.2  else 1*/}
            <g opacity={hoveredValue ? 0.2 : 1}>
                <MarksFlower
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    colorScale={colorScale}
                    colorValue={colorValue}
                    
                />
            </g>
            <MarksFlower 
                data={filteredData}
                xScale={xScale}
                yScale={yScale}
                xValue={xValue}
                yValue={yValue}
                colorScale={colorScale}
                colorValue={colorValue}
            />
        </g>
        </svg>
        </>
    )
};