import React, {Component} from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	render () {
		return (
			<React.Fragment>
				<Toolbar />
				<SideDrawer />
				<main>
					{this.props.children}
				</main>
			</React.Fragment>
		)
	}
}

export default Layout;
