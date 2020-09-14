import { $ } from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  let delta
  let value

  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'

  $resizer.css({
    [sideProp]: '-5000px',
    opacity: 1
  })

  document.onmousemove = e => {
    if (type === 'col') {
      delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px'
      })
    } else {
      delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: -delta + 'px'
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({
        width: value + 'px'
      })
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(cell => $(cell).css({
          width: value + 'px'
        }))

      $resizer.css({
        bottom: 0,
        opacity: 0,
        right: 0
      })
    } else {
      $parent.css({
        height: value + 'px'
      })
      $resizer.css({
        right: 0,
        opacity: 0
      })
    }
  }
}