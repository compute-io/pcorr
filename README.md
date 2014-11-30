Correlation Matrix
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes [Pearson product-moment correlation coefficients](http://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient) between one or more numeric arrays.


## Installation

``` bash
$ npm install compute-pcorr
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var pcorr = require( 'compute-pcorr' );
```

#### pcorr( arr1[, arr2,...] )

Computes [Pearson product-moment correlation coefficients](http://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient) between one or more numeric arrays.

``` javascript
var x = [ 1, 2, 3, 4, 5 ],
	y = [ 5, 4, 3, 2, 1 ];

var mat = pcorr( x, y );
// returns [[1,-1],[-1,1]]
```

Note: for univariate input, the returned [correlation matrix](http://en.wikipedia.org/wiki/Correlation_and_dependence#Correlation_matrices) contains a single element equal to unity.

If the number of arrays is dynamic, you may want the flexibility to compute linear correlation coefficients for an arbitrary `array` collection. To this end, the function also accepts an `array` of `arrays`.

``` javascript
var mat = pcorr( [x,y] );
// returns [[1,-1],[-1,1]]
```


## Notes

__Beware__ of floating point errors. Computing a linear correlation coefficient requires computing square roots and involves division. Both operations can introduce small errors during calculation.

Efforts have been made to ensure no value exceeds `+-1`. Note, however, that perfectly correlated `arrays` are __not__ guaranteed to yield precise correlation coefficients of `+-1`. 


## Examples

``` javascript
var pcorr = require( 'compute-pcorr' );

// Simulate some data...
var N = 100,
	x = new Array( N ),
	y = new Array( N ),
	z = new Array( N );

for ( var i = 0; i < N; i++ ) {
	x[ i ] = Math.round( Math.random()*100 );
	y[ i ] = Math.round( Math.random()*100 );
	z[ i ] = 100 - x[ i ];
}
var mat = pcorr( x, y, z );
console.log( mat );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-pcorr.svg
[npm-url]: https://npmjs.org/package/compute-pcorr

[travis-image]: http://img.shields.io/travis/compute-io/pcorr/master.svg
[travis-url]: https://travis-ci.org/compute-io/pcorr

[coveralls-image]: https://img.shields.io/coveralls/compute-io/pcorr/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/pcorr?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/pcorr.svg
[dependencies-url]: https://david-dm.org/compute-io/pcorr

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/pcorr.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/pcorr

[github-issues-image]: http://img.shields.io/github/issues/compute-io/pcorr.svg
[github-issues-url]: https://github.com/compute-io/pcorr/issues
