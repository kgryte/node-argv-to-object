'use strict';

// MODULES //

var regex = require( 'utils-regex-from-string' );


// PARSE REGEXP //

/**
* FUNCTION: parseRegExp( str )
*	Parses a string as a regular expression.
*
* @param {String} str - string to parse
* @returns {RegExp|Error} parsed value or error object
*/
function parseRegExp( str ) {
	var re = regex( str );
	if ( re === null ) {
		return new TypeError( 'invalid value. Unable to parse string as a regular expression. Value: `' + str + '`.' );
	}
	return re;
} // end FUNCTION parseRegExp()


// EXPORTS //

module.exports = parseRegExp;
