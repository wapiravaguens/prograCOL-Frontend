import React from 'react';
import './profile-field.styles.css';

const ProfileField = ({ name, value }) => {
	return (
		<div className="profile-field">
			<div className="profile-field__name">{name}</div>
			<div className="profile-field__value">{value}</div>
		</div>
	);
}

export default ProfileField;