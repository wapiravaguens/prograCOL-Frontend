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
			password: ""
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
			alert(JSON.stringify(response.data));
			localStorage.setItem("token", response.data.Authorization);
		})
		.catch(error => {
			alert("Incorrect username or password");
		});
	};
	
	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		const	{ username, password } = this.state;
		return (
			<div>
				<div>Login</div>
				<form onSubmit={this.handleSubmit}>
					<FormInput 
						name='username'  
						type='text' 
						value={username} 
						onChange={this.handleChange}
						label='username'
						required 
					/>
					<FormInput 
						name='password'  
						type='password' 
						value={password} 
						onChange={this.handleChange}
						label='password'
						required 
					/>
					<button type='submit'>Login</button>
				</form>
			</div>
		);
	}
}

export default Login;