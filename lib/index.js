/**
*
*	COMPUTE: pcorr
*
*
*	DESCRIPTION:
*		- Computes Pearson product-moment correlation coefficients between one or more numeric arrays.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// LINEAR CORRELATION //

/**
* FUNCTION: pcorr( arr1[, arr2,...] )
*	Computes Pearson product-moment correlation coefficients between one or more numeric arrays.
*
* @param {...Array} arr - numeric array
* @returns {Array} correlation matrix
*/
function pcorr() {
	var args,
		nArgs,
		len,
		deltas,
		delta,
		means,
		stdevs,
		C,
		cov,
		corr,
		arr,
		N, r, A, B, sum, val, sigma,
		i, j, n;

	args = Array.prototype.slice.call( arguments );
	nArgs = args.length;

	if ( !nArgs ) {
		throw new Error( 'pcorr()::insufficient input arguments. Must provide array arguments.' );
	}
	for ( i = 0; i < nArgs; i++ ) {
		if ( !Array.isArray( args[i] ) ) {
			throw new TypeError( 'pcorr()::invalid input argument. Must provide array arguments.' );
		}
	}
	if ( Array.isArray( args[0][0] ) ) {
		// If the first argument is an array of arrays, calculate the correlation matrix over the nested arrays, disregarding any other arguments...
		args = args[ 0 ];
	}
	nArgs = args.length;
	len = args[ 0 ].length;
	for ( i = 1; i < nArgs; i++ ) {
		if ( args[i].length !== len ) {
			throw new Error( 'pcorr()::invalid input argument. All arrays must have equal length.' );
		}
	}
	// [0] Initialization...
	deltas = new Array( nArgs );
	means = new Array( nArgs );
	stdevs = new Array( nArgs );
	C = new Array( nArgs );
	cov = new Array( nArgs );
	corr = new Array( nArgs );
	for ( i = 0; i < nArgs; i++ ) {
		means[ i ] = args[ i ][ 0 ];
		arr = new Array( nArgs );
		for ( j = 0; j < nArgs; j++ ) {
			arr[ j ] = 0;
		}
		C[ i ] = arr;
		cov[ i ] = arr.slice(); // copy!
		corr[ i ] = arr.slice(); // copy!
	}
	if ( len < 2 ) {
		return corr;
	}
	// [1] Compute the covariance...
	for ( n = 1; n < len; n++ ) {

		N = n + 1;
		r = n / N;

		// [a] Extract the values and compute the deltas...
		for ( i = 0; i < nArgs; i++ ) {
			deltas[ i ] = args[ i ][ n ] - means[ i ];
		}

		// [b] Update the covariance between one array and every other array...
		for ( i = 0; i < nArgs; i++ ) {
			arr = C[ i ];
			delta = deltas[ i ];
			for ( j = i; j < nArgs; j++ ) {
				A = arr[ j ];
				B = r * delta * deltas[ j ];
				sum = A + B;
				// Exploit the fact that the covariance matrix is symmetric...
				if ( i !== j ) {
					C[ j ][ i ] = sum;
				}
				arr[ j ] = sum;
			} // end FOR j
		} // end FOR i

		// [c] Update the means...
		for ( i = 0; i < nArgs; i++ ) {
			means[ i ] += deltas[ i ] / N;
		}
	} // end FOR n

	// [2] Normalize the co-moments...
	n = N - 1;
	for ( i = 0; i < nArgs; i++ ) {
		arr = C[ i ];
		for ( j = i; j < nArgs; j++ ) {
			val = arr[ j ] / n;
			cov[ i ][ j ] = val;
			if ( i !== j ) {
				cov[ j ][ i ] = val;
			}
		}
	}

	// [3] Compute the standard deviations...
	for ( i = 0; i < nArgs; i++ ) {
		// Diagonal elements of covariance matrix...
		stdevs[ i ] = Math.sqrt( cov[i][i] );
	}

	// [4] Set the diagonal elements to 1:
	for ( i = 0; i < nArgs; i++ ) {
		corr[ i ][ i ] = 1;
	}

	// [5] Compute the correlation coefficients...
	for ( i = 0; i < nArgs; i++ ) {
		arr = cov[ i ];
		sigma = stdevs[ i ];
		for ( j = i+1; j < nArgs; j++ ) {
			val = arr[ j ] / ( sigma*stdevs[j] );
			// Address floating point errors introduced by taking the sqrt and enforce strict [-1,1] bounds...
			if ( val > 1 ) {
				val = 1;
			} else if ( val < -1 ) {
				val = -1;
			}
			corr[ i ][ j ] = val;
			corr[ j ][ i ] = val;
		}
	}
	return corr;
} // end FUNCTION pcorr()


// EXPORTS //

module.exports = pcorr;
