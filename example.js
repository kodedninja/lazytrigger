var html = require('nanohtml')
var LazyTrigger = require('.')

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

  if (id === 'second') {
    trigger.stop('second')
    console.warn('second stopped observing')
  }
}

function onLeave (id) {
  console.log(id + ' left')
}
