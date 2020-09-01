import React from 'react'
import './form-input.styles.css'

const FormInput = ({ handleChange, label, ...otherProps }) => {
	return (
		<div className='form-group'>
			<label for={label}>
				{label}
			</label>
			<input 
				className='form-control'
				onChange={handleChange}
				id={label}
				{...otherProps}	
			/>
		</div>
	)
}

export default FormInput;