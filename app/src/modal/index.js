import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {

	static propTypes = {
		onClose: PropTypes.func.isRequired,
		show: PropTypes.bool,
		content: PropTypes.node
	};

	render() {
		if(!this.props.show) {
			return null;
		}

		const {
		onClose,
		content
		} = this.props;

		return (
			<div className="backdrop">
				<div className="modal">
				{content}
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
