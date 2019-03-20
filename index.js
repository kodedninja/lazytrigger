var onIntersect = require('on-intersect')
var html = require('nanohtml')
var onLoad = require('on-load')

module.exports = class LazyTrigger {
  constructor (_onEnter, _onLeave) {
    this._onEnter = _onEnter
    this._onLeave = _onLeave

    this._events = _events.bind(this)

    this._stoppers = {}
  }

  breakpoint (id) {
    // fallback to a random hash
    if (typeof id !== 'string') {
      id = (new Date() % 9e6).toString(36)
    }

    var el = html`<div><!-- lazytrigger ${id} --></div>`
    this._events(id, el)

    return el
  }

  // stop observing for a specific id
  stop (id) {
    if (typeof this._stoppers[id] === 'function') {
      this._stoppers[id]()
      delete this._stoppers[id]
    }
  }

  // stop observing
  stopAll () {
    Object.keys(this._stoppers).map(key => {
      this.stop(key)
    })
  }
}

function _events (id, el) {
  var t = this
  onLoad(el, function (el) {
    // start listening after the element was mounted
    t._stoppers[id] = onIntersect(el, function () {
      if (t._onEnter) t._onEnter(id)
    }, function () {
      if (t._onLeave) t._onLeave(id)
    })
  }, function (el) {
    // stop listening after the element was unmounted
    t.stop(id)
  })
}
