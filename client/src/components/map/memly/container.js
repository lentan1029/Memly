import React, { PropTypes, Component } from 'react'
import { UserLocation, MapMemly } from './presentation' 

export default class MapMemlyContainer extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism created by react library
    $hover: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }

  render() {
    if ( this.props.representCurrentUserLocation ) {
      return (
        <UserLocation />
      );
    } else {
      return (
        <MapMemly {...this.props} />
      );
    }
  }
}