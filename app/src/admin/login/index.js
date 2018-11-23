import React, { Component } from 'react';

import Utils from '../../helpers/utils';

export default class Login extends Component {

	state = {
		email: 'vano@lesgros.com',
		password: '12345678',
	};

	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
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
		this.handleLogIn();
	}

	handleLogIn(){
		const {
			email,
			password,
		} = this.state;

		fetch('http://localhost:8000/api/auth/login/', {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			headers: {
			'Content-Type': 'application/json',
			}
		})
		.then(Utils.handleErrors)
		.then(result=> {
			return result.json();
		}).then(data => {
			localStorage.setItem('token', data.token);
		})
		.catch(error => console.log(error) );
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="mdl-textfield mdl-js-textfield">
						<input
							className="mdl-textfield__input"
							name="email"
							type="text"
							id="email"
							onChange={this.handleInputChange}
						/>
						<label
							className="mdl-textfield__label"
							htmlFor="email"
						>
							Email:
						</label>
					</div>
					<br />
					<div className="mdl-textfield mdl-js-textfield">
						<input
							className="mdl-textfield__input"
							name="password"
							type="password"
							id="password"
							onChange={this.handleInputChange}
						 />
						<label
							className="mdl-textfield__label"
							htmlFor="password"
						>
							Password:
						</label>
					</div>
					<br />
					<input
						className="mdl-button mdl-js-button mdl-button--raised"
						type="submit"
						value="Submit"
					 />
				</form>
			</div>
		);
	}
}
