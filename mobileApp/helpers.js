import { AWS_SERVER } from './config';
var RNUploader = require('NativeModules').RNUploader;

var Url = function(str) { //polyfill
  this.url = str;
  this.searchParams = [];
};

Url.prototype.addParams = function (key, value) {
  this.searchParams.push([key, value]);
};

Url.prototype.href = function() {
  var res = this.url;
  res = res + '?' + this.searchParams[0][0] 
  + '=' + JSON.stringify(this.searchParams[0][1]);

  for (var i = 1; i < this.searchParams.length; i++) {
    res = res + '&' + this.searchParams[i][0] + '=' + JSON.stringify(this.searchParams[i][1]);
  }


  return res;
};

export const sendMemly = function(memly, mediaUrl) {
  console.log('helpers sendmemly is being called', memly, mediaUrl);
  var memly = {
    ...memly,
    mediaUrl: AWS_SERVER + '/' + mediaUrl
  };
  this.props.dispatch(userReducer.updateUserMemlies(memly.mediaUrl));
  fetch(AWS_SERVER + '/mobile/user/createMemly', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(memly)
  });
};

export const getNearby = function(latitude, longitude) {
  var url = new Url(AWS_SERVER + '/api/nearby');
  var params = {
    latitude, longitude
  };
  Object.keys(params).forEach(key => url.addParams(key, params[key]));
  var options = {
    method: 'GET',
    mode: 'cors'
  };
  return fetch(url.href(), options)
  .then((res)=>(res.json()));
  // .then((json)=>(console.log(json)))
  // .catch((err)=>(console.log('error:', err)));
};

export const updateFacebookInfo = function(res) {
  console.log('facebook res is:', JSON.stringify(res));
  var url = AWS_SERVER + '/mobile/user/edit/profileinfo/';
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(res)
  })
  .then((res) => (res.json()))
  .then((found) => {
    console.log(found);
    return found;
  });
};

export const populateFacebookInfo = function(res) {
  console.log('facebook res is:', JSON.stringify(res));
  var url = AWS_SERVER + '/mobile/user/edit/populateinfo/';
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(res)
  })
  .then((res) => (res.json()))
  .then((found) => {
    console.log('WHAT IS BEING FOUND', found);
    return found;
  });
};

export const doUpload = function(filepath, facebookUserID, cb) {
  console.log('filepath is', filepath);
  let files = [
    {
      name: 'picture',
      filename: 'camera.jpg',
      filepath: filepath,  // image from camera roll/assets library
      filetype: 'image/jpeg',
    }
  ];

  let opts = {
    url: 'http://localhost:3000/mobile/user/uploadImage',
    files: files, 
    method: 'POST',
    params: { 'id': facebookUserID },
  };

  RNUploader.upload( opts, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    let status = res.status;
    let responseString = res.data;
    // let json = JSON.parse(responseString);

    console.log('upload complete with status ' + status);
    console.log('data received:', res.data);
    // console.log('data received:', json);
    cb(res.data);
  });
};
