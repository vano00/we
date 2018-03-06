import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Webcam extends Component {
    static propTypes = {
      name: PropTypes.string,
      place: PropTypes.string,
      url: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    };

    render() {
        return (
            <div>{ this.props.name }</div>
        );
    }
}
