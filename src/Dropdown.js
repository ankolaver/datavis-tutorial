import React from 'react';
import './App.sass';

export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
	<div class="select is-info is-rounded">
	<select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
		{options.map(({value,label}) => (
			<option value={value} selected={value === selectedValue}>
				{label}
			</option>
			
		))}
	</select>
	</div>
)

