import React from 'react';
import './profile.styles.css';

// axios
import axios from 'axios';

// Components
import ProfileField from '../../components/profile-field/profile-field.component';

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
			const { names, lastNames, username, rolDTO, createdAt } = this.state.userData;
			return(
				<div className='container-fluid'>
					<div className='profile__box'>
						<div className='profile__image'>
							<img src={require(`../../assets/images/user.jpg`)} alt='user' width="300px" />
						</div>
						<div className='profile__data'>
								<ProfileField name='Nombre' value={names}/>
								<ProfileField name='Apellidos' value={lastNames}/>
								<ProfileField name='Nombre de usuario' value={username}/>
								<ProfileField name='Rol' value={rolDTO.name}/>
								<ProfileField name='Fecha de creación' value={new Intl.DateTimeFormat("es-MX", {
									year: "numeric",
									month: "long",
									day: "2-digit"
								}).format(new Date(createdAt))} 
								/>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Profile;