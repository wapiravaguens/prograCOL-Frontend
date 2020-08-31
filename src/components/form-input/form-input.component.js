import React from 'react'
import './form-input.styles.css'

const FormInput = ({ handleChange, label, ...otherProps }) => {
	return (
		<div>
			{ label ? <label>{label}</label> : null }
			<input 
				onChange={handleChange}
				{...otherProps}	
			/>
		</div>
	)
}

export default FormInput;