var express = require('express');
var router = express.Router();
var ssn;

router.get('/', function(req, res, next) {

    req.session.destroy();

    res.redirect('/signin');
});

module.exports = router;