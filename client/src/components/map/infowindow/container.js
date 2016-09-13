import React, { Component } from 'react'
import Infowindow from './presentation.js'

export default class Container extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Infowindow 
				{...this.props}
			/>
		);
	}
}