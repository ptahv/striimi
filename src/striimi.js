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

	const emitter = (() => {
		let emitBuffer = [];
		let isEmitting = false;

		return (emitData) => {
			emitBuffer.push(emitData);

			if (isEmitting)
				return;

			isEmitting = true;
			while (emitBuffer.length > 0) {
				const {emitListeners, emitValue} = emitBuffer[0];
				emitListeners.map(fn => fn(emitValue));

				emitBuffer.shift();
			}

			isEmitting = false;
		}
	})();

	let striimi = {
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
			striimi = null;
		},

		emit(value) {
			storedValue = value;

			if (listeners.length === 0) 
				return;

			emitter({
				emitListeners: listeners, 
				emitValue: value
			});

			return striimi;
		},

		refresh() {
			emitter({
				emitListeners: listeners, 
				emitValue: storedValue
			});

			return striimi;
		},

		reset() {
			storedValue = initValue;

			return striimi;
		},

		getValue() {
			return storedValue;
		},

		getValues() {
			return storedValue;
		},

		getListeners() {
			return listeners
		},

		/* Undocumented, not intended for using. Still here if one needs it.. */
		setValue(value) {
			storedValue = value;
			
			return striimi;
		},

		setValues(value) {
			storedValue = value;
			
			return striimi;
		}
	}

	return striimi;
}
