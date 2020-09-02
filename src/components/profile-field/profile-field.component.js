import React from 'react';
import './profile-field.styles.css';

const ProfileField = ({ icon, name, value }) => {
	return (
		<div className="profile-field row">
			<div className="col-2">
				<ion-icon name={icon}></ion-icon>
			</div>
			<div className="col-10">
				<div className="profile-field__name"> {name}</div>
				<div className="profile-field__value">{value}</div>
			</div>
		</div>
	);
}

export default ProfileField;