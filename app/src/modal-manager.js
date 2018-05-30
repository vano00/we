import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

class ModalManager {

	static instance = null;

	static forge() {
		if (this.instance === null) {
			this.instance = new this();
		}
		return this.instance;
	}

	static show(content, type) {
		if (this.instance !== null) {
			this.instance.show(content, type);
		}
		return this;
	}

	static hide() {
		if (this.instance !== null) {
			this.instance.hide();
		}
		return this;
	}

	container = null;
	shown = false;
	content = null;
	type = null;

	constructor() {
		this.hide = this.hide.bind(this);
	}

	setContainer(container) {
		this.container = container;
	}

	show(content, type) {
		this.content = content;
		this.type = type;
		this.shown = true;
		this.render();
	}

	hide() {
		this.content = null;
		this.shown = false;
		this.render();
	}

	updateContent(content) {
		this.content = content;
	}

	render() {
		if(this.container) {
			ReactDOM.render((
				<Modal
					show={this.shown}
					content={this.content}
					onClose={this.hide}
				/>
			), this.container);
		}
		else {
			return null;
		}
	}
}

export default ModalManager;
