import React, { PropTypes } from 'react';
import LikedMemlys from './LikedMemlys';
import axios from 'axios';

class LikedMemlysContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {


      likedFacebookMemlys: []
      //user: {name: 'John Doe', bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", photo: 'https://scontent.fsnc1-3.fna.fbcdn.net/t31.0-8/11232282_10153700263958254_6749315989191466632_o.jpg', myMemlys: [{url: 'https://scontent.fsnc1-3.fna.fbcdn.net/t31.0-8/10265664_10152863685678254_2720788227246186432_o.jpg' , location: 'New York'}, {url: 'https://scontent.fsnc1-3.fna.fbcdn.net/v/t1.0-9/11692782_10153548376573254_4076114351065122781_n.jpg?oh=98d0d35e39a1b376c806bee7bb47f075&oe=584175A8', location: 'San Francisco'}], likedMemlys: [{url: 'https://scontent.fsnc1-3.fna.fbcdn.net/t31.0-8/13938311_1131762946908530_6242907422971776062_o.jpg', location: 'San Jose'}, {url: 'https://scontent.fsnc1-3.fna.fbcdn.net/v/t1.0-9/14225455_1107962689239467_1782382838638034127_n.jpg?oh=f36a23bd6873261d9569822fc59db40e&oe=58541FE4', location: 'Napa'}]}
    };
  }



  componentWillMount() {
    var context = this;
    console.log(this.props, 'profileComponentWillMount');
    // var context = this;
    // this.props.dispatch(userActions.userAuth());

    //turn isLogged in as true so nav bar shows logged in buttons
    axios.get('/user/retrieve/profileinfo/')
      .then((res) => {
        console.log('what is this response on client side', res.data);

        context.setState({
          likedFacebookMemlys: res.data.likedMemlys
        });


        return res;
      });

  }


  render() {
    return (
      <div className = "ProfileBoxes">
        <div className ="MemlysContainer">
          {this.state.likedFacebookMemlys.map((item, index) => <LikedMemlys key={index} item = {item}/>)}
        </div>
      </div>
      );
  }

}

export default LikedMemlysContainer;