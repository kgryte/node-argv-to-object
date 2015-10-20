'use strict';

/**
* FUNCTION: error( err, arg )
*	Creates an error tailored to the module.
*
* @param {Error|TypeError|RangeError} err - error object
* @param {String} arg - argument name
* @returns {Error|TypeError|RangeError} error object
*/
function error( err, arg ) {
	var msg = err.message;
	var out;

	msg += ' Argument: `' + arg + '`.';
	if ( err instanceof TypeError ) {

		out = new TypeError( msg );
	}
	else if ( err instanceof RangeError ) {
		out = new RangeError( msg );
	}
	else {
		out = new Error( msg );
	}
	return out;
} // end FUNCTION error()


// EXPORTS //

module.exports = error;
