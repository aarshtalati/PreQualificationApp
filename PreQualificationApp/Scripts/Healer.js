/*!
 * 
 * Prepared By	:	Aarsh Talati
 * Crated		:	09/29/2014
 * Modified		:	09/29/2014
 * 
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 * 
 */

(function () {
	if (!window.console) {
		window.console = {};
	}
	// union of Chrome, FF, IE, and Safari console methods
	var m = [
	  "log", "info", "warn", "error", "debug", "trace", "dir", "group",
	  "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
	  "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
	];
	// define undefined methods as noops to prevent errors
	for (var i = 0; i < m.length; i++) {
		if (!window.console[m[i]]) {
			window.console[m[i]] = function () { };
		}
	}
})();


/*
 * 
 * MDN polyfills
 * 
 */


// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) {

		var k;

		// 1. Let O be the result of calling ToObject passing
		//    the this value as the argument.
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}

		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get
		//    internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if (n >= len) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		// 9. Repeat, while k < len
		while (k < len) {
			var kValue;
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of O with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.15
// Reference: http://es5.github.io/#x15.4.4.15
if (!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function (searchElement /*, fromIndex*/) {
		'use strict';

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var n, k,
		  t = Object(this),
		  len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}

		n = len - 1;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) {
				n = 0;
			}
			else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}

		for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n) ; k >= 0; k--) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}

//			// alternative polyfil implementation :
//			if (!Array.prototype.indexOf) {
//				Array.prototype.indexOf = function (elem, startFrom) {
//					var startFrom = startFrom || 0;
//					if (startFrom > this.length) return -1;

//					for (var i = 0; i < this.length; i++) {
//						if (this[i] == elem && startFrom <= i) {
//							return i;
//						} else if (this[i] == elem && startFrom > i) {
//							return -1;
//						}
//					}
//					return -1;
//				}
//			}



// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

	Array.prototype.forEach = function (callback, thisArg) {

		var T, k;

		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let k be 0
		k = 0;

		// 7. Repeat, while k < len
		while (k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
				kValue = O[k];

				// ii. Call the Call internal method of callback with T as the this value and
				// argument list containing kValue, k, and O.
				callback.call(T, kValue, k, O);
			}
			// d. Increase k by 1.
			k++;
		}
		// 8. return undefined
	};
}

if (!Array.prototype.every) {
	Array.prototype.every = function (callbackfn, thisArg) {
		'use strict';
		var T, k;

		if (this == null) {
			throw new TypeError('this is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing the this 
		//    value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method
		//    of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (typeof callbackfn !== 'function') {
			throw new TypeError();
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let k be 0.
		k = 0;

		// 7. Repeat, while k < len
		while (k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal 
			//    method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal method
				//    of O with argument Pk.
				kValue = O[k];

				// ii. Let testResult be the result of calling the Call internal method
				//     of callbackfn with T as the this value and argument list 
				//     containing kValue, k, and O.
				var testResult = callbackfn.call(T, kValue, k, O);

				// iii. If ToBoolean(testResult) is false, return false.
				if (!testResult) {
					return false;
				}
			}
			k++;
		}
		return true;
	};
}

if (!Array.prototype.filter) {
	Array.prototype.filter = function (fun/*, thisArg*/) {
		'use strict';

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t)) {
					res.push(val);
				}
			}
		}

		return res;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
	Array.prototype.some = function (fun /*, thisArg*/) {
		'use strict';

		if (this == null) {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}

		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
			}
		}

		return false;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {
	Array.prototype.map = function (callback, thisArg) {

		var T, A, k;

		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}

		// 1. Let O be the result of calling ToObject passing the |this| 
		//    value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal 
		//    method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== "function") {
			throw new TypeError(callback + " is not a function");
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let A be a new array created as if by the expression new Array(len) 
		//    where Array is the standard built-in constructor with that name and 
		//    len is the value of len.
		A = new Array(len);

		// 7. Let k be 0
		k = 0;

		// 8. Repeat, while k < len
		while (k < len) {

			var kValue, mappedValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal 
			//    method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal 
				//    method of O with argument Pk.
				kValue = O[k];

				// ii. Let mappedValue be the result of calling the Call internal 
				//     method of callback with T as the this value and argument 
				//     list containing kValue, k, and O.
				mappedValue = callback.call(T, kValue, k, O);

				// iii. Call the DefineOwnProperty internal method of A with arguments
				// Pk, Property Descriptor 
				// { Value: mappedValue, 
				//   Writable: true, 
				//   Enumerable: true, 
				//   Configurable: true },
				// and false.

				// In browsers that support Object.defineProperty, use the following:
				// Object.defineProperty(A, k, { 
				//   value: mappedValue, 
				//   writable: true, 
				//   enumerable: true, 
				//   configurable: true 
				// });

				// For best browser support, use the following:
				A[k] = mappedValue;
			}
			// d. Increase k by 1.
			k++;
		}

		// 9. return A
		return A;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
	Array.prototype.reduce = function (callback /*, initialValue*/) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.reduce called on null or undefined');
		}
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		var t = Object(this), len = t.length >>> 0, k = 0, value;
		if (arguments.length == 2) {
			value = arguments[1];
		} else {
			while (k < len && !k in t) {
				k++;
			}
			if (k >= len) {
				throw new TypeError('Reduce of empty array with no initial value');
			}
			value = t[k++];
		}
		for (; k < len; k++) {
			if (k in t) {
				value = callback(value, t[k], k, t);
			}
		}
		return value;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.22
