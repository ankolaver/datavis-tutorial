export const AxisBottom = ({ xScale, innerWidth, innerHeight, tickFormat, xAxisLabel="No Label"}) => 
    
    xScale.ticks().map(tickValue =>  (
        <>
        <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke="black" />
            <text 
                style={{ textAnchor:'middle' }} 
                dy=".71em" 
                y={innerHeight}
            >
                {tickFormat(tickValue)}
            </text>
        </g>
        <text
            className="axis-lavel"
            x={innerWidth / 2 - 90}
            y={innerHeight + 50} 
            >
            {/* if-else ternary expression */}
            {xAxisLabel.split(" ").length < 5 ? 
            xAxisLabel : 
            xAxisLabel.split(" ").slice(0,4).join(" ")+"\n"+xAxisLabel.split(" ").slice(4).join(" ")}
        </text>
        </>
));

