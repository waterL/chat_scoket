var express = require('express');
var app = express();
var router = express.Router();
var base = require('../database')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form', { 
        title: 'Express', 
    });
  // base.page("user" ,'id', 10, rs => {
		// console.log(rs)
		// // res.json(rs)
	 //    res.render('index', { 
	 //  	    title: 'Express', 
	 //  	    nr: rs
	 //    });
  //   });
});
router.post('/abc', function(req, res, next) {
	console.log(res)
  // base.find("user" ,{name:'c'}, rs => {
  //   res.json(rs)
  // });
});


module.exports = router;
