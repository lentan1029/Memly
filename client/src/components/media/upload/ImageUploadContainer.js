import React, { PropTypes } from 'react'
import axios from 'axios'
import ImageUpload from './ImageUpload'
import { connect } from 'react-redux'
import * as imageUploadActions from '../../../redux/imageUploadReducer'

class ImageUploadContainer extends React.Component {
	
	static defaultProps = {
		file: PropTypes.string,
		imagePreviewUrl: PropTypes.string,
		loaction: PropTypes.object,
		place: PropTypes.string,
		comment: PropTypes.string,
	};

	constructor(props, context) {
		super(props, context);
		// this.state = {
		// 	file: '',
		// 	imagePreviewUrl: '',
		// 	location: {
		// 		lat: 0.0,
		// 		lng: 0.0
		// 	},
		// 	place: '',
		// 	comment: ''
		// };
		this.geolocate();
	}

	geolocate() {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition((position) => {        
	      this.props.dispatch(imageUploadActions.updateImageContainerLocation({
		        lat: position.coords.latitude,
		        lng: position.coords.longitude
		      }));
	      

	      // this.setState({
		     //  location: {
		     //    lat: position.coords.latitude,
		     //    lng: position.coords.longitude
		     //  }
	      // });

	    }, function() {
	      alert('Geolocation failed');
	    });
	  } else {
	    alert('Your browser doesn\'t support geolocation');
	  }
	}

	handlePlaceChange(e) {
		const cachePlace = e.target.value;
		this.props.dispatch(imageUploadActions.handlePlaceChange(e.target.value));
	}

	handleCommentChange(e) {
		const cacheComment = e.target.vlaue
		this.props.dispatch(imageUploadActions.handleCommentChange(e.target.value));
	}

	componentWillReceiveProps(nextprops){
		console.log('mike', nextprops)
	}

	// This allows us to preview images before file post
	// Please refer to this magic:
	// https://codepen.io/hartzis/pen/VvNGZP
	// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
	handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.props.dispatch(imageUploadActions.handleImageChange(file, reader.result));
		  
		  // this.setState({
		  //   file: file,
		  //   imagePreviewUrl: reader.result
		  // });
		}

		reader.readAsDataURL(file);
	}

	// Once we have previewed a photo, we can do operations here
	// to submit to the server for database storage
	handleSubmit(e) {
		e.preventDefault();

		// Geolocate one more time just in case location changed since last established
		this.geolocate();

	  // Create virtual form to send multipart form data with image file
	  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
	  var formData = new FormData();
	  console.log(this.props.place, 'place place place');
	  console.log(this.props.comment, 'comment comment comment')
	  formData.append('place', this.props.place);
	  formData.append('comment', this.props.comment);
	  formData.append('lat', this.props.location.lat);
	  formData.append('lng', this.props.location.lng);

	  var userPhoto = new Blob([this.props.file], { type: 'image/png'});
	  formData.append('photo', userPhoto);

	  // Use axios to send formData to server
		axios.post('/api/photo', formData)
		  .then((response) => {
		    console.log(response);

		  })
		  .catch((error) => {
		    console.log(error);
		  });
		this.props.dispatch(imageUploadActions.handleImageChange('', ''));
		this.context.router.push('/');
	}

	render() {
		return (
			<ImageUpload 
				imagePreviewUrl={this.props.imagePreviewUrl}
				handleSubmit={this.handleSubmit.bind(this)}
				handleImageChange={this.handleImageChange.bind(this)}
				handlePlaceChange={this.handlePlaceChange.bind(this)}
				handleCommentChange={this.handleCommentChange.bind(this)}
			/>
		)
	}
}

// ====== set default state values necessary for this component and send them in as props ===// 

function mapStateToProps(state) {
	return {
		file: state.imageUploadReducer.file,
		imagePreviewUrl: state.imageUploadReducer.imagePreviewUrl,
		location: state.imageUploadReducer.location,
		place: state.imageUploadReducer.place,
		comment: state.imageUploadReducer.comment,
	}
}

ImageUploadContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ImageUploadContainer)