/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var map = require( './fixtures/argv.json' );
var opts = require( './../lib/opts.js' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'opts', function tests() {

	it( 'should export a function', function test() {
		expect( opts ).to.be.a( 'function' );
	});

	it( 'should map a command-line argument mapping to an options object', function test() {
		var expected;
		var actual;

		expected = {
			'string': [
				'env',
				'port',
				'loglevel',
				'num',
				'int',
				'obj',
				'arr',
				'default',
				'nested',
				'date',
				'regex',
				'custom',
				'unrecognized_type'
			],
			'boolean': [
				'ssl',
				'bool',
				'bool2',
				'bool3'
			],
			'alias': {
				'port': [
					'p'
				]
			},
			'default': {
				'env': 'dev',
				'loglevel': 'info',
				'port': 8080,
				'default': null,
				'bool': false,
				'bool2': true
			}
		};

		actual = opts( map );
		assert.deepEqual( actual, expected );
	});

});
