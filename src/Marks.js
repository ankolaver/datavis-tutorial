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

export const MarksFlower = ({data, xScale, yScale, xValue, yValue, colorScale, colorValue}) => 
    
    data.map(d => (
        <circle
            className="markflower"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={7}
            fill={colorScale(colorValue(d))}
        >
            <title>
                {d[Object.keys(d)[0]]}
                {"\n"}
                {"x = "}{format(',.3r')(xValue(d))}
                {"\n"}
                {"y = "}{format(',.3r')(yValue(d))}
            </title>
        </circle>
));


export const MarksStock = ({data, xScale, yScale, y2Scale, xValue, yValue, y2Value}) => {
    
    return (
        
        data.map(d => (
        <g className="marksstock">
        <path
            className="sppath"
            fill="none"
            d={line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(d3.curveNatural)(data)}
            />
        <circle
            className="marksstock"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            fill="#0e834e"
            r={3}
        ></circle>
        <circle
            className="marksstock"
            cx={xScale(xValue(d))}
            cy={y2Scale(y2Value(d))}
            fill="#E6842A"
            r={3}
        ></circle>
        <title>
            {"Year = "}{timeFormat("%B %Y")(xValue(d))}
            {"\n"}
            {"Price = "}{format(',.3r')(yValue(d))}
        </title>
        </g>
)) 
)

};
function findY(path, x) {
    var pathLength = path.getTotalLength()
    var start = 0
    var end = pathLength
    var target = (start + end) / 2
  
    // Ensure that x is within the range of the path
    x = Math.max(x, path.getPointAtLength(0).x)
    x = Math.min(x, path.getPointAtLength(pathLength).x)
  
    // Walk along the path using binary search 
    // to locate the point with the supplied x value
    while (target >= start && target <= pathLength) {
      var pos = path.getPointAtLength(target)
  
      if (Math.abs(pos.x - x) < 1) {
        return pos.y
      } else if (pos.x > x) {
        end = target
      } else {
        start = target
      }
      target = (start + end) / 2
    }
  };



export const MarksLabel = ({scaleDays, minDate, dataLength, xScale, yScale, mouseValue, innerWidth, innerHeight}) => {
    
    let spPrice = 0;
    let xPoint = 0;

    let xData = Math.round(((mouseValue-250)/innerWidth) * dataLength);
    
    const path = d3.select("[class='sppath']");

    const maxPrice = yScale.invert(0);
    const minPrice = yScale.invert(innerHeight);
    const scalePrice = maxPrice-minPrice;
    console.log(scalePrice);
    
    if ((xData>0) && (xData <= 268) && path.node()) {
        
        var currtime = xScale.invert(mouseValue-250)-minDate;
        //spPrice = getYValue(currtime,data);
        
        xPoint = (currtime)/scaleDays;
        xPoint = xPoint*innerWidth;
        
        spPrice = findY(path.node(),xPoint);
        spPrice = innerHeight-spPrice;
        spPrice = ((spPrice/innerHeight) * scalePrice) + minPrice;
        //const regex = new RegExp(`${xPoint} ((\d*.\d*))`);
        //const match = regex.exec(path.node().d);
        //console.log(path.class);
        //console.log(match);

    }
    
    return (
        <>
        <text
            className="axis-lavel"
            x={innerWidth / 2 - 90}
            y={innerHeight - 300} 
            >
            {spPrice}
        </text>
        <g className="tickmove" key={xPoint} transform={`translate(${xPoint},0)`}>
            <line y2={innerHeight} stroke="orange" />
        </g>
        
        </>
)};