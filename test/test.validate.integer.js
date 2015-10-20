/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var validate = require( './../lib/validate.integer.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'validate: integer', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
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
			undefined,
			null,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a radix which is not an integer', function test() {
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
			err = validate( {}, {
				'radix': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a radix which is not on the interval [2,36]', function test() {
		var values;
		var err;
		var i;

		values = [
			1,
			37,
			0,
			-10,
			100
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'radix': values[ i ]
			});
			assert.isTrue( err instanceof RangeError );
		}
	});

	it( 'should return `null` if provided valid options', function test() {
		var err;

		err = validate( {}, {
			'radix': 16
		});
		assert.isNull( err );

		// Misc options:
		err = validate( {}, {
			'beep': 'boop',
			'bap': 'bup'
		});
		assert.isNull( err );
	});

});
