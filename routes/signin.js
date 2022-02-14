var express = require('express');
var router = express.Router();
var ssn;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://abu:Password!@cluster0.zgeme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

router.post('/', function(req, res, next) {

  ssn = req.session;
  ssn.email = req.body.email;
  var password =req.body.password;

      MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var database = db.db("AfzaeLearning");
        var query = {email: ssn.email, password: password};

        database.collection("alldata").findOne(query, function(err, result){
            if(result){
              ssn.fullName = result.fullname;
              res.redirect('profile');
            }else{
              req.session.destroy();
              res.render('signin',{message: 'You have to signup first!'});
            }
        });
        });
  // res.redirect('profile');
});

module.exports = router;


