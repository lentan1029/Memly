import React, { PropTypes } from 'react'
import EditProfile from './EditProfile'
import axios from 'axios'
import { connect } from 'react-redux'
import * as userActions from '../../../redux/userReducer'
import * as imageUploadActions from '../../../redux/imageUploadReducer'

class EditProfileContainer extends React.Component {

  static propTypes = {
    userFacebook: PropTypes.object,
    birthday: PropTypes.string,
  };

  constructor(props, context){
    super(props, context);
  }
    //in ES6, componentWillMount goes into constructor invocation!
    //just put whatever you want componentWillMount within this method
    
    // axios.get('/user/retrieve/profileinfo/')
    //   .then((res) => {
    //     this.props.dispatch(userActions.updateUserFacebook(res.data));
    //     this.props.dispatch(userActions.updateUserBirthday(res.data.birthday))
    //     context.setState({
    //       userFacebook: res.data,
    //       birthday: res.data.birthday
    //     });
    //     console.log('checking userFacebook state for EditProfileContainer ------>', context.state.userFacebook);
    //   });

    // console.log(this.props, 'editprofielContainer Will Mount props');
    
  // }

  componentDidMount(){
    console.log(this.props, 'editprofielContainer DID Mount props');

  }


  //transforms date from input into a more readable format. ex:'10/31/1990' becomes 'October 31, 1990'
  DateParser(date) {
    console.log('checking date format', date);
    var dateArray = date.split('/');
    var month = Number(dateArray[0]);
    if (month === 1) {
      month = 'January';
    } else if (month === 2) {
      month = 'February';
    } else if (month === 3) {
      month = 'March';
    } else if (month === 4) {
      month = 'April';
    } else if (month === 5) {
      month = 'May';
    } else if (month === 6) {
      month = 'June';
    } else if (month === 7) {
      month = 'July';
    } else if (month === 8) {
      month = 'August';
    } else if (month === 9) {
      month = 'September';
    } else if (month === 10) {
      month = 'October';
    } else if (month === 11) {
      month = 'November';
    } else if (month === 12) {
      month = 'December';
    }

    var day = Number(dateArray[1]);
    var year = dateArray[2];

    var dateFormatted = `${month} ${day}, ${year}`;
    return dateFormatted;
  }

  //email validation helper function to test if user entered valid email. returns boolean value.
  validateEmail(email) {
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
  }



  // componentWillMount() {
  //   var context = this;
  //   axios.get('/user/retrieve/profileinfo/')
  //     .then(function(res) {
  //       context.setState({
  //         userFacebook: res.data,
  //         birthday: res.data.birthday
  //       });
  //       console.log('checking userFacebook state for EditProfileContainer ------>', context.state.userFacebook);
  //     });
  // }

  changeProfileInfo(name, email, birthday, gender, bio) {
    // var context = this;
    console.log('checking bio value', bio);
    if(! this.validateEmail(email)) {
      email = this.props.userFacebook.email;
    } else {
      email = email;
    }
    //console.log('checking birthday at the beginning', birthday, 'checking propsbirthday', this.props.userFacebook.birthday);
    name = name || this.props.userFacebook.name;
    birthday = birthday || this.props.userFacebook.birthday;
    gender = gender || this.props.userFacebook.gender;
    bio = bio || this.props.userFacebook.bio;
    //console.log('what is inside birthday ---->', birthday);

    if (birthday.indexOf('-') !== -1) {
      var birthdayArray = birthday.split('-');
      var year = birthdayArray[0];
      var month = birthdayArray[1];
      var day = birthdayArray[2];
      birthday = `${month}/${day}/${year}`;
    }

    axios.post('/user/edit/profileinfo/', 
      {name: name, email: email, birthday: birthday, gender: gender, bio: bio})
      .then((res) => {
        //console.log('checking out how data is formatted', res.data);
        this.props.dispatch(userActions.updateUserFacebook(res.data));

        // context.setState({
        //   userFacebook: res.data
        // });

        // console.log('checking out how birthday is formatted ONE MORE TIME', res.data);
        // res.data.birthday = this.DateParser(res.data.birthday);
        // console.log('its my birthday!!!!!', res.data);

    // console.log('what is inside email', email);
    // console.log('hitting changeProfileInfo');
    // name = name || this.state.userFacebook.name;
    // email = email || this.state.userFacebook.email;
    // birthday = birthday || this.state.userFacebook.birthday;
    // gender = gender || this.state.userFacebook.gender;
    // bio = bio || this.state.userFacebook.bio;

    // axios.post('/user/edit/profileinfo/', 
    //   {name: name, email: email, birthday: birthday, gender: gender, bio: bio})
    //   .then(function(res) {

        console.log('ClientSide updated profile info successfully');
        // context.props.updateUserData(res.data);
        this.context.router.push('likedmemlys')
      })
  }

  handleImageChange(e) {
    e.preventDefault();
    console.log('i hit handleImageChange');
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


  changeProfilePhoto(event) {
    var formData = new FormData();

    var userPhoto = new Blob([this.props.file], { type: 'image/png'});
    formData.append('photo', userPhoto);

    console.log('i hit changeProfilePhoto. i should check formData', formData);
    axios.post('/user/edit/profilephoto',
      formData)
      .then((res) => {
        console.log('changeProfilePhoto: what kind of data am i getting back????????', res.data);

        this.props.dispatch(userActions.updateUserFacebook(res.data));
        this.context.router.push('likedmemlys');
      })
  }

  render() {
    return(
      <div id="EditProfileContainer">
        <EditProfile userFacebook={this.props.userFacebook} changeProfileInfo={this.changeProfileInfo.bind(this)} changeProfilePhoto={this.changeProfilePhoto.bind(this)} handleImageChange={this.handleImageChange.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    file: state.imageUploadReducer.file,
    userFacebook: state.userReducer.userFacebook,
    birthday: state.userReducer.birthday
  }
}

EditProfileContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(EditProfileContainer)