/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var error = require( './../lib/error.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'error', function tests() {

	it( 'should export a function', function test() {
		expect( error ).to.be.a( 'function' );
	});

	it( 'should return a TypeError if provided a TypeError', function test() {
		var err = error( new TypeError( 'beep' ), 'boop' );
		assert.isTrue( err instanceof TypeError );
	});

	it( 'should return a RangeError if provided a RangeError', function test() {
		var err = error( new RangeError( 'beep' ), 'boop' );
		assert.isTrue( err instanceof RangeError );
	});

	it( 'should return an Error if provided a generic Error', function test() {
		var err = error( new Error( 'beep' ), 'boop' );
		assert.isTrue( err instanceof Error );
		assert.isFalse( err instanceof TypeError );
		assert.isFalse( err instanceof RangeError );
	});

});
