import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ModalManager from '../modal-manager';
import Login from '../admin/login';

export default class Nav extends Component {

	static propTypes = {
		map: PropTypes.object,
	};

	onClick = () => {
		this.props.map.locateMe()
	}

	render() {
		return (
			<header className="webcams-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title">Webcams</span>
					<div className="mdl-layout-spacer"></div>
					<button  id="locate-me" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect" onClick={this.onClick}>
						<i className="material-icons">location_on</i>
					</button>
					<div className="mdl-tooltip" data-mdl-for="locate-me">
					Locate me
					</div>
					<button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
						<i className="material-icons">more_vert</i>
					</button>
					<ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
						<li className="mdl-menu__item" onClick={() => {
							ModalManager.show(<Login />);
						}}>Login</li>
					</ul>
				</div>
			</header>
		)
	}
}
