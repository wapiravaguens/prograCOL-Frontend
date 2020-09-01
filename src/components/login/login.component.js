import React from 'react';
import './login.styles.css';

// axios
import axios from 'axios';

// Components
import FormInput from '../form-input/form-input.component';

class Login extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			error: false,
		}

	}

	handleSubmit = event => {
		event.preventDefault();
		const	{ username, password } = this.state;

		const data = JSON.stringify({
			"username": username,
			"password": password,
		});

		const config = {
			method: 'post',
			url: 'https://java.bocetos.co/userred-0.0.1-SNAPSHOT/auth',
			headers: { 
				"content-type": "application/json",
			},
			data : data
		};

		axios(config)
		.then(response => {
			localStorage.setItem("token", response.data.Authorization);
			window.location.href = "/dashboard";
		})
		.catch(error => {
			this.setState({error: true});
		});
	};
	
	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		const	{ username, password, error} = this.state;
		return (
			<div className="login">
				<div className='login__container'>
					<div className="login__title">Login</div>
					{ error ? <div className="alert alert-warning" role="alert">Incorrect username or password.</div> : null }
					<form onSubmit={this.handleSubmit}>
						<FormInput 
							name='username'  
							type='text' 
							value={username} 
							onChange={this.handleChange}
							label='Username'
							required 
						/>
						<FormInput 
							name='password'  
							type='password' 
							value={password} 
							onChange={this.handleChange}
							label='Password'
							required 
						/>
						<button type='submit' className='btn btn-primary btn-lg btn-block'>Login</button>
					</form>
				</div>		
			</div>
		);
	}
}

export default Login;