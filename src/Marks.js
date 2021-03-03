import {format} from 'd3';

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