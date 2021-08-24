const getParam = (name, url) => {
  if (!url) url = location.href
  name = name.replace(/[\\[]/, '\\\\[').replace(/[\]]/, '\\\\]')
  var regexS = '[\\?&]' + name + '=([^&#]*)'
  var regex = new RegExp(regexS)
  var results = regex.exec(url)
  return results == null ? null : results[1]
}

const getElementY = (elem) => {
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}
/**
 * 滚动到指定到元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画 执行的时间
 * @param {Number} offset 滚动偏移量
 */

const scrollToElem = (elem, duration, offset) => {
  // 初始位置
  const startingY = window.pageYOffset
  const elementY = getElementY(elem)
  // 需要滚动的距离
  const diff = elementY - startingY + offset
  // 如果 diff 0
  if (!diff) return
  const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    // 计算时间到差值，根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export {
  getParam,
  scrollToElem
}
