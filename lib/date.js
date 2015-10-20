'use strict';

// MODULES //

var isnan = require( 'validate.io-nan' );


// PARSE DATE //

/**
* FUNCTION: parseDate( str )
*	Parses a string as a Date.
*
* @param {String} str - string to parse
* @returns {Date|Error} parsed value or error object
*/
function parseDate( str ) {
	var v = Date.parse( str );
	if ( isnan( v ) ) {
		return new TypeError( 'invalid value. Unable to parse string as a date. Value: `' + str + '`.' );
	}
	return new Date( v );
} // end FUNCTION parseDate()


// EXPORTS //

module.exports = parseDate;
