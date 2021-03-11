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

export const AxisRightScatter = ({y2Scale, innerHeight, innerWidth, yAxisLabel="No label"}) => 
y2Scale.ticks().map(tickValue =>  (
    <>
    <g className="leftlabels">
    <text 
        key={tickValue}
        style={{textAnchor:'end'}} 
        x={innerWidth+40} 
        dy=".32em"
        y={y2Scale(tickValue)}
    >
        {tickValue}
    </text>
    </g>
    <text
        className="axis-lavel"
        transform={`translate(${innerWidth+70}, ${innerHeight/1.4}) rotate(-90)`}
        >
        {yAxisLabel}    
    </text>
    </>
));

export const AxisLeftScatter = ({yScale, innerHeight, yAxisLabel="No label"}) => 
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
        transform={`translate(-100, ${innerHeight/1.2}) rotate(-90)`}
        >
        {yAxisLabel.split(" ").length < 5 ? 
            yAxisLabel : 
            yAxisLabel.split(" ").slice(0,4).join(" ")+"\n"+yAxisLabel.split(" ").slice(4).join(" ")}    
    </text>
    </>
));