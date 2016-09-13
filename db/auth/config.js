if (process.env.NODE_ENV === 'development') {
  var keys = require('./keys.js');
}

exports.env = function() {
  switch (process.env.NODE_ENV) {
  case 'development':
    return {
      FACEBOOK_APP_ID: keys.FACEBOOK_APP_ID,
      FACEBOOK_APP_SECRET: keys.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback'
    };
  case 'production':
    return {
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'https://thawing-fortress-62578.herokuapp.com/auth/facebook/callback'
    };
  default:
    return {
      FACEBOOK_APP_ID: null,
      FACEBOOK_APP_SECRET: null,
      callbackURL: null
    };
  }
};

exports.profileFields = [
  'id',
  'displayName',
  'first_name',
  'last_name',
  'email',
  'bio',
  'work',
  'education',
  'location',
  'birthday',
  'cover',
  'picture.type(large)',
  'gender',
  'interested_in',
  'link', // FB timeline 
  'website',
  'is_verified'
];

exports.scope = [
  'email', 
  'user_likes', 
  'user_friends', 
  'user_photos', 
  'user_birthday',
  'user_location',
  'user_education_history',
  'user_events',
  'user_photos',
  'user_website',
  'user_tagged_places',
  'user_work_history'
];