/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'number', function tests() {

	it( 'should export a function', function test() {
		expect( parse ).to.be.a( 'function' );
	});

	it( 'should parse numbers', function test() {
		var expected;
		var values;
		var actual;
		var i;

		values = [
			'5.2',
			'1000',
			'0',
			'-1.5',
			'-1000.123'
		];
		expected = [
			5.2,
			1000,
			0,
			-1.5,
			-1000.123
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = parse( values[ i ] );
			assert.strictEqual( actual, expected[ i ], values[ i ] );

			actual = parse( values[ i ], {} );
			assert.strictEqual( actual, expected[ i ], values[ i ] );
		}
	});

	it( 'should return an error if unable to parse a string as a number', function test() {
		var err = parse( 'beepboop' );
		assert.isTrue( err instanceof TypeError );
	});

});
