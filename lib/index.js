'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' );
var isObject = require( 'validate.io-object' );
var merge = require( 'utils-merge2' )();
var parseArgs = require( 'minimist' );
var validate = require( './validate.js' );
var error = require( './error.js' );
var getOpts = require( './opts.js' );


// PARSERS //

var PARSERS = {
	'string': require( './string.js' ),
	'boolean': require( './boolean.js' ),
	'number': require( './number.js' ),
	'integer': require( './integer.js' ),
	'object': require( './object.js' ),
	'date': require( './date.js' ),
	'regexp': require( './regexp.js' )
};


// COMMAND-LINE ARGUMENTS //

/**
* FUNCTION: argv( map[, options] )
*	Maps command-line arguments to a configuration object.
*
* @param {Object} map - command-line argument mapping
* @param {Object} [options] - function options
* @param {Object} [options.parsers] - command-line argument parsers
* @returns {Object} configuration object
*/
function argv( map, options ) {
	var parse;
	var opts;
	var keys;
	var args;
	var err;
	var key;
	var out;
	var len;
	var val;
	var p;
	var o;
	var i;
	if ( !isObject( map ) ) {
		throw new TypeError( 'invalid input argument. Map argument must be an object. Value: `' + map + '`.' );
	}
	opts = {
		'parsers': {}
	};
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	p = merge( {}, PARSERS, opts.parsers );

	keys = Object.keys( map );
	len = keys.length;

	args = parseArgs( process.argv.slice( 2 ), getOpts( map ) );

	out = {};
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		o = map[ key ];
		val = args[ key ];
		if ( val === void 0 ) {
			continue;
		}
		if (
			o.type === 'boolean' &&
			o.default === void 0 &&
			val === false
		) {
			continue;
		}
		if ( o.type === void 0 ) {
			parse = p[ 'string' ];
			val = parse( val, o );
		} else {
			parse = p[ o.type ];
			if ( parse === void 0 ) {
				throw new Error( 'invalid type. Unsupported/unrecognized argument value type. Type: `' + o.type + '`.' );
			}
			val = parse( val, o );
		}
		if ( val instanceof Error ) {
			throw error( val, key );
		}
		deepSet( out, o.keypath, val, {
			'create': true,
			'sep': '.'
		});
	}
	return out;
} // end FUNCTION argv()


// EXPORTS //

module.exports = argv;
