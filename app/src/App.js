import React, { Component } from 'react';
import './App.css';
import Map from './map';
import ModalManager from './modal-manager';

class App extends Component {

	constructor(props) {
		super(props);
		this.mapRef = null;
		this.modalContent = null;
		this.saveMapRef = this.saveMapRef.bind(this);
		this.saveModalContainerRef = this.saveModalContainerRef.bind(this);
		this.modalManager = ModalManager.forge();
	}

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
				<header>
					<button onClick={this.onClick}>Locate me!</button>
					<button onClick={(e) => this.modalManager.show("sdsda")}>Show modal!</button>
				</header>
				<main>
					<Map ref={this.saveMapRef} />
				</main>
				<div ref={this.saveModalContainerRef}></div>
			</div>
		);
	}
}

export default App;
