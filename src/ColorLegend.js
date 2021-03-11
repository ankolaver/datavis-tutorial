export const ColorLegend = ({ colorScale,tickSpacing=10, tickSize=6, tickTextOffset=20, LegendTitle="Legend Title", onHover, hoveredValue, fadeOpacity=0.5}) => 
    colorScale.domain().map((domainValue, i) => (
        <>
        <g transform={i%2==0 ? `translate(0, ${i * tickSpacing})`: `translate(100, ${i * tickSpacing})`} 
            onMouseEnter={() => { onHover(domainValue)}} 
            onMouseOut={() => {onHover(null)}}
            opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}

        >
            <circle 
                fill={colorScale(domainValue)} 
                r={tickSize}
            />
            <text className="colorlegend" 
                x={ tickTextOffset } 
                dy=".2em">{domainValue}
            </text>
        </g>
        <text
            x={20}
            y={-35}
            className="axis-lavel"
            textAnchor="middle"
        >{LegendTitle}</text>  
        </>  
    ));
