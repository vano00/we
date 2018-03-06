import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import GoogleMap from 'google-map-react';
//import Webcam from '../webcam';

const Webcam = ({ text }) => <div className="webcam">{text}</div>;

export default class SimpleMapPage extends Component {

    constructor(props) {
      super(props);

      this.state = {webcam: []};
    }

    static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    };

    static defaultProps = {
    center: [46.8127598, 7.6638343],
    zoom: 3,
    };

    shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
    }

    componentWillMount() {
      this.WebcamList();
    }

    WebcamList() {
      return fetch('http://localhost:8000/api/webcams')
          .then(result=>result.json())
          .then(webcam=>this.setState({webcam}))
    }

    // constructor(props) {
    //   super(props);
    // }

    render() {
        const webcams = this.state.webcam.map((item, i) => (
            <Webcam
                key={ item.id }
                text={item.name}
                location={item.location}
                url={item.url}
                lat={item.latitude}
                lng={item.longitude} />
        ));
        return (
            <div className="map">
            <GoogleMap
            bootstrapURLKeys={{key:'AIzaSyDOOfGbdcsoynnbalomhaXg09txoQ5JWZo'}}
            center={this.props.center}
            zoom={this.props.zoom}>
            { webcams }
            </GoogleMap>
            </div>
        );
    }
}
