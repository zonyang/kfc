// 移动元素
export default function moveElement(elem, finalX, finalY, interval) {
  if (elem.movement) {
    clearTimeout(elem.movement)
  }
  if (!elem.style.top) {
    elem.style.top = '0px'
  }
  if (!elem.style.left) {
    elem.style.left = '0px'
  }
  var dist
  var xpos = parseInt(elem.style.left)
  var ypos = parseInt(elem.style.top)
  // console.log(finalX)
  // console.log(xpos)
  if (xpos === finalX && ypos === finalY) return true
  if (xpos < finalX) {
    dist = Math.ceil((finalX - xpos) / 10)
    xpos += dist
  }
  if (xpos > finalX) {
    dist = Math.ceil((xpos - finalX) / 10)
    xpos -= dist
  }
  if (ypos < finalY) {
    dist = Math.ceil((finalY - ypos) / 10)
    ypos += dist
  }
  if (ypos > finalY) {
    dist = Math.ceil((ypos - finalY) / 10)
    ypos -= dist
  }
  elem.style.left = xpos + 'px'
  elem.style.top = ypos + 'px'
  // var repeat = moveElement(elem, finalX, finalY, interval)
  var repeat = 'moveElement(' + elem + ',' + finalX + ',' + finalY + ',' + interval + ')'
  console.log(repeat)
  elem.movement = setTimeout(repeat, interval)
}
