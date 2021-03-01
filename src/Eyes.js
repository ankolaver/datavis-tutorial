export const Eyes = ({eyeOffsetX, eyeOffsetY, eyeRadius}) => (
	<>
	<circle
		cx={-eyeOffsetX}
		cy={-eyeOffsetY}
		r={eyeRadius}
	/>
	<circle
		cx={eyeOffsetX}
		cy={-eyeOffsetY}
		r={eyeRadius}
	/>
	{/*<circle = 
		stroke-width={strokeWidth}
	  />
	  <rect 
	  x="-190" 
	  y="-170"
	  rx="30" 
	  ry="30" 
	  width={centerY*1.7}
	  height={centerY*1.7}
	  opacity="0.5"
	  fill="green"
	  />
	  */}
	</>

);
