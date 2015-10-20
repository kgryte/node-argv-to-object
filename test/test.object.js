/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/object.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'object', function tests() {

	it( 'should export a function', function test() {
		expect( parse ).to.be.a( 'function' );
	});

	it( 'should parse valid JSON objects', function test() {
		var expected;
		var values;
		var actual;
		var i;

		values = [
			'{"beep":"boop"}',
			'[1,2,3,4]'
		];
		expected = [
			{'beep':'boop'},
			[1,2,3,4]
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = parse( values[ i ] );
			assert.deepEqual( actual, expected[ i ], values[ i ] );
		}
	});

	it( 'should return an error if unable to parse an environment variable specified as an object', function test() {
		var err = parse( '{"beep:"boop"}' );
		assert.isTrue( err instanceof TypeError );
	});

});
