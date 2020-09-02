import React from 'react';
import './profile.styles.css';

// Service
import { authorizedRequest } from '../../service/API';

// Components
import ProfileField from '../../components/profile-field/profile-field.component';
import Spinner from '../../components/spinner/spinner.component';

// Alerts
import Swal from 'sweetalert2'

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			userData: undefined,
		}
	}

	async componentDidMount() {
		try {
			const response = await authorizedRequest('get', 'myprofile');
			this.setState({ userData: response.data.data, loading: false });
		} catch (error) {
			Swal.fire({ icon: 'error', title: 'Oops...', text: 'Error de autenticación',})
			.then(result => { 
				if (result.value) window.location.href = "/";
			})
		}
	}

	render() {
		if (this.state.loading) {
			return <Spinner />
		} else {
			const { names, lastNames, username, rolDTO, createdAt } = this.state.userData;
			return (
				<div className='profile'>
					<div className='profile__box'>
						<div className='profile__image'>
							<img src={require(`../../assets/images/user.jpg`)} alt='user' width="270px" />
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