var AWS = require('aws-sdk');
var fs = require('fs');
var env = require('./config/environment');
var keys = require('./config/keys');
var User = require('../users/userModel');

exports.create = function(req, res) {
  console.log('i am hitting my uploadProfilePhoto function lets check req.file', req.file);
  // Update AWS configuration for access and secret keys
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html
  AWS.config.update({
    accessKeyId: keys.AWS_ACCESS_KEY_ID,
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY 
  });

  // Set region configuration
  AWS.config.region = env.region;

  // Set up s3 bucket access
  var s3 = new AWS.S3({params: {Bucket: env.bucket}});

  // We generate random file names below because when the
  // user downloads the file, it will include original file name
  var folder = require('./utils/randomString').generate(20);

  // TODO: IN CASE I WANT TO DO VALIDATION LATER
  // var matches = req.body.upload.match(/data:([A-Za-z-+\/].+);base64,(.+)/);
  // if (matches === null || matches.length !== 3) {
  //   return handleError(res, 'Invalid input string');
  // }
  // var uploadBody = new Buffer(matches[2], 'base64'); // === file

  // Read and create buffer file from disk-saved image
  var file = fs.readFileSync(req.file.path);

  // Grab randomized file name
  var filename = req.file.filename;

  // Create re-usable url that can be used to view media asset from anywhere
  var mediaUrl = 'https://s3-' + env.region + '.amazonaws.com/' + env.bucket + '/' + folder + '/' + filename;

  //console.log('am i hitting mediaurl properly', mediaUrl);






  var params = {
    Bucket: env.bucket,
    Key: folder + '/' + filename,
    Body: file,
    ACL: 'public-read'
  };

  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      //console.log('Successfully uploaded data to ' + env.bucket + '/' + folder + '/' + filename);

      var userID = req.session.passport.user['_id'];
      User.findOne({_id: userID}).exec(function(err, found) {
        if (err) {
          res.status(404).send('something went wrong');
        }
        if (found) {
          console.log('checking found in editProfile', found);
          found.profilePhotoUrl = mediaUrl;
          found.save((function(err, User) {
            if (err) {
              console.log('am i hitting error in edit profile???????');
              res.status(404).send('something went wrong');
            }
            console.log('i successfully edited my profile and just saved ----->', found);
            res.status(202).send(found);
          }));
        } else {
          console.log('couldnt find the user model ur looking for.');
          res.status(203).send('didnt work as anticipated');
        }
      });



      // return res.json({
      //   name: filename,
      //   url: mediaUrl,
      //   bucket: env.bucket,
      //   key: folder + '/' + filename
      // });
    }
  });
};

handleError = (res, err) => {
  return res.send(500, err);
};