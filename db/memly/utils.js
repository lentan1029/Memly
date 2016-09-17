var Memly = require('./model');

exports.createAndSaveNewMemly = function(req, res, mediaUrl) {
  // Create new instance of Memly and save to database
  var newMemly = new Memly();
  newMemly.user.id = req.body.user.userID || req.session.passport.user._id;
  newMemly.user.name = req.body.user.username || req.session.passport.user.name.split(' ')[0];
  newMemly.user.avatarUrl = req.body.user.profilePhotoUrl || req.session.passport.user.profilePhotoUrl;
  newMemly.media.url = mediaUrl;
  // newMemly.media.contentType = req.file.mimetype; // 'image/png'
  newMemly.media.contentType = 'image/png'; // 'image/png'
  newMemly.media.timestamp = new Date();
  newMemly.comment = req.body.comment;
  newMemly.place = req.body.place;
  newMemly.visits = 1;
  newMemly.location = {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };
  newMemly.save();
};