import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from '../modal';

export default class Marker extends Component {

	constructor() {
		super();
		this.saveModalRef = this.saveModalRef.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.state = {
			modalIsOpen: false,
		}
	}

	componentDidMount() {
		this.renderMarker();
	}

	static propTypes = {
		position: PropTypes.object,
		map: PropTypes.object,
		google: PropTypes.object,
		label: PropTypes.string,
		infowindow: PropTypes.object,
		action: PropTypes.func
	};

	saveModalRef(ref) {
		this.modalRef = ref;
	}

	toggleModal() {
		this.setState({
			modalIsOpen: !this.state.modalIsOpen
		});
	}

	renderModal() {
		const height = (document.body.clientHeight*0.8)+'px';
		const width = (document.body.clientWidth*0.9)+'px';
		const modalContent = <iframe frameBorder="0" title={this.props.name} width={width} height={height} src={this.props.url}></iframe>
		const modal = 	<Modal show={this.state.modalIsOpen} ref={this.saveModalRef}
							onClose={this.toggleModal}>
							{modalContent}
						</Modal>;

		return (this.state.modalIsOpen ? modal : null )
	}

	renderMarker() {
		const {
			map,
			google,
			infowindow,
			position,
			location,
			name,
			url,
		} = this.props;

		const icon = {
			url: 'https://image.flaticon.com/icons/svg/149/149060.svg',
			scaledSize: new google.Size(40, 40),
		};

		const text = (<div><strong>{location}</strong> {name}<br /><button className="infowindowbutton" type="button" onClick={this.toggleModal}>{url}</button></div>);
		const infowindowcontainer = '<div id="infoWindow"></div>';

		const marker = new google.Marker({
			animation: google.Animation.DROP,
			position: position,
			map: map,
			icon: icon,
		})

		marker.addListener('click', function() {
			infowindow.setContent(infowindowcontainer);
			infowindow.open(map, marker);
			ReactDOM.render(text, document.getElementById('infoWindow'));
		});
	}

	render() {
		return this.renderModal();
	}
}
