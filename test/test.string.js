/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/string.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'string', function tests() {

	it( 'should export a function', function test() {
		expect( parse ).to.be.a( 'function' );
	});

	it( 'should parse strings', function test() {
		var expected;
		var values;
		var actual;
		var i;

		values = [
			'beep',
			'boop',
			'bop',
			'bap',
			'Hello world'
		];
		expected = [
			'beep',
			'boop',
			'bop',
			'bap',
			'Hello world'
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = parse( values[ i ] );
			assert.strictEqual( actual, expected[ i ], values[ i ] );
		}
	});

});
