/**
 * @license
 * Copyright 2015-present, Petri Tahvanainen.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

export default (initValue) => {
	let storedValue = initValue;
	let listeners = [];

	return {
		subscribe(listener) {
			listeners = listeners.concat(listener);

			listener(storedValue);

			return () => {
				listeners = listeners.filter(l => l !== listener);
			}
		},

		listen(listener) {
			listeners = listeners.concat(listener);

			return () => {
				listeners = listeners.filter(l => l !== listener);	
			}
		},

		dispose() {
			listeners = null;
			storedValue = null;
		},

		emit(value) {
			storedValue = value;

			if (listeners.length === 0) return;
			
			listeners.map(fn => fn(value))
		},

		refresh() {
			listeners.map(fn => fn(storedValue));
		},

		reset() {
			storedValue = initValue;
		},

		getValue() {
			return storedValue;
		},

		getValues() {
			return storedValue;
		},

		getListeners() {
			return listeners
		}
	}
}