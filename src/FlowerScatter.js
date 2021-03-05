import { useState } from 'react'; 
import * as d3 from 'd3';
import { MarksFlower } from './Marks';
import { AxisLeftFlower } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import { Dropdown } from './Dropdown';

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
    const innerHeight = height - margin.top - margin.bottom - 300;
	const innerWidth = width - margin.left - margin.right;

    const initialxAttribute = 'petal_length';
    const [xAttribute, setXAttribute] = useState(initialxAttribute);
    const xValue = d => d[xAttribute];
    const xAxisLabel = 'Petal Length'

    const initialYAttribute = 'sepal_width';
    const [yAttribute, setYAttribute] = useState(initialYAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = getLabel(yAttribute);
    //.nice() make sure values end on suitable points
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data,xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerHeight]);

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
        <svg width={width} height={height+200}>
        <g transform={`translate(${margin.left},${margin.top})`}>
            
            <AxisBottom
                xScale={xScale}
                innerHeight={innerHeight}
                tickFormat={n => d3.format('.2s')(n).replace('G','B')}
            />
            <text
                className="axis-lavel"
                transform={`translate(-45, ${innerHeight/2}) rotate(-90)`}
                >
                Sepal Width
            </text>
            <AxisLeftFlower yScale={yScale}/>
            <text
                className="axis-lavel"
                x={innerWidth / 2 - 90}
                y={innerHeight + 40} 
                >
                Sepal Length
            </text>
            <MarksFlower
                data={data}
                xScale={xScale}
                yScale={yScale}
                xValue={xValue}
                yValue={yValue}
            />
        </g>
        </svg>
        </>
    )

};