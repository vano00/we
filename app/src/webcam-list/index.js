import React, { Component } from 'react';
import Webcam from '../webcam';

export default class WebcamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            webcam: []
        };
    }

    componentWillMount() {
        this.WebcamList();
    }

    WebcamList() {
        return fetch('http://localhost:8000/api/webcams')
            .then(result=>result.json())
            .then(webcam=>this.setState({webcam}))
    }

    render() {

        const webcams = this.state.webcam.map((item, i) => (
            <Webcam
                key={ item.id }
                name={item.name}
                loc={item.location}
                url={item.url}
                lat={item.latitude}
                lng={item.longitude} />
        ));

        return (
            <span>{ webcams }</span>
        );
  }
}