// Reference: http://es5.github.io/#x15.4.4.22
if ('function' !== typeof Array.prototype.reduceRight) {
	Array.prototype.reduceRight = function (callback /*, initialValue*/) {
		'use strict';
		if (null === this || 'undefined' === typeof this) {
			throw new TypeError('Array.prototype.reduce called on null or undefined');
		}
		if ('function' !== typeof callback) {
			throw new TypeError(callback + ' is not a function');
		}
		var t = Object(this), len = t.length >>> 0, k = len - 1, value;
		if (arguments.length >= 2) {
			value = arguments[1];
		} else {
			while (k >= 0 && !k in t) {
				k--;
			}
			if (k < 0) {
				throw new TypeError('Reduce of empty array with no initial value');
			}
			value = t[k--];
		}
		for (; k >= 0; k--) {
			if (k in t) {
				value = callback(value, t[k], k, t);
			}
		}
		return value;
	};
}

// Array.prototype.contains()
// Reference : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/contains#Polyfill
if (![].contains) {
	try {
		Object.defineProperty(Array.prototype, 'contains', {
			enumerable: false,
			configurable: true,
			writable: true,
			value: function (searchElement/*, fromIndex*/) {
				if (this === undefined || this === null) {
					throw new TypeError('Cannot convert this value to object');
				}
				var O = Object(this);
				var len = parseInt(O.length) || 0;
				if (len === 0) { return false; }
				var n = parseInt(arguments[1]) || 0;
				if (n >= len) { return false; }
				var k;
				if (n >= 0) {
					k = n;
				} else {
					k = len + n;
					if (k < 0) k = 0;
				}
				while (k < len) {
					var currentElement = O[k];
					if (searchElement === currentElement ||
						searchElement !== searchElement && currentElement !== currentElement
					) {
						return true;
					}
					k++;
				}
				return false;
			}
		});
	} catch (e) {
		// IE 8 would suck again ... 
		Array.prototype.contains = function (searchElement/*, fromIndex*/) {
			if (this === undefined || this === null) {
				throw new TypeError('Cannot convert this value to object');
			}
			var O = Object(this);
			var len = parseInt(O.length) || 0;
			if (len === 0) { return false; }
			var n = parseInt(arguments[1]) || 0;
			if (n >= len) { return false; }
			var k;
			if (n >= 0) {
				k = n;
			} else {
				k = len + n;
				if (k < 0) k = 0;
			}
			while (k < len) {
				var currentElement = O[k];
				if (searchElement === currentElement ||
					searchElement !== searchElement && currentElement !== currentElement
				) {
					return true;
				}
				k++;
			}
			return false;
		}
	}
}

//'use strict';

//// Add ECMA262-5 method binding if not supported natively
////
//if (!('bind' in Function.prototype)) {
//	Function.prototype.bind = function (owner) {
//		var that = this;
//		if (arguments.length <= 1) {
//			return function () {
//				return that.apply(owner, arguments);
//			};
//		} else {
//			var args = Array.prototype.slice.call(arguments, 1);
//			return function () {
//				return that.apply(owner, arguments.length === 0 ? args : args.concat(Array.prototype.slice.call(arguments)));
//			};
//		}
//	};
//}

//// Add ECMA262-5 string trim if not supported natively

//if (!('trim' in String.prototype)) {
//	String.prototype.trim = function () {
//		return this.replace(/^\s+/, '').replace(/\s+$/, '');
//	};
//}

//// Add ECMA262-5 Array methods if not supported natively

//if (!('indexOf' in Array.prototype)) {
//	Array.prototype.indexOf = function (find, i /*opt*/) {
//		if (i === undefined) i = 0;
//		if (i < 0) i += this.length;
//		if (i < 0) i = 0;
//		for (var n = this.length; i < n; i++)
//			if (i in this && this[i] === find)
//				return i;
//		return -1;
//	};
//}
//if (!('lastIndexOf' in Array.prototype)) {
//	Array.prototype.lastIndexOf = function (find, i /*opt*/) {
//		if (i === undefined) i = this.length - 1;
//		if (i < 0) i += this.length;
//		if (i > this.length - 1) i = this.length - 1;
//		for (i++; i-- > 0;) /* i++ because from-argument is sadly inclusive */
//			if (i in this && this[i] === find)
//				return i;
//		return -1;
//	};
//}
//if (!('forEach' in Array.prototype)) {
//	Array.prototype.forEach = function (action, that /*opt*/) {
//		for (var i = 0, n = this.length; i < n; i++)
//			if (i in this)
//				action.call(that, this[i], i, this);
//	};
//}
//if (!('map' in Array.prototype)) {
//	Array.prototype.map = function (mapper, that /*opt*/) {
//		var other = new Array(this.length);
//		for (var i = 0, n = this.length; i < n; i++)
//			if (i in this)
//				other[i] = mapper.call(that, this[i], i, this);
//		return other;
//	};
//}
//if (!('filter' in Array.prototype)) {
//	Array.prototype.filter = function (filter, that /*opt*/) {
//		var other = [], v;
//		for (var i = 0, n = this.length; i < n; i++)
//			if (i in this && filter.call(that, v = this[i], i, this))
//				other.push(v);
//		return other;
//	};
//}
//if (!('every' in Array.prototype)) {
//	Array.prototype.every = function (tester, that /*opt*/) {
//		for (var i = 0, n = this.length; i < n; i++)
//			if (i in this && !tester.call(that, this[i], i, this))
//				return false;
//		return true;
//	};
//}
//if (!('some' in Array.prototype)) {
//	Array.prototype.some = function (tester, that /*opt*/) {
//		for (var i = 0, n = this.length; i < n; i++)
//			if (i in this && tester.call(that, this[i], i, this))
//				return true;
//		return false;
//	};
//}
