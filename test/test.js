/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var map = require( './fixtures/argv.json' );
var argv = require( './../lib' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'argv-to-object', function tests() {

	it( 'should export a function', function test() {
		expect( argv ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a map object', function test() {
		var values;
		var i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			function(){},
			[]
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				argv( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid options argument', function test() {
		var values;
		var i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			function(){},
			[]
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				argv( {}, value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values;
		var i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			function(){},
			[]
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				argv( {}, {
					'parsers': value
				});
			};
		}
	});

	it( 'should return a configuration object', function test() {
		var expected;
		var actual;
		var o;

		expected = {
			'env': 'test',
			'server': {
				'port': 7331,
				'ssl': true
			},
			'logger': {
				'level': 'debug'
			},
			'num': 5.5,
			'obj': {
				'hello': 'world'
			},
			'arr': [1,2,3,'4'],
			'a': {
				'b': {
					'c': {
						'd': {
							'be': 'bop'
						}
					}
				}
			},
			'date': new Date( '2015-10-18' ),
			're': /\w+/,
			'int': -11,
			'bool': false,
			'bool2': true,
			'default': null
		};

		o = process.argv;
		process.argv = [
			null,
			null,
			'--env=test',
			'--ssl',
			'-p',
			'7331',
			'--loglevel=debug',
			'--num=5.5',
			'--obj',
			'{"hello":"world"}',
			'--arr=[1,2,3,"4"]',
			'--nested={"be":"bop"}',
			'--date=2015-10-18',
			'--regex',
			'/\\w+/',
			'--int=-11'
		];

		actual = argv( map );

		assert.deepEqual( actual, expected );

		process.argv = o;
	});

	it( 'should support custom type parsers', function test() {
		var expected;
		var actual;
		var o;

		o = process.argv;
		process.argv = [
			null,
			null,
			'--custom',
			'5'
		];

		expected = {
			'server': {
				'port': 8080
			},
			'env': 'dev',
			'logger': {
				'level': 'info'
			},
			'bool': false,
			'bool2': true,
			'default': null,
			'custom': 30
		};
		actual = argv( map, {
			'parsers': {
				'custom_type': parse
			}
		});
		assert.deepEqual( actual, expected );

		process.argv = o;

		function parse( str ) {
			return parseFloat( str ) * 6;
		}
	});

	it( 'should throw an error if a command-line argument cannot be parsed as a specified type', function test() {
		var o;

		o = process.argv;
		process.argv = [
			null,
			null,
			'--int=beepboop'
		];
		expect( badValue ).to.throw( TypeError );
		process.argv = o;

		function badValue() {
			argv( map );
		}
	});

	it( 'should throw an error if a command-line argument has an unrecognized/unsupported type', function test() {
		var o;

		o = process.argv;
		process.argv = [
			null,
			null,
			'--unrecognized_type=beepboop'
		];
		expect( badValue ).to.throw( Error );
		process.argv = o;

		function badValue() {
			argv( map );
		}
	});

	it( 'should handle `--no-*` command-line arguments (override default)', function test() {
		var expected;
		var o;

		o = process.argv;

		expected = {
			'server': {
				'port': 8080
			},
			'env': 'dev',
			'logger': {
				'level': 'info'
			},
			'bool': false,
			'bool2': false,
			'default': null
		};
		process.argv = [
			null,
			null,
			'--no-bool2'
		];

		assert.deepEqual( argv( map ), expected );

		process.argv = o;
	});

	it( 'should handle `--no-*` command-line arguments (no default)', function test() {
		var expected;
		var o;

		o = process.argv;

		expected = {
			'server': {
				'port': 8080
			},
			'env': 'dev',
			'logger': {
				'level': 'info'
			},
			'bool': false,
			'bool2': true,
			'default': null
		};
		process.argv = [
			null,
			null,
			'--no-bool3'
		];

		assert.deepEqual( argv( map ), expected );

		process.argv = o;
	});

	it( 'should handle repeated arguments (strings)', function test() {
		var expected;
		var o;

		o = process.argv;

		expected = {
			'server': {
				'port': 8080
			},
			'env': 'dev',
			'logger': {
				'level': 'info'
			},
			'bool': false,
			'bool2': true,
			'default': null,
			'mstr': [
				'beep',
				'boop',
				'bop',
				'bap'
			]
		};
		process.argv = [
			null,
			null,
			'--mstr=beep',
			'--mstr',
			'boop',
			'--mstr=bop',
			'--mstr',
			'bap'
		];

		assert.deepEqual( argv( map ), expected );

		process.argv = o;
	});

	it( 'should handle repeated arguments (strings)', function test() {
		var expected;
		var o;

		o = process.argv;

		expected = {
			'server': {
				'port': 8080
			},
			'env': 'dev',
			'logger': {
				'level': 'info'
			},
			'bool': false,
			'bool2': true,
			'default': null,
			'mstr': [
				'beep'
			]
		};
		process.argv = [
			null,
			null,
			'--mstr=beep'
		];

		assert.deepEqual( argv( map ), expected );

		process.argv = o;
	});

	it( 'should handle repeated arguments (numbers)', function test() {
		var expected;
		var o;

		o = process.argv;

		expected = {
			'server': {
				'port': 8080
			},
			'env': 'dev',
			'logger': {
				'level': 'info'
			},
			'bool': false,
			'bool2': true,
			'default': null,
			'mnum': [ 1, 2, 3, 4 ]
		};
		process.argv = [
			null,
			null,
			'--mnum=1',
			'--mnum',
			'2',
			'--mnum=3',
			'--mnum',
			'4'
		];

		assert.deepEqual( argv( map ), expected );

		process.argv = o;
	});

	it( 'should handle repeated arguments where one or more arguments is invalid', function test() {
		var o;

		o = process.argv;

		process.argv = [
			null,
			null,
			'--mnum=1',
			'--mnum',
			'2',
			'--mnum=beep',
			'--mnum',
			'4'
		];

		expect( badValue ).to.throw( TypeError );

		process.argv = o;

		function badValue() {
			argv( map );
		}
	});

	it( 'should handle repeated arguments where the `multiple` option is falsey', function test() {
		var o;

		o = process.argv;

		process.argv = [
			null,
			null,
			'--num=1',
			'--num',
			'2',
			'--num=beep',
			'--num',
			'4'
		];

		expect( badValue ).to.throw( Error );

		process.argv = o;

		function badValue() {
			argv( map );
		}
	});

	it( 'should handle repeated arguments (booleans)', function test() {
		var expected;
		var o;

		o = process.argv;

		expected = {
			'server': {
				'port': 8080
			},
			'env': 'dev',
			'logger': {
				'level': 'info'
			},
			'bool': false,
			'bool2': true,
			'default': null,
			'mbool': true
		};
		process.argv = [
			null,
			null,
			'--mbool',
			'--mbool',
			'--mbool',
			'--mbool'
		];

		assert.deepEqual( argv( map ), expected );

		process.argv = o;
	});

	it( 'should return an object containing only default values if no command-line arguments map those specified in the mapping object', function test() {
		var expected;
		var o;

		o = process.argv;

		expected = {
			'server': {
				'port': 8080
			},
			'env': 'dev',
			'logger': {
				'level': 'info'
			},
			'bool': false,
			'bool2': true,
			'default': null
		};
		process.argv = [ null, null ];

		assert.deepEqual( argv( map ), expected );

		process.argv = o;
	});

});
