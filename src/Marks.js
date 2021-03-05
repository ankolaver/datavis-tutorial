import {format, timeFormat, line} from 'd3';
import * as d3 from 'd3';

export const Marks = ({data, xScale, yScale, xValue, yValue}) => 
    data.map(d => (
        <rect
            className="mark"
            key={yValue(d)}
            x={0}
            y={yScale(yValue(d))}
            width={xScale(xValue(d))}
            height={yScale.bandwidth()}
        >
            <title>{format(',.6r')(xValue(d))}</title>
        </rect>
));

export const MarksFlower = ({data, xScale, yScale, xValue, yValue}) => 
    data.map(d => (
        <circle
            className="mark"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={5}
        >
            <title>
                {"x = "}{format(',.3r')(xValue(d))}
                {"\n"}
                {"y = "}{format(',.3r')(yValue(d))}
            </title>
        </circle>
));


export const MarksStock = ({data, xScale, yScale, xValue, yValue}) => 
    data.map(d => (
        <g className="markline">
        <path
            fill="none"
            d={line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(d3.curveNatural)(data)}
        />
        <circle
            className="mark"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={3}
        >
            <title>
                {"Year = "}{timeFormat("%B %Y")(xValue(d))}
                {"\n"}
                {"Price = "}{format(',.3r')(yValue(d))}
            </title>
        </circle>
        </g>
));