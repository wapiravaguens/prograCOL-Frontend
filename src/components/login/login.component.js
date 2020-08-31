import React from 'react';
import './login.styles.css';

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
	};
	
	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		const	{ username, password } = this.state;
		return (
			<div>
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