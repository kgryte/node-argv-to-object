'use strict';

// MODULES //

var isnan = require( 'validate.io-nan' );


// PARSE NUMBER //

/**
* FUNCTION: parseNumber( str )
*	Parses a string as a number.
*
* @param {String} str - string to parse
* @returns {Number|Error} float or error object
*/
function parseNumber( str ) {
	var v = parseFloat( str );
	if ( isnan( v ) ) {
		return new TypeError( 'invalid value. Unable to parse string as a number. Value: `' + str + '`.' );
	}
	return v;
} // end FUNCTION parseNumber()


// EXPORTS //

module.exports = parseNumber;
