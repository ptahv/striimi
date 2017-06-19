# striimi

Striimi is a simple streaming library for emiting values.

## Api

### stream

```js 
import striimi from 'striimi';

const stream = striimi.stream(value);
```

`value`

Value to initialize the stream.

### striimi

Return value of striimi.stream. Striimi subscription can be disposed by invoking the subscription.

`subscribe`

A function can be subscribed to the stream. Subscribed function will be immediately called with the current stream value.

```js 

import {stream} from 'striimi';

const striimi = stream('This value');

const subscription = striimi.subscribe(val => console.log(val + 'is called immediately on subscribe'));

// Logs "This value is called immediately on subscribe"

```

`listen`

A function can listen to the streams changes. Listener function will not be called until a new value is emitted.

```js 

import {stream} from 'striimi';

const striimi = stream('This value');

const subscription = striimi.listen(val => console.log(val + ' is not called immediately on listen'));

// Logs nothing

```

`dispose`

Clears streams value and listeners

```js 

import {stream} from 'striimi';

const striimi = stream('This value');

striimi.dispose();

```

`emit`

Used to pass value to listener functions.

```js 

import {stream} from 'striimi';

const striimi = stream('This value');

const subscription = striimi.listen(val => console.log(val + ' is not called immediately on listen'));

striimi.emit('First value')

// Logs "First value is not called immediately on listen"

```

`refresh`

Refreshes the stream by calling listener functions with current values.

```js 

import {stream} from 'striimi';

const striimi = stream('This value');

const subscription = striimi.listen(val => console.log(val + ' is not called immediately on listen'));

striimi.refresh();

// Logs "This value is not called immediately on listen" 

```

`reset`

Resets the stream value to init value.

```js 

import {stream} from 'striimi';

const striimi = stream('This value');

const subscription = striimi.listen(val => console.log(val + ' is not called immediately on listen'));

striimi.emit('First value')
striimi.reset();
striimi.refresh();

// Logs "First value is not called immediately on listen", resets the stream, refreshes it and logs "This value is not called immediately on listen".

```

`getValue or getValues`

Returns current value of the stream

```js 

import {stream} from 'striimi';

const striimi = stream('This value');

const streamValue = striimi.getValue();

console.log(streamValue);

// Logs "This value".

```

`disposing the stream`

Disposes the subscription

```js 

import {stream} from 'striimi';

const striimi = stream('This value');

const subscription = striimi.listen(val => console.log(val + ' is not called immediately on listen'))

subscription();

// Disposes the subscription

```