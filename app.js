var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');

//
//  Secret token configured while webhook integration
//
var SECRET_TOKEN = "";

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
//  Webhook receiver api
//
app.use('/webhook_client', verify_signature, process_webhook);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

//
//  Verify sequr signature
//
function verify_signature(req, res, next) {

	//
	//  Save sequr signature in local data holder
	//
	var x_sequr_signature = req.headers['x-sequr-signature'];
	var payload = req.body;

	//
	//  Print payload
	//
	console.log("Payload :: " + JSON.stringify(payload));
	console.log("x-sequr-signature : %s", x_sequr_signature);

	//
	//  Create hex from payload with secret
	//
	let hmac = crypto.createHmac('sha1', SECRET_TOKEN);
	hmac.update(JSON.stringify(payload));
	var client_signature = 'sha1=' + hmac.digest('hex');

	//
	//  Compare sequr signature and computed signature
	//
	if (client_signature == x_sequr_signature) { return next(); }

	//
	//  Signatures are not matching so let user know
	//
	var error = new Error("Signatures didn't match!");
	error.status = 401;
	return next(error);

}

//
//  Webhook processing function
//
function process_webhook(req, res, next) {
	res.status(200);
	res.end();
}

module.exports = app;
