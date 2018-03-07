import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Webcam extends Component {
    static propTypes = {
      name: PropTypes.string,
      loc: PropTypes.string,
      url: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    };

    render() {
        return (
            <div>{ this.props.name }</div>
        );
    }
}
