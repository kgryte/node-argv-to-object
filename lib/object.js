'use strict';

// MODULES //

var parseJSON = require( 'utils-json-parse' );


// PARSE OBJECT //

/**
* FUNCTION: parseObject( str )
*	Parses a string as an object.
*
* @param {String} str - string to parse
* @returns {Object|Error} parsed value or error object
*/
function parseObject( str ) {
	var obj = parseJSON( str );
	if ( obj instanceof Error ) {
		return new TypeError( 'invalid value. Unable to parse string as a JSON object. Value: `' + str + '`. Error: `' + obj.message + '`.' );
	}
	return obj;
} // end FUNCTION parseObject()


// EXPORTS //

module.exports = parseObject;
