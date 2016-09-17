var Memly = require('./model');

exports.createAndSaveNewMemly = function(req, res, mediaUrl) {
  console.log('createandsavenewmemly being called', req.body, mediaUrl);
  // Create new instance of Memly and save to database
  var newMemly = new Memly();
  newMemly.user.id = req.body && req.body.user ? req.body.user.userID : req.session.passport.user._id;
  newMemly.user.name = req.body && req.body.user ? req.body.user.username : req.session.passport.user.name.split(' ')[0];
  newMemly.user.avatarUrl = req.body && req.body.user ? req.body.user.profilePhotoUrl : req.session.passport.user.profilePhotoUrl;
  newMemly.media.url = mediaUrl;
  // newMemly.media.contentType = req.file.mimetype; // 'image/png'
  newMemly.media.contentType = 'image/png'; // 'image/png'
  newMemly.media.timestamp = new Date();
  newMemly.comment = req.body.comment;
  newMemly.place = req.body.place;
  newMemly.visits = 1;
  newMemly.location = {
    latitude: req.body.latitude || req.body.lat,
    longitude: req.body.longitude || req.body.lng
  };
  newMemly.save();
};
