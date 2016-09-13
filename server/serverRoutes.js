module.exports = {

  postTest: function(req, res) {
    console.log(req.status);
    res.sendStatus(200);
  },

  getTest: function(req, res) {
    console.log('get Test here'); 
    res.redirect('/');
  },

  auth: function(req, res) {
    console.log('fb auth success!');
  }

};