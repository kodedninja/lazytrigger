var onIntersect = require('on-intersect')
var html = require('nanohtml')
var bik = require('bik')

module.exports = class LazyTrigger {
  constructor (_onEnter, _onLeave) {
    this._onEnter = _onEnter
    this._onLeave = _onLeave

    this._stoppers = {}
  }

  breakpoint (id) {
    // fallback to a random hash
    if (typeof id !== 'string') {
      id = (new Date() % 9e6).toString(36)
    }

    var t = this

    // initialize bik component
    var trigger = bik(function () {
      return html`<div><!-- lazytrigger ${id} --></div>`
    })

    // start listening after the element was loaded
    trigger.load = function (el) {
      t._stoppers[id] = onIntersect(el, function () {
        if (t._onEnter) t._onEnter(id)
      }, function () {
        if (t._onLeave) t._onLeave(id)
      })
    }

    // stop listening on unload
    trigger.unload = function () {
      t.stop(id)
    }

    // return rendered element
    return trigger()
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
