import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Admin from './admin';
import ModalManager from './modal-manager';
import MyMap from './my_map';
import NavAdmin from './nav_admin';
import Nav from './nav';
import Utils from './helpers/utils';

class App extends Component {

	constructor(props) {
		super(props);
		this.mapRef = null;
		this.modalContent = null;
		this.pullClass = null;
		this.headerClass = null;
		this.saveMapRef = this.saveMapRef.bind(this);
		//this.renderNav = this.renderNav.bind(this);
		this.saveModalContainerRef = this.saveModalContainerRef.bind(this);
		this.modalManager = ModalManager.forge();
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	state = {
		menuOpen: false,
		userIsLogged: Utils.isUserLogged()
	}

	componentDidMount() {
		this.renderNav();
	}

	toggleMenu() {
		if (this.pullClass === 'movePullDown' & this.headerClass === 'openHeader') {
			this.pullClass = "movePullUp";
			this.headerClass = "closeHeader";
		} else {
			this.pullClass = "movePullDown";
			this.headerClass = "openHeader";
		}
		const currentState = this.state.menuOpen;
		this.setState({ menuOpen: !currentState });
	};

	saveMapRef(ref) {
		this.mapRef = ref;
	}

	renderNav() {
		const nav = (
			<Router>
				<div>
					<Route
						render={(props) => <Nav {...props} map={this.mapRef} />}
						exact path="/"
					/>
					<Route
						render={(props) => <NavAdmin {...props} userIsLogged={this.state.userIsLogged}/>}
						exact path="/admin"
					/>
				</div>
			</Router>
		)
		ReactDOM.render(nav, document.getElementsByTagName('header')[0]);
	}

	saveModalContainerRef(ref) {
		this.modalManager.setContainer(ref);
	}

	render() {
		return (
			<Router>
				<div className="content">
					<div id="pullContainer">
						<span className={this.pullClass} onClick={this.toggleMenu} id="pull"></span>
					</div>
					<header className={this.headerClass} />
						<main>
							<Route
								render={(props) => <MyMap {...props} ref={this.saveMapRef} />}
								exact path="/"
							/>
							<Route
								render={(props) => <Admin {...props} userIsLogged={this.state.userIsLogged}/>}
								exact path="/admin"
							/>
						</main>
					<div ref={this.saveModalContainerRef}></div>
				</div>
			</Router>
		);
	}
}

export default App;
