import React from 'react';
import './login.styles.css';

// Components
import FormInput from '../form-input/form-input.component';

// Service
import { request } from '../../service/API';

class Login extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			username: "",
			password: "",
			error: false,
		}
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit = async event => {
		event.preventDefault();
		const	{ username, password } = this.state;
		try {
			const response = await request('user', 'post', 'auth', JSON.stringify({ 'username': username, 'password': password }))
			localStorage.setItem("token", response.data.Authorization);
			window.location.href = "/dashboard";
		} catch (error) {
			this.setState({ error: true });
		}
	};


	render() {
		const	{ username, password, error} = this.state;
		return (
				<div className='login'>
					<div className="login__title">Iniciar Sesión</div>
					{ error ? <div className="alert alert-warning" role="alert">Usuario o Contraseña incorrecta.</div> : null }
					<form onSubmit={this.handleSubmit}>
						<FormInput 
							name='username'  
							type='text' 
							value={username} 
							onChange={this.handleChange}
							label='Usuario'
							required 
						/>
						<FormInput 
							name='password'  
							type='password' 
							value={password} 
							onChange={this.handleChange}
							label='Contraseña'
							required 
						/>
						<button type='submit' className='btn btn-primary btn-lg btn-block'>Iniciar Sesion</button>
					</form>
				</div>		
		);
	}
}

export default Login;