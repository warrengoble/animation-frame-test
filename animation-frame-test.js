var messageName = 'fast-event-loop'

var debug
var count_loop = 0
var count_frame = 0
var prev = performance.now()

var handleMessage = (event) => {
  if (event.source == window && event.data == messageName) {
    event.stopPropagation()
    window.postMessage(messageName, '*')

    count_loop++
  }
}

var displayLoop = () => {
  requestAnimationFrame(displayLoop)

  var stamp = performance.now()
  var fps = 1000/(stamp - prev)
  prev = stamp

  debug.innerHTML = 'FPS '+fps.toFixed(3)+' - # events between refresh - ' + count_loop
  count_loop = 0
}

window.addEventListener('DOMContentLoaded', () => {
  debug = document.getElementById('debug')

  window.addEventListener('message', handleMessage, true)
  window.postMessage(messageName, '*')

  requestAnimationFrame(displayLoop)
})
