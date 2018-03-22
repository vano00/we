import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {

	static propTypes = {
		onClose: PropTypes.func.isRequired,
		show: PropTypes.bool,
		children: PropTypes.node
	};

	render() {
		const {
		onClose,
		children
		} = this.props;

		return (
			<div className="backdrop">
				<div className="modal">
				{children}
					<div className="footer">
						<button onClick={onClose}>
							Close
						</button>
					</div>
				</div>
			</div>
		);
	}
}
