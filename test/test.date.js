/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var parse = require( './../lib/date.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'date', function tests() {

	it( 'should export a function', function test() {
		expect( parse ).to.be.a( 'function' );
	});

	it( 'should parse valid date strings', function test() {
		var values;
		var actual;
		var i;

		values = [
			'Mon, 25 Dec 1995 13:30:00 GMT',
			'Mon, 25 Dec 1995 13:30:00 +0430',
			'Dec 25, 1995',
			'2011-10-10',
			'2011-10-10T14:48:00'
		];

		for ( i = 0; i < values.length; i++ ) {
			actual = parse( values[ i ] );
			assert.isTrue( actual instanceof Date );
		}
	});

	it( 'should return an error if unable to parse a string as a date', function test() {
		var err = parse( 'beepboop' );
		assert.isTrue( err instanceof TypeError );
	});

});
