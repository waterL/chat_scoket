var express = require('express');
var router = express.Router();
var base = require('../database')
var process = require('child_process');


//聊天界面
router.get('/form', function(req, res, next) {
	var param = {}
	var table = '';
	if(req.cookies.io_type == 1) {
		table = 'sw_user';
		param.uid = req.cookies.io_id;
		param.sw_id = req.query.id;
	} else {
		table = 'user';
		param.uid = req.query.id;
		param.sw_id = req.cookies.io_id;
	}
	console.log(table, 'body',param)
	base.find(table ,{id:req.query.id}, rs => {
		console.log(rs[0].name)
		base.all('chat_list' , param, rss => {
			console.log('chat_list',rss)
			// res.json(rss)
		    res.render('form', { 
		  	    title: '聊天界面1',
		  	    name: rs[0].name, 
		  	    query:req.query,
		  	    type:req.cookies.io_type,
		  	    list: rss
		    });
	    }, 'ctime asc');
    });
});
//聊天请求
router.post('/form/chat', function(req, res, next) {
	base.add('chat_list' , req.body	, rs => {
		console.log(rs)
		res.json(rs)
    });
});
/* GET home page. */
// 首页列表
router.get('/', function(req, res, next) {
	console.log('//body1',req.cookies)
	var table = req.cookies.io_type == 1?'sw_user':'user'
	base.all(table , {}	, rs => {
		console.log('liebiao=',rs)
		// res.json(rs)
	    res.render('index', { 
	  	    title: '列表', 
	  	    list: rs
	    });
    });
});
//登录
router.get('/login', function(req, res, next) {
    res.render('login', { 
  	    title: 'login'
    });
});
//登录账号请求
router.post('/ajaxName', function(req, res, next) {
	var parm = req.body;
	// console.log('ajaxNameparm', parm)
	if(parm.type == 1) {
		base.find("user" ,{name:parm.name}, rs => {

			if(rs.length==0) {
				base.add("user" ,{name:parm.name}, rss => {
					// console.log('ajaxNamerss',rss)
					res.json({ret:1,id:rss.insertId})
				});
			} else {
				res.json({ret:1,id:rs[0].id})
			}
		});
	} else if(parm.type == 2) {
		base.find("sw_user" ,{name:parm.name}, rs => {
			// console.log('ajaxNamers2',rs)
			if(rs.length==0) {
				base.add("sw_user" ,{name:parm.name}, rss => {
					// console.log('ajaxNamerss2',rss)
					res.json({ret:1,id:rss.insertId})
				});
			} else {
				res.json({ret:1,id:rs[0].id})
			}
		});
	}
});

module.exports = router;
