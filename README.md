Command-line Arguments
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Maps command-line arguments to a configuration object.


## Installation

``` bash
$ npm install argv-to-object
```


## Usage

``` javascript
var argv = require( 'argv-to-object' );
```

#### argv( map[, options] )

Maps command-line arguments to a configuration `object`.

``` javascript
var map = {
	'env': {
		'keypath': 'argv',
		'type': 'string',
		'default': 'dev'
	},
	'port': {
		'keypath': 'server.port',
		'type': 'integer',
		'default': 8080,
		'alias': [
			'p'
		],
		'radix': 10
	},
	'ssl': {
		'keypath': 'server.ssl',
		'type': 'boolean'
	},
	'loglevel': {
		'keypath': 'logger.level',
		'type': 'string',
		'default': 'info'
	}
};

// --env=test --port 7331 --ssl --loglevel debug
var out = argv( map );
/*
	{
		'env': 'test',
		'server': {
			'port': 7331,
			'ssl': true
		},
		'logger': {
			'level': 'debug'
		}
	}
*/
```

A command-line argument mapping __must__ include a [`keypath`](https://github.com/kgryte/utils-deep-set), which is a dot-delimited `object` path. By default, this module parses a command-line argument value as a `string`. The following [types](#types) are supported:

*	[__string__](#string)
*	[__number__](#number)
*	[__integer__](#integer)
*	[__boolean__](#boolean)
*	[__object__](#object)
*	[__date__](#date)
*	[__regexp__](#regexp)

The `function` accepts the following `options`:

*	__parsers__: an `object` containing command-line argument parsers. Each `key` should correspond to a defined `type`, and each `value` should be a `function` which accepts a command-line argument value and any associated `options`.

	``` javascript
	var map = {
		'custom_type': {
			'keypath': 'custom',
			'type': 'custom',
			... // => options
		}
	};

	var parsers = {
		'custom_type': custom
	};

	function custom( str, opts ) {
		var v = parseInt( str, 10 );
		if ( v !== v ) {
			return new TypeError( 'invalid value. Value must be an integer. Value: `' + str + '`.' );
		}
		return v * 6;
	}

	// --custom_type=5
	var out = argv( map, parsers );
	/*
		{
			'custom': 30
		}
	*/
	```

---
## Types

All command-line argument value `types` support the following `options`:

*	__default__: default value.
*	__alias__: `array` of command-line argument aliases.


===
#### string

Coerce a command-line argument value to a `string`. 

``` javascript
var map = {
	'str': {
		'keypath': 'str',
		'type': 'string'
	}
};

// --str=beep
var out = argv( map );
/*
	{
		'str': 'beep'
	}
*/

// --str=1234
var out = argv( map );
/*
	{
		'str': '1234'
	}
*/
```


===
#### number

Coerce a command-line argument value to a `number`.

	
``` javascript
var map = {
	'num': {
		'keypath': 'num',
		'type': 'number'
	}
};

// --num='3.14'
var out = argv( map );
/*
	{
		'num': 3.14
	}
*/

// --num=bop
var out = argv( map );
// => throws
```


===
#### integer

Coerce a command-line argument value to an `integer`.

``` javascript
var map = {
	'int': {
		'keypath': 'int',
		'type': 'integer'
	}
};

// --int=2
var out = argv( map );
/*
	{
		'int': 2
	}
*/

// --int=beep
var out = argv( map );
// => throws
```

The `integer` type supports the following `options`:

*	__radix__: an `integer` on the interval `[2,36]`. Default: `10`.

	``` javascript
	var map = {
		'int': {
			'keypath': 'int',
			'type': 'integer',
			'radix': 2
		}
	};

	// --int=1
	var out = argv( map );
	/*
		{
			'int': 1
		}
	*/

	// --int=2
	var out = argv( map );
	// => throws
	```


===
#### boolean

Coerce a command-line argument value to a `boolean`.

``` javascript
var map = {
	'bool': {
		'keypath': 'bool',
		'type': 'boolean'
	}
};

// --bool
var out = argv( map );
/*
	{
		'bool': true
	}
*/
```


===
#### object

[Parse](https://github.com/kgryte/utils-json-parse) a command-line argument value as a JSON `object`. Note that a value must be valid [JSON](https://github.com/kgryte/utils-json-parse).

``` javascript
var map = {
	'obj': {
		'keypath': 'obj',
		'type': 'object'
	}
};

// --obj='{"beep":"boop"}'
var out = argv( map );
/*
	{
		'obj': {
			'beep': 'boop'
		}
	}
*/

// --obj='[1,2,3,"4",null]'
var out = argv( map );
/*
	{
		'obj': [ 1, 2, 3, '4', null ]
	}
*/

// --obj='{"beep:"boop"}'
var out = argv( map );
// => throws
```


===
#### date

Coerce a command-line argument to a `Date` object.

``` javascript
var map = {
	'date': {
		'keypath': 'date',
		'type': 'date'
	}
};

// --date='2015-10-17'
var out = argv( map );
/*
	{
		'date': <Date>
	}
*/

// --date=beep
var out = argv( map );
// => throws
```

===
#### regexp

[Parse](https://github.com/kgryte/utils-regex-from-string) a command-line argument as a `RegExp`.

``` javascript
var map = {
	'regexp': {
		'keypath': 're',
		'type': 'regexp'
	}
};

// --regexp='/\\w+/'
var out = argv( map );
/*
	{
		're': /\w+/
	}
*/

// --regexp=beep
var out = argv( map );
// => throws
```



---
## Notes

*	If a command-line argument does __not__ exist and no __default__ value is specified, the corresponding configuration `keypath` will __not__ exist in the output `object`.

	``` javascript
	var map = {
		'unset_argv': {
			'keypath': 'a.b.c'
		}
	};

	var out = argv( map );
	// returns {}
	```


---
## Examples

``` javascript
var argv = require( 'argv-to-object' );

var map = {
	'env': {
		'keypath': 'env',
		'default': 'dev'
	},
	'port': {
		'keypath': 'server.port',
		'type': 'integer',
		'default': 8080,
		'alias': [
			'p'
		],
		'radix': 10
	},
	'ssl': {
		'keypath': 'server.ssl',
		'type': 'boolean'
	},
	'loglevel': {
		'keypath': 'logger.level',
		'type': 'string',
		'default': 'info'
	},
	'num': {
		'keypath': 'num',
		'type': 'number'
	},
	'obj': {
		'keypath': 'obj',
		'type': 'object'
	},
	'arr': {
		'keypath': 'arr',
		'type': 'object'
	},
	'nested': {
		'keypath': 'a.b.c.d',
		'type': 'object'
	},
	'date': {
		'keypath': 'date',
		'type': 'date'
	},
	'regex': {
		'keypath': 're',
		'type': 'regexp'
	}
};

// --env=test --ssl --p 7331 --num='3.14' --obj='{"hello":"world"}' --arr='[1,2,3,4]' --nested='{"beep":"boop"}' --date="2015-10-17" --regex '/\\w+/'
var out = argv( map );
/*
	{
		'env': 'test',
		'server': {
			'ssl': true,
			'port': 7331
		},
		'logger': {
			'level': 'info'
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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js --env=test --ssl --p 7331 --num='3.14' --obj='{"hello":"world"}' --arr='[1,2,3,4]' --nested='{"beep":"boop"}' --date="2015-10-17" --regex '/\\w+/'
```


---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/argv-to-object.svg
[npm-url]: https://npmjs.org/package/argv-to-object

[travis-image]: http://img.shields.io/travis/kgryte/node-argv-to-object/master.svg
[travis-url]: https://travis-ci.org/kgryte/node-argv-to-object

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/node-argv-to-object/master.svg
[codecov-url]: https://codecov.io/github/kgryte/node-argv-to-object?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/node-argv-to-object.svg
[dependencies-url]: https://david-dm.org/kgryte/node-argv-to-object

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/node-argv-to-object.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/node-argv-to-object

[github-issues-image]: http://img.shields.io/github/issues/kgryte/node-argv-to-object.svg
[github-issues-url]: https://github.com/kgryte/node-argv-to-object/issues
