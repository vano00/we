import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';

import Login from './login';

export default class Admin extends Component {

	static propTypes = {
		userIsLogged: PropTypes.bool,
	};

	render() {
		return (
			<Router>
				<div>
					<Route
						render={props =>
							this.props.userIsLogged ? (
								<div>
									Hello Admin
								</div>
							) : (
								<Login />
							)
						}
					/>
				</div>
			</Router>
		)
	}
}
