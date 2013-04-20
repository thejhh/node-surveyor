/* 
 * Surveyor 
 * Copyright 2013 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

var Survey = require('./Survey.js');
var create_app = require('./create_app.js');

function module_handler (config) {
	
	if(!( config && (typeof config === 'object') )) {
		throw new Error('surveyor(arg) called with non-object argument!');
	}
	
	if(config.survey && (typeof config.survey === 'function')) {
		var s = config.survey(new Survey());
		if(s && (typeof s === 'object')) {
			return create_app(config, config.survey(new Survey()));
		} else {
			throw new Error('unexpected result from config.app(): ' + (typeof s));
		}
	} else {
		throw new Error('surveyor(arg).survey called with non-function argument!');
	}
}

var mod = module.exports = module_handler;

mod.Survey = Survey;

/* EOF */
