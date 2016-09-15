module.exports = {
  isLoggedIn: function(req, res, next) {
    console.log('I am hitting isLoggedIn helper function');
    /*if (req.params.userID) {
      console.log('INSECURE user credentials being sent in get request'); //TODO: fix this using jwt
      next();
    } else if (req.body.userID) {
      console.log('INSECURE user credentials being sent in post request');
      next();
    } else */
    if (!req.session.passport) {
      console.log('no passport session detected. sorry!!!');
      res.redirect('http://localhost:3000/#');
    } else if (!req.session.passport.user) {
      console.log('no passport user defined. maybe next time????');
      res.redirect('http://localhost:3000/#');
    } else {
      next();
    }
  }
};