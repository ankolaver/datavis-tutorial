import { useState } from 'react'; 
import * as d3 from 'd3';
import { MarksFlower } from './Marks';
import { AxisLeftScatter } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import { Dropdown } from './Dropdown';
import { ColorLegend } from './ColorLegend';
import { range } from 'd3';
/*
const attributes = [
    { value:'Land use change Kg CO2', label:'Land use change Kg CO2'},
    { value:'Animal Feed Kg CO2', label:'Animal Feed Kg CO2'},
    { value:'Farm Kg CO2', label:'Farm Kg CO2'},
    { value:'Processing Kg CO2', label:'Processing Kg CO2'},
    { value:'Transport Kg CO2', label:'Transport Kg CO2'}
];
*/
/*
const getLabel = value => {
    for(let i = 0; i < attributes.length; i++){
      if(attributes[i].value === value){
        return attributes[i].label;
      }
    }
  };
*/
const getLabel = value => {
    /*
    let head = value.split("per")[0];
    let units = /\((.*?)\)/.exec(value);
    console.log(head);
    return head + units*/
    return value;
}

export const FlowerScatter = ({data, width, height, margin}) => {
    
    let attributes = data.columns;
    console.log(attributes);
    const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

    const initialxAttribute = 'Processing Kg CO2';
    const [xAttribute, setXAttribute] = useState(initialxAttribute);
    const xValue = d => d[xAttribute];
    const xAxisLabel = getLabel(xAttribute);

    const initialYAttribute = 'Transport Kg CO2';
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
        .range([0, innerHeight]).nice();

    const colorValue = d => d["Food product"];
    // give range of 3 colors to use
    /*
    const colorScale = d3.scaleOrdinal()
        .domain(data.map(colorValue))
        .range(['#5C8100','#F6B656','#B396AD']);
    */
    //create the color range of values
    let colorRange = [];
    for (let i=0; i<data.length; i++) {
        let val = (1/data.length)*i;
        colorRange.push(d3.interpolateTurbo(val));
    } 

    //map to a color scale
    const colorScale = d3.scaleOrdinal()
        .domain(data.map(colorValue))
        .range(colorRange);
        
    // use react hook to exclude hovered values
    const [hoveredValue, setHoveredValue] = useState(null);
    const filteredData = data.filter(d => hoveredValue === colorValue(d))
    return (
        <>
        <div class="columns is-desktop">
            <div class="column is-half">
                <label class="title is-5" for="x-select">X Axis Variable:</label>
                <Dropdown
                    options={attributes}
                    id="x-select"
                    selectedValue={xAttribute}
                    onSelectedValueChange={setXAttribute}
                />
            </div>
            <div class="column is-half">
                <label class="title is-5" for="y-select">Y Axis Variable:</label>
                <Dropdown
                    options={attributes}
                    id="y-select"
                    selectedValue={yAttribute}
                    onSelectedValueChange={setYAttribute}
                />
            </div>
        </div>
        <svg width={width} height={height}>
        
        <g transform={`translate(${margin.left - 200},${margin.top})`}>
            <AxisBottom
                xScale={xScale}
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                tickFormat={n => n}
                xAxisLabel={xAxisLabel}
            />
            <AxisLeftScatter yScale={yScale} innerHeight={innerHeight} yAxisLabel={yAxisLabel}/>
            
            <g transform={`translate(${innerWidth + 60}, 60)`}>
                <ColorLegend
                    colorScale={colorScale}
                    LegendTitle="Species"
                    onHover={setHoveredValue}
                    hoveredValue={hoveredValue}
                />                       
            </g>
            {/*if hovered 0.2  else 1*/}
            <g opacity={hoveredValue ? 0.2 : 0.6}>
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