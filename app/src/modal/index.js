import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {

	static propTypes = {
		onClose: PropTypes.func.isRequired,
		show: PropTypes.bool,
		content: PropTypes.node
	};

	componentDidMount() {
		this.manageResize();
	}

	componentDidUpdate(prevProps, prevState) {
		this.manageResize();
	}

	manageResize(props = this.props) {
		const {
			content = {}
		} = props;

		const {
			type
		} = content || {};

		if (type === "img") {
			this.resizeModal();
		}
	}

	resizeModal() {
		const modalEl = document.getElementById("modal");
		const imgEl = document.getElementById("modalImg");
		imgEl.onload = function(){
			const width = imgEl.width + "px";
			modalEl.style.width = width;
		}
	}

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
				<div id="modal">
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
