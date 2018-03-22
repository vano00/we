import React, { Component } from 'react';
import './App.css';
import Map from './map';

class App extends Component {

	constructor() {
		super();
		this.saveMapRef = this.saveMapRef.bind(this);
	}

	onClick = () => {
		this.mapRef.locateMe()
	}

	saveMapRef(ref) {
		this.mapRef = ref;
	}

	render() {
		return (
			<div className="content">
				<header>
					<button onClick={this.onClick}>Locate me!</button>
				</header>
				<main>
					<Map ref={this.saveMapRef} />
				</main>
			</div>
		);
	}
}

export default App;
