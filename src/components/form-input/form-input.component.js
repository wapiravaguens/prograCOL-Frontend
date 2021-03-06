import React from 'react'
import './form-input.styles.css'

const FormInput = ({ handleChange, label, ...otherProps }) => {
	return (
		<div className='form-group'>
			<label htmlFor={label}>
				{label}
			</label>
			<input 
				className='form-control'
				id={label}
				{...otherProps}	
			/>
		</div>
	)
}

export default FormInput;