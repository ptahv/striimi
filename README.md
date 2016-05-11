# striimi

Striimi is a simple streaming library for emiting values to everyone who's listening the stream.

## Api

### createStream

```js 
const striimi = createStream(initValue, filterFn)
```

`initValue`

First value of the stream.

`filterFn`

Function which gets called on emit and receives newValue and oldValue as parameters. If filterFn returns false, emit is cancelled.

Returns a striimi stream.

#### striimi

Striimi is type of object.

`subscribe`

A function can be subscribed to the stream. When using subscribe, the subscribed function will be called with current stream value immediately. 

A subscription can be disposed by invoking the subscription.

```js 

import {createStream} from 'striimi';

const striimi = createStream('This value');

const subscription = striimi.subscribe(val => console.log(val + ' called immediately on subscribe'));

subscription();

// Logs "This value called immediately on subscribe" and disposes the subscription

```

`listen`

A function can listen to the streams changes. When using listen, the listener function will not be called with current stream value immediately.

A subscription can be disposed by invoking the subscription.


```js 

import {createStream} from 'striimi';

const striimi = createStream('This value');

const subscription = striimi.listen(val => console.log(val + ' not called immediately on listen'));

subscription();

// Does not log anything and disposes the subscription

```

`dispose`

Clears streams value and listeners

```js 

import {createStream} from 'striimi';

const striimi = createStream('This value');

striimi.dispose();

```

`emit`

Used to pass value to listener functions.

```js 

import {createStream} from 'striimi';

const striimi = createStream('This value');

const subscription = striimi.listen(val => console.log(val + ' not called immediately on listen'));

striimi.emit('Later value')

subscription();

// Logs "Later value not called immediately on listen" and disposes the subscription


```

`refresh`

Refreshes the stream by calling listener functions with current values.

```js 

import {createStream} from 'striimi';

const striimi = createStream('This value');

const subscription = striimi.listen(val => console.log(val + ' not called immediately on listen'));

striimi.refresh()

subscription();

// Logs "This value not called immediately on listen" and disposes the subscription

```

`reset`

Resets the stream value to stream initialize value.

```js 

import {createStream} from 'striimi';

const striimi = createStream('This value');

const subscription = striimi.listen(val => console.log(val + ' not called immediately on listen'));

striimi.emit('Later value')
striimi.reset();
striimi.refresh();

subscription();

// Logs "Later value not called immediately on listen", resets the stream, refreshes it and logs "This value not called immediately on listen". Lastly disposes the subscription.

```

`getValue`

Returns the streams current value

```js 

import {createStream} from 'striimi';

const striimi = createStream('This value');

const streamValue = striimi.getValue();

console.log(streamValue);

subscription();

// Logs "This value" and disposes the subscription.

```

