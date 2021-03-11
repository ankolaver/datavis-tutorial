import React from 'react';
import './App.sass';

export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
	<div class="select is-info is-rounded">
	<select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
		{options.map(value => (
			<option value={value} selected={value === selectedValue}>
				{value}
			</option>
			
		))}
	</select>
	</div>
)

