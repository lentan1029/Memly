export const calculateSince = function(datetime) {
  // Calculates the time since message was created
  var tTime = new Date(datetime);
  var cTime = new Date();
  var sinceMin = Math.round(( cTime - tTime ) / 60000);
  
  if (sinceMin === 0) {
    var sinceSec = Math.round((cTime - tTime) / 1000);
    if (sinceSec < 10) {
      var since = 'less than 10 seconds ago';
    } else if (sinceSec < 20) {
      var since = 'less than 20 seconds ago';
    } else {
      var since = 'half a minute ago';
    }
  } else if (sinceMin === 1) {
    var sinceSec = Math.round((cTime - tTime) / 1000);
    if (sinceSec === 30) {
      var since = 'half a minute ago';
    } else if (sinceSec < 60) {
      var since = 'less than a minute ago';
    } else {
      var since = '1 minute ago';
    }
  } else if (sinceMin < 45) {
    var since = sinceMin + ' minutes ago';
  } else if (sinceMin > 44 && sinceMin < 60) {
    var since = 'about 1 hour ago';
  } else if (sinceMin < 1440) {
    var sinceHr = Math.round(sinceMin / 60);
    if (sinceHr === 1) {
      var since = 'about 1 hour ago';
    } else {
      var since = 'about ' + sinceHr + ' hours ago';
    }
  } else if (sinceMin > 1439 && sinceMin < 2880) {
    var since = '1 day ago';
  } else {
    var sinceDay = Math.round(sinceMin / 1440);
    var since = sinceDay + ' days ago';
  }
  return since;
};

export const calculateDistance = function(lat1, lng1, lat2, lng2, unit) {
  // Calculates the distance between the user's geolocation and the message's geolocation
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var theta = lng1 - lng2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') { dist = dist * 1.609344; }
  if (unit === 'N') { dist = dist * 0.8684; }
  return dist;
};