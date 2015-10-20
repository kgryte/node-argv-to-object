'use strict';

var argv = require( './../lib' ),
	map = require( './argv.json' );

var out = argv( map );
console.dir( out );
/*
	{
		'env': 'dev',
		'server': {
			'ssl': true,
			'port': 7331
		},
		'logger': {
			'level': 'debug'
		},
		'num': 3.14,
		'obj': {
			'hello': 'world'
		},
		'arr': [ 1, 2, 3, 4 ],
		'nested': {
			'a': {
				'b': {
					'c': {
						'd': {
							'beep': 'boop'
						}
					}
				}
			}
		},
		'date': <Date>,
		're': /\w+/
	}
*/
