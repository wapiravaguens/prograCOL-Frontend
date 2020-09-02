import React from 'react';
import './spinner.styles.css';

const Spinner = () => {
	return (
		<div className="row justify-content-md-center">
			<div className="lds-facebook"><div></div><div></div><div></div></div>
		</div>
	);
}

export default Spinner;