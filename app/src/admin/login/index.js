import React, { Component } from 'react';

export default class Login extends Component {

	state = {
		email: null,
		password: null
	};

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.handleLogin();
	}

	handleLogin(){
		const {
			email,
			password,
		} = this.state;

		fetch('http://localhost:8000/api/auth/login/', {
			method: 'POST',
			body: JSON.stringify({
			email: email,
			password: password,
			}),headers: {
			'Content-Type': 'application/json',
			}
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Email:
					<input
					name="email"
					type="text"
					onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					Password:
					<input
					name="password"
					type="password"
					onChange={this.handleInputChange}/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
