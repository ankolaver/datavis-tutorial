export const AxisLeft = ({yScale}) => 
    yScale.domain().map(tickValue =>  (
        <g className="leftlabels">
        <text 
            key={tickValue}
            style={{textAnchor:'end'}} 
            x={-3} 
            dy=".32em"
            y={yScale(tickValue)+yScale.bandwidth()/2}
        >
            {tickValue}
        </text>
        </g>
    ));

export const AxisLeftFlower = ({yScale, innerHeight, yAxisLabel="No label"}) => 
yScale.ticks().map(tickValue =>  (
    <>
    <g className="leftlabels">
    <text 
        key={tickValue}
        style={{textAnchor:'end'}} 
        x={-10} 
        dy=".32em"
        y={yScale(tickValue)}
    >
        {tickValue}
    </text>
    </g>
    <text
        className="axis-lavel"
        transform={`translate(-60, ${innerHeight/2}) rotate(-90)`}
        >
        {yAxisLabel}    
    </text>
    </>
));