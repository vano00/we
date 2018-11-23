import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import './App.css';
import ModalManager from './modal-manager';
import MyMap from './my_map';
import Nav from './nav';
import Utils from './helpers/utils';

class App extends Component {

	constructor(props) {
		super(props);
		this.mapRef = null;
		this.modalContent = null;
		this.saveMapRef = this.saveMapRef.bind(this);
		this.saveModalContainerRef = this.saveModalContainerRef.bind(this);
		this.modalManager = ModalManager.forge();
	}

	state = {
		userIsLogged: Utils.isUserLogged()
	}

	componentDidMount() {
		this.renderNav();
	}

	saveMapRef(ref) {
		this.mapRef = ref;
	}

	renderNav() {
		const nav = (
			<Nav map={this.mapRef} />
		)
		ReactDOM.render(nav, document.getElementById('header'));
	}

	saveModalContainerRef(ref) {
		this.modalManager.setContainer(ref);
	}

	render() {
		return (
			<div className="webcams-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
				<div id="header"/>
				<main>
					<MyMap ref={this.saveMapRef} />
				</main>
				<div ref={this.saveModalContainerRef}></div>
			</div>
		);
	}
}

export default App;
