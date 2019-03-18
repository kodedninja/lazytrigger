# lazytrigger
<a href="https://www.npmjs.com/package/lazytrigger">
  <img src="https://img.shields.io/npm/v/lazytrigger.svg?style=flat-square" alt="NPM version" />
</a>

Notify when certain points of the DOM enter / leave the view using [on-intersect](https://github.com/yoshuawuyts/on-intersect).

## Installation
```
npm i --save lazytrigger
```

## Example

```javascript
var html = require('nanohtml')
var LazyTrigger = require('lazytrigger')

var trigger = new LazyTrigger(onEnter, onLeave)

module.exports = () => {
  return html`
    <div style="font-size: 5rem;">
      <div style="height: 200vh">Scroll down, check the console...</div>
      ${trigger.breakpoint('first')}
      <div style="height: 200vh">Even more...</div>
      ${trigger.breakpoint('second')}
    </div>
  `
}

function onEnter (id) {
  console.log(id + ' entered')
}

function onLeave (id) {
  console.log(id + ' left')
}
```

## Why?
Put it to the bottom of an endless scrolling list, play sounds, change the background image, autoplay videos, you name it.

## API

### `trigger = new LazyTrigger(onEnter(id), onLeave(id))`
Initialize a new handler. `onEnter` is called when a breakpoint enters the view, `onLeave` is called when a breakpoint leaves the view; both get the `id` of the breakpoint.

### `trigger.breakpoint(id)`
Returns an empty element that will be observed. It has a comment inside (`<!-- lazytrigger {id} -->`) in order to be easily identifiable.

### `trigger.stop(id)`
Stop observing a specific breakpoint.

### `trigger.stopAll()`
Stop observing all the breakpoints.

## See Also
- [yoshuawuyts/on-intersect](https://github.com/yoshuawuyts/on-intersect)
- [jongacnik/monolazy](https://github.com/jongacnik/monolazy)
- [kodedninja/bik](https://github.com/kodedninja/bik)
