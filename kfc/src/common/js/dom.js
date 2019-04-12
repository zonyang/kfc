export function addClass(ele, className) {
  if (hasClass(ele, className)) return
  ele.classList.add(className)
}

export function hasClass(ele, className) {
  return ele.classList.contains(className)
}

export function handleData(el, name, val) {
  const pre = 'data-'
  if (val) {
    el.setAttribute(pre + name, val)
  } else {
    return el.getAttribute(pre + name)
  }
}
