var express = require('express');
var router = express.Router();
//Session variable:
var ssn;

/* GET profile page. */
router.get('/', function(req, res, next) { 
  //Request session variable: 
  ssn = req.session;
  if(ssn.email) {
    res.render('profile', {fullname: ssn.fullName});
  } else {
    ssn.profileError = "You need to log in first!";
    res.redirect('signin');
  }  
});


module.exports = router;