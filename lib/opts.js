'use strict';

/**
* FUNCTION: opts( map )
*	Maps a command-line argument mapping to an options object.
*
* @param {Object} map - command-line argument mapping
* @returns {Object} options object
*/
function opts( map ) {
	var out = {};
	var keys;
	var len;
	var key;
	var i;
	var o;

	out.string = [];
	out.boolean = [];
	out.alias = {};
	out.default = {};

	keys = Object.keys( map );
	len = keys.length;
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		o = map[ key ];
		if ( o.type === 'boolean' ) {
			out.boolean.push( key );
		} else {
			out.string.push( key );
		}
		if ( o.alias !== void 0 ) {
			out.alias[ key ] = o.alias;
		}
		if ( o.default !== void 0 ) {
			out.default[ key ] = o.default;
		}
	}
	return out;
} // end FUNCTION opts()


// EXPORTS //

module.exports = opts;
