var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://abu:Password!@cluster0.zgeme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Session variable:
var ssn;

router.get('/', function(req, res, next) {
  res.render('signup');
});
//Post to signup page.
router.post('/', function(req, res, next){

    //Request ssn:
    ssn = req.session;

    //Create session variables to have access to them on all pages:
    ssn.fullName = req.body.fName;
    ssn.email = req.body.email;
    var userPassword = req.body.password;

    //Only insert new user if they have not been added to the database:
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var database = db.db("AfzaeLearning");
        var query = {email: ssn.email};

        database.collection("alldata").findOne(query, function(err, result){
            if(result){
                //Don't allow user to sign up:
                req.session.destroy(); //Destroy session variables so they are not stored.
                //Render the signup page with an error message:
                res.render('signup', {error: "*This user already exists, please sign in!"});
            } else {
                var userobj = {fullname: ssn.fullName, email: ssn.email, password: userPassword};
                //Connect to the Database Collection/Table and add the data to the users Table:
                database.collection("alldata").insertOne(userobj, function(err, res){
                if(err){
                    throw err;            
                }
                console.log("User was successfully added!");
                //Close the Database after data Inserted:
                db.close();
                });
            res.redirect('profile');
            }
        });
    });
});


module.exports = router;