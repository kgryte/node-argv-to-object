'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' );
var isObject = require( 'validate.io-object' );
var isArray = require( 'validate.io-array' );
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
	var isArr;
	var opts;
	var keys;
	var args;
	var err;
	var key;
	var out;
	var len;
	var val;
	var tmp;
	var N;
	var p;
	var o;
	var i;
	var j;
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
		// By default, if a arg is `boolean`, has no default value, and was not provided, it's value is `false`, and we should regard the value as being absent.
		if (
			o.type === 'boolean' &&
			o.default === void 0 &&
			val === false
		) {
			continue;
		}
		// By default, parse all command-line args as strings...
		if ( o.type === void 0 ) {
			parse = p[ 'string' ];
		} else {
			parse = p[ o.type ];
			if ( parse === void 0 ) {
				throw new Error( 'invalid type. Unsupported/unrecognized argument value type. Type: `' + o.type + '`.' );
			}
		}
		// Check for multiple arguments having the same key...
		isArr = isArray( val );
		if ( isArr && !o.multiple ) {
			throw new Error( 'invalid value. Command-line argument provided multiple times. Argument: `' + key + '`.' );
		}
		// Only allow types which are not `boolean` and explicitly allowed to be provided multiple times to have their values stored in an array, always.
		if (
			o.type !== 'boolean' &&
			isArr === false &&
			o.multiple === true
		) {
			val = [ val ];
			isArr = true;
		}
		// If a value is an array, iterate over each element to ensure all elements are the same type...
		if ( isArr ) {
			N = val.length;
			for ( j = 0; j < N; j++ ) {
				tmp = parse( val[ j ], o );
				if ( tmp instanceof Error ) {
					throw error( tmp, key );
				}
				val[ j ] = tmp;
			}
		} else {
			val = parse( val, o );
			if ( val instanceof Error ) {
				throw error( val, key );
			}
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
