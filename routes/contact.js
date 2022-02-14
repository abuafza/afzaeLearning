// var express = require('express');
// var router = express.Router();


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('contact');
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
// for database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://abu:Password!@cluster0.zgeme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// for email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'afzatrios2021@gmail.com',
    pass: 'milky2422'
  }
});


router.get('/', function(req, res, next) {
  res.render('contact');
});

router.post('/', function(req, res, next){

  var contactName = req.body.cName;
  var email = req.body.email;
  var contactSubject = req.body.subject;
  var contactMessage = req.body.message;

  MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var database = db.db("AfzaeLearning");
    var contactdata = {conName: contactName, email: email, conSubject: contactSubject, conMessage: contactMessage};

    database.collection("alldata").insertOne(contactdata, function(err, res){
      if(err){
          throw err;            
      }
      console.log("User was successfully added!");
      //Close the Database after data Inserted:
      db.close();
      });
      res.render('contact',{contactmess: 'Thanks '+ contactName + ', We will contact with you soon!'});
  });

  //send an email to the webmaster
  var mailOptions = {
    from: 'afzatrios2021@gmail.com',
    to: 'afza22bd@gmail.com',
    subject: 'Contact Message from: ' + contactName,
    text: 'Message: ' + contactMessage + '\n From: ' + email
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
      res.render('contact',{error: 'Something went worng!'});
    }else{
      console.log('Email sent');
      res.render('contact',{message: 'Message sent'});
    }
  });

});

module.exports = router;