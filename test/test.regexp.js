/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/regexp.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'regexp', function tests() {

	it( 'should export a function', function test() {
		expect( parse ).to.be.a( 'function' );
	});

	it( 'should parse valid regular expression strings', function test() {
		var expected;
		var values;
		var actual;
		var i;

		values = [
			'/\\w+/',
			'/beep/i',
			'/^[A-Z]*$/g',
			'/\\.+/'
		];
		expected = [
			/\w+/,
			/beep/i,
			/^[A-Z]*$/g,
			/\.+/
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = parse( values[ i ] );
			assert.isTrue( actual instanceof RegExp );
			assert.deepEqual( actual, expected[ i ], values[ i ] );
		}
	});

	it( 'should return an error if unable to parse an environment variable specified as a regular expression', function test() {
		var err = parse( 'beepboop' );
		assert.isTrue( err instanceof TypeError );
	});

});
