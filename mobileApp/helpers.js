import { AWS_SERVER } from './config';

export var getNearby = function(lat, lng) {
  var url = new URL(AWS_SERVER + '/api/nearby/');
  var params = {
    lat: 37.774929,
    lng: -122.419416
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