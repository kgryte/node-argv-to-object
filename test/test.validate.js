/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var noop = require( '@kgryte/noop' );
var validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

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

	it( 'should return an error if provided a `parsers` option which is not an object', function test() {
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
			err = validate( {}, {
				'parsers': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a parser which is not a function', function test() {
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
			{}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'parsers': {
					'my_type': values[ i ]
				}
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return `null` if provided valid options', function test() {
		var err;

		err = validate( {}, {
			'parsers': {
				'my_type': noop
			}
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
