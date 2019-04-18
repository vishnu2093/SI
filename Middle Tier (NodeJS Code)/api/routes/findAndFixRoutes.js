'use strict';
module.exports = function(app) {
	var fAndFCtrler = require('../controllers/findAndFixController');

	// route for receiving exploitation message
	// and enabling the challenge
	/**
	 * @api {post} /api/v1/enchl Receive Exploitation Message and Enable the Challenge
	 *
	 * @apiName EnableChallenge
	 * @apiGroup Find The Fix
	 *
	 * @apiParam {String} uid User-ID
	 * @apiParam {String} cid Category-ID

	 * @apiParamExample {json} Request-Example:
	 *     {
	 *       "uid": "{user-id}",
	 *		 "cid": "{category-id}"
	 *     }
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "msg": "success"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 400 Bad Request
	 *     {
	 *       "msg": "failure"
	 *     }
	 */
	app.route('/api/v1/enchl')
		.post(fAndFCtrler.enableChallenge);


	// route for checking the submitted answer
	// and providing feedback
	/**
	 * @api {post} /api/v1/chkans Check answer, provide frontend the feedback, and post to external service
	 *
	 * @apiName CheckAnswer
	 * @apiGroup Find The Fix
	 *
	 * @apiParam {String} uid User-ID
	 * @apiParam {String} cid Category-ID
	 * @apiParam {String} qid Question-ID
	 * @apiParam {Number} usel User Selection
	 *
	 * @apiParamExample {json} Request-Example:
	 *     {
	 *       "uid": "{user-id}",
	 *		 "cid": "{category-id}",
	 *		 "qid": "{question-id}",
	 *		 "usel": {user-selection}
	 *     }
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "msg": 1
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "msg": 0
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 400 Bad Request
	 *     {
	 *       "msg": "failure"
	 *     }
	 */
	app.route('/api/v1/chkans')
		.post(fAndFCtrler.checkAnswer);  


	 // route for subscribing to the event emitter
	/**
	 * @api {get} /api/v1/stream Subscribing to the Event Emitter
	 *
	 * @apiName EventStream
	 * @apiGroup Find The Fix
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "msg": "subscribed"
	 *     }
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 400 Bad Request
	 *     {
	 *       "msg": "failure"
	 *     }
	 */
	app.get('/api/v1/stream', function(request, response){
	  response.writeHead(200, {
	    'Content-Type': 'text/event-stream',
	    'Cache-Control': 'no-cache',
	    'Connection': 'keep-alive',
	    // 'Access-Control-Allow-Origin': '*'
	  });

	  Stream.on("push", function(event, data) {
	    response.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
	  });

	  Stream.emit("push", "message", {msg: 'subscribed'});

	});

};