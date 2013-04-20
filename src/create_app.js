/* HTTP request handler for Surveys
 * Copyright Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

var express = require('express'),
	path = require('path');

/* Request */
var do_index = function(req, res){
	res.render('index', { title: 'Survey' });
};

/** Survey object constructor */
function create_app(config, survey) {
	if(config === undefined) {
		throw new Error("create_app called without config!");
	}

	var app = express();
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	if(config && config.cookies && config.cookies.secret) {
		app.use(express.cookieParser(config.cookies.secret));
	} else {
		throw new Error("Failed to set up cookieParser: config is missing .cookies.secret!");
	}

	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	// development only
	if ('development' === app.get('env')) {
	    app.use(express.errorHandler());
	}
	app.get('/',  do_index );

	return app;
}

// Export module
module.exports = create_app;

/* EOF */
