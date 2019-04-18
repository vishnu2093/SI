'use strict';

var fAndFCtrler = require('../models/findAndFixModel');

// this controller will receive a request from the
// message queue, it'll then verify userID and challengeID
// with the DB, and if these are correct, will interact
// with the frontend
exports.enableChallenge = function(req, res) {
	// res.set('Access-Control-Allow-Origin', '*');
	// res.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	// res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
	if(req.body.uid && req.body.cid){
		var uid = req.body.uid;
		var cid = req.body.cid;

		// htmlencode to prevent XSS
		if(uids.includes(uid) && cids.includes(cid)){
			Stream.emit('push', 'message', { uid: uid, 
  											cid: cid});
		} else {
			res.json({msg: 'failure (0x1)'});
		}
	} else {
		res.json({msg: 'failure (0x2)'});
	}
};


// this controller will receive the submitted answer from
// the frontend, check it, will post the message to the external
// service, and provide feedback to the frontend
exports.checkAnswer = function(req, res) {
	// res.set('Access-Control-Allow-Origin', '*');
	// res.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	// res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
	if(req.body.uid && req.body.cid && 
		req.body.qid && req.body.usel != undefined){
		var uid = req.body.uid;
		var cid = req.body.cid;
		var qid = req.body.qid;
		var usel = req.body.usel;

		if(uids.includes(uid) && cids.includes(cid)) {
			if(ans[qid] != undefined){
				if(usel == ans[qid]) {
					res.json({msg: 1});
				} else {
					res.json({msg: 0});
				}
			} else {
				res.json({msg: 'failure (0x3)'});
			}
		} else {
			res.json({msg: 'failure (0x4)'});
		}
	} else {
		res.json({msg: 'failure (0x5)'});
	}
};
