export const FaceContainer = ({children,width,height,centerX,centerY}) => (
    
    <svg width={width} height={height}>
      {/*grouping element*/}
      <g transform={`translate(${centerX},${centerY})`}>
        {children}
      </g>
    </svg>
  );