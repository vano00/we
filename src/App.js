import React, { Component } from 'react';

import './App.css';
import Layout from './containers/Layout/Layout';
import Map from './containers/Map/Map';

class App extends Component {
	render() {
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
				<Layout>
					<Map />
				</Layout>
			</div>
		);
	}
}

export default App;
