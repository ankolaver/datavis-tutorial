export const ColorLegend = ({ colorScale,tickSpacing=30, tickSize=8, tickTextOffset=20, LegendTitle="Legend Title", onHover, hoveredValue, fadeOpacity=0.5}) => 
    colorScale.domain().map((domainValue, i) => (
        <>
        <g transform={`translate(0, ${i * tickSpacing})`} 
            onMouseEnter={() => { onHover(domainValue)}} 
            onMouseOut={() => {onHover(null)}}
            opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}

        >
            <circle fill={colorScale(domainValue)} r={tickSize}/>
            <text className="colorlegend" x={tickTextOffset} dy=".32em">{domainValue}</text>
        </g>
        <text
            x={35}
            y={-25}
            className="axis-lavel"
            textAnchor="middle"
        >{LegendTitle}</text>  
        </>  
    ));
