'use strict';

// MODULES //

var isnan = require( 'validate.io-nan' );
var validate = require( './validate.integer.js' );


// PARSE INTEGER //

/**
* FUNCTION: parseInteger( str[, options] )
*	Parses a string as an integer.
*
* @param {String} str - string to parse
* @param {Object} [options] - function options
* @param {Number} [options.radix=10] - radix
* @returns {Number|Error} integer or error object
*/
function parseInteger( str, options ) {
	var opts = {};
	var err;
	var v;

	opts.radix = 10;
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			return err;
		}
	}
	v = parseInt( str, opts.radix );
	if ( isnan( v ) ) {
		return new TypeError( 'invalid value. Unable to parse string as an integer. Value: `' + str + '`.' );
	}
	return v;
} // end FUNCTION parseInteger()


// EXPORTS //

module.exports = parseInteger;
