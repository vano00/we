import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Marker extends Component {

	componentDidMount() {
		this.renderMarker();
	}

	static propTypes = {
		position: PropTypes.object,
		map: PropTypes.object,
		google: PropTypes.object,
		label: PropTypes.string,
        infowindow: PropTypes.object
	};

	renderMarker() {
		const {
			map,
			google,
			infowindow,
			position,
			location,
			name,
			url
		} = this.props;

		const icon = {
			url: 'https://image.flaticon.com/icons/svg/149/149060.svg',
			scaledSize: new google.Size(40, 40),
		};

		const text = '<strong>' + location + '</strong> (' + name + ')<br /><a href="' + url + '">' + url + '</a>';

		const marker = new google.Marker({
			animation: google.Animation.DROP,
			position: position,
			map: map,
			icon: icon,
		})

		marker.addListener('click', function() {
			infowindow.setContent(text);
			infowindow.open(map, marker);
		});
	}

	render() {
		return null;
	}
}
