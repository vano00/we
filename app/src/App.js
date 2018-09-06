import React, { Component } from 'react';
import './App.css';
import MyMap from './my_map';
import ModalManager from './modal-manager';

class App extends Component {

	constructor(props) {
		super(props);
		this.mapRef = null;
		this.modalContent = null;
		this.pullClass = null;
		this.headerClass = null;
		this.saveMapRef = this.saveMapRef.bind(this);
		this.saveModalContainerRef = this.saveModalContainerRef.bind(this);
		this.modalManager = ModalManager.forge();
		this.toggleMenu = this.toggleMenu.bind(this);
		this.state = {
			menuOpen: false,
		};
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

	onClick = () => {
		this.mapRef.locateMe()
	}

	saveMapRef(ref) {
		this.mapRef = ref;
	}

	saveModalContainerRef(ref) {
		this.modalManager.setContainer(ref);
	}

	render() {
		return (
			<div className="content">
				<div id="pullContainer">
					<span className={this.pullClass} onClick={this.toggleMenu} id="pull"></span>
				</div>
				<header className={this.headerClass}>
					<button onClick={this.onClick}>Locate me!</button>
				</header>
				<main>
					<MyMap ref={this.saveMapRef} />
				</main>
				<div ref={this.saveModalContainerRef}></div>
			</div>
		);
	}
}

export default App;
