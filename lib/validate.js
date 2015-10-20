'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isFunction = require( 'validate.io-function' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {Object} [options.parsers] - environment variable parsers
* @returns {Error|Null} error object or null
*/
function validate( opts, options ) {
	var keys;
	var len;
	var i;
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'parsers' ) ) {
		opts.parsers = options.parsers;
		if ( !isObject( opts.parsers ) ) {
			return new TypeError( 'invalid option. Parsers option must be an object. Option: `' + opts.parsers + '`.' );
		}
		keys = Object.keys( opts.parsers );
		len = keys.length;
		for ( i = 0; i < len; i++ ) {
			if ( !isFunction( opts.parsers[ keys[i] ] ) ) {
				return new TypeError( 'invalid option. A parser must be a function. Option: `' + opts.parsers + '`. Key: `' + keys[ i ] + '`. Value: `' + opts.parsers[ keys[i] ] + '`.' );
			}
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
