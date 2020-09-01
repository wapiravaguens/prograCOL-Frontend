import React from 'react';
import './profile.styles.css';

// axios
import axios from 'axios';

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			userData: undefined,
		}
	}

	componentDidMount() {
		var config = {
			method: 'get',
			url: 'https://java.bocetos.co/userred-0.0.1-SNAPSHOT/myprofile',
			headers: { 
				'content-type': 'application/json',
				'Authorization': localStorage.getItem('token'),
			}
		};
		
		axios(config)
		.then(response => {
			// alert(JSON.stringify(response.data));
			this.setState({ userData: response.data.data, loading: false});
		})
		.catch(function (error) {
			alert(error);
		});
	}

	render() {
		if (this.state.loading) {
			return(
				<div>...Loading</div>
			);
		} else {
			const { names, lastNames, username, rolDTO, createdAt} = this.state.userData;
			alert(JSON.stringify(this.state.userData));
			return(
				<div>
					<div>{names}</div>
					<div>{lastNames}</div>
					<div>{username}</div>
					<div>{rolDTO.name}</div>
					<div>{createdAt}</div>
				</div>
			);
		}
	}
}

export default Profile;