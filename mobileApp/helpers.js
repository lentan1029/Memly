import { AWS_SERVER } from './config';

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

  for (var i = 0; i < this.searchParams.length; i++) {
    res = res + '&' + this.searchParams[i][0] + '=' + JSON.stringify(this.searchParams[i][1]);
  }


  return res;
};

export const getNearby = function(lat, lng) {
  var url = new Url(AWS_SERVER + '/api/nearby');
  var params = {
    lat: lat,
    lng: lng
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