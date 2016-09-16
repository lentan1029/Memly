import { AWS_SERVER } from './config';

export const getNearby = function(lat, lng) {
  var url = new URL(AWS_SERVER + '/api/nearby/');
  var params = {
    lat: lat,
    lng: lng
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  var options = {
    method: 'GET',
    mode: 'cors'
  };
  return fetch(url.href, options)
  .then((res)=>(res.json()));
  // .then((text)=>(console.log(text)))
  // .catch((err)=>(console.log('error:', err)));
};

export const registerWithServer = function(graphRes) {
  // var url = new URL(AWS_SERVER + '/api/');
  //
};