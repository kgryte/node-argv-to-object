'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isInteger = require( 'validate.io-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {Number} [options.radix] - radix
* @returns {Error|Null} error object or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'radix' ) ) {
		opts.radix = options.radix;
		if ( !isInteger( opts.radix ) ) {
			return new TypeError( 'invalid option. Radix must be an integer. Option: `' + opts.radix + '`.' );
		}
		if ( opts.radix < 2 || opts.radix > 36 ) {
			return new RangeError( 'invalid option. Radix must be an integer on the interval [2,36]. Option: `' + opts.radix + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
