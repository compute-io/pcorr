'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pcorr = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-pcorr', function tests() {

	it( 'should export a function', function test() {
		expect( pcorr ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided any arguments', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			pcorr();
		}
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			true,
			NaN,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				pcorr( value );
			};
		}
	});

	it( 'should throw an error if not provided arrays of equal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			pcorr( [1,2,3], [1,2] );
		}
	});

	it( 'should return a zero matrix if array length is less than 2', function test() {
		var x, y, expected, actual;

		x = [ 1 ];
		y = [ -1 ];

		expected = [ [0,0], [0,0] ];
		actual = pcorr( x, y );

		assert.deepEqual( actual, expected );
	});

	it( 'should compute the Pearson product-moment correlation coefficient matrix', function test() {
		var x, y, z, i, j, expected, actual;

		x = [ 10, -10 ];
		y = [ -15, 15 ];

		expected = [ [1,-1],[-1,1] ];
		actual = pcorr( x, y );

		for ( i = 0; i < actual.length; i++ ) {
			for ( j = 0; j < actual[i].length; j++ ) {
				assert.closeTo( actual[i][j], expected[i][j], 1e-10 );
			}
		}

		x = [ 3, -2, 5, 4 ];
		y = [ 6, -2, 3, -1 ];

		expected = [ [1,0.522013311509168], [0.522013311509168,1] ];
		actual = pcorr( x, y );

		for ( i = 0; i < actual.length; i++ ) {
			for ( j = 0; j < actual[i].length; j++ ) {
				assert.closeTo( actual[i][j], expected[i][j], 1e-10 );
			}
		}

		x = [ -1, -2, 4 ];
		y = [ 1, 3, 0 ];
		z = [ 2, 1, 3 ];

		expected = [
			[ 1, -0.848555291627663, 0.933256525257383 ],
			[ -0.848555291627663, 1,   -0.981980506061966 ],
			[ 0.933256525257383, -0.981980506061966, 1 ]
		];
		actual = pcorr( x, y, z );

		for ( i = 0; i < actual.length; i++ ) {
			for ( j = 0; j < actual[i].length; j++ ) {
				assert.closeTo( actual[i][j], expected[i][j], 1e-10 );
			}
		}
	});

	it( 'should compute the correlation matrix when provided an array of arrays', function test() {
		var data, i, j, expected, actual;

		data = [ [10,-10], [-15,15] ];

		expected = [ [1,-1],[-1,1] ];
		actual = pcorr( data );

		for ( i = 0; i < actual.length; i++ ) {
			for ( j = 0; j < actual[i].length; j++ ) {
				assert.closeTo( actual[i][j], expected[i][j], 1e-10 );
			}
		}
	});

	it( 'should account for floating point errors and enforce a strict upper and lower bound: [-1,1]', function test() {
		var data, i, j, expected, actual;

		// Correlation exceeding -1...
		data = [
			[ 14, 90, 62, 17, 56, 19, 66, 13, 17, 57 ],
			[ 86, 10, 38, 83, 44, 81, 34, 87, 83, 43 ]
		];

		expected = [ [1,-1],[-1,1] ];
		actual = pcorr( data );

		for ( i = 0; i < actual.length; i++ ) {
			for ( j = 0; j < actual[i].length; j++ ) {
				assert.closeTo( actual[i][j], expected[i][j], 1e-10 );
			}
		}

		// Correlation exceeding +1...
		data = [
			[ 55, 81, 54, 98, 80, 45, 38, 43, 95, 67 ],
			[ 55, 81, 54, 98, 80, 45, 38, 43, 95, 67 ]
		];

		expected = [ [1,1],[1,1] ];
		actual = pcorr( data );

		for ( i = 0; i < actual.length; i++ ) {
			for ( j = 0; j < actual[i].length; j++ ) {
				assert.closeTo( actual[i][j], expected[i][j], 1e-10 );
			}
		}
	});

});
