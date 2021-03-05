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

export const AxisLeftFlower = ({yScale}) => 
yScale.ticks().map(tickValue =>  (
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
));