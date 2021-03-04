import {format} from 'd3';

export const MarksFlower = ({data, xScale, yScale, xValue, yValue}) => 
    data.map(d => (
        <circle
            className="mark"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={5}
        >
        </circle>
));