/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/integer.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'integer', function tests() {

	it( 'should export a function', function test() {
		expect( parse ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values;
		var err;
		var i;

		values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = parse( '5', values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided an invalid option', function test() {
		var values;
		var err;
		var i;

		values = [
			'5',
			NaN,
			true,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = parse( '5', {
				'radix': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should parse integers', function test() {
		var expected;
		var values;
		var actual;
		var i;

		values = [
			'5',
			'1000',
			'0',
			'-1',
			'-1000'
		];
		expected = [
			5,
			1000,
			0,
			-1,
			-1000
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = parse( values[ i ] );
			assert.strictEqual( actual, expected[ i ], values[ i ] );

			actual = parse( values[ i ], {} );
			assert.strictEqual( actual, expected[ i ], values[ i ] );
		}
	});

	it( 'should return an error if unable to parse a string as an integer', function test() {
		var err = parse( 'beepboop' );
		assert.isTrue( err instanceof TypeError );
	});

	it( 'should return an integer value provided a radix', function test() {
		var v = parse( '1', {
			'radix': 2
		});
		assert.strictEqual( v, 1 );
	});

});
