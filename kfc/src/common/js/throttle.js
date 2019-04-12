export default function throttle(ele, func, delay) {
  ele.time = null
  return function() {
    const self = this
    const arg = arguments
    if (!ele.time) {
      ele.time = setTimeout(() => {
        func.apply(self, arg)
        ele.time = null
      }, delay)
    }
  }
}
