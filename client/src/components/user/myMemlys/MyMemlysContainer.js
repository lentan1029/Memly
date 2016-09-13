import React, { PropTypes } from 'react'
import MyMemlys from './MyMemlys'
import { connect } from 'react-redux'
import axios from 'axios'
import * as userActions from '../../../redux/userReducer'



class MyMemlysContainer extends React.Component {
  static propTypes = {
    userFacebook: PropTypes.object
  }

  constructor(props){
    super(props);

    this.state = {


      userFacebookMyMemlys:[]
      // user: {name: 'John Doe', bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", photo: 'https://scontent.fsnc1-1.fna.fbcdn.net/v/t1.0-9/12573749_10154006811453254_341075965445440422_n.jpg?oh=b02c70e4bf73bf3249ce0ac3e043728e&oe=5838B687', myMemlys: [{url: 'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/12513863_10153994331308254_5263164911566385787_o.jpg' , location: 'New York'},{url: 'https://scontent.fsnc1-1.fna.fbcdn.net/v/t1.0-9/12573749_10154006811453254_341075965445440422_n.jpg?oh=b02c70e4bf73bf3249ce0ac3e043728e&oe=5838B687' , location: 'New York'},{url: 'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/10519185_10152587430858254_7205025064661326895_o.jpg' , location: 'New York'},{url: 'https://scontent.fsnc1-3.fna.fbcdn.net/t31.0-8/10265664_10152863685678254_2720788227246186432_o.jpg' , location: 'New York'}, {url: 'https://scontent.fsnc1-1.fna.fbcdn.net/t31.0-8/13323656_10154379664888254_6700518311860962886_o.jpg', location: 'San Francisco'}], likedMemlys: [{url: 'https://scontent.fsnc1-3.fna.fbcdn.net/t31.0-8/13938311_1131762946908530_6242907422971776062_o.jpg', location: 'San Jose'}, {url: 'https://scontent.fsnc1-3.fna.fbcdn.net/v/t1.0-9/14225455_1107962689239467_1782382838638034127_n.jpg?oh=f36a23bd6873261d9569822fc59db40e&oe=58541FE4', location: 'Napa'}]}
    }


 

  }


  static propTypes = {

    userFacebook: PropTypes.object,

    // birthday: PropTypes.string,
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
          userFacebookMyMemlys: res.data.memlys
        })


        return res;
      })

  }



  render() {

    console.log(this.props, 'MyMemlysContainer props');
    

    return(
      <div className = "ProfileBoxes">
        <div className ="MemlysContainer">
        {this.state.userFacebookMyMemlys.map((item, index) => <MyMemlys key={index} item={item}/>)}
        </div>
      </div>
      )
  }

}


// function mapStateToProps (state) {
//   return {
//     userFacebook: state.userReducer.userFacebook
//   }
// }

// export default connect(mapStateToProps)(MyMemlysContainer);




export default MyMemlysContainer