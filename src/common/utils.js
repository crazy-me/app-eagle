/* eslint-disable semi */
const StringUtils = {
  leadingZero: (source, num) => {
    return num <= source.length
      ? source
      : (new Array(num).join('0') + source).slice(-num)
  },
  toThousands: (number) => {
    var num = Number(number || 0)
      .toFixed(2)
      .toString()
    var tail = num.slice(-3)
    var realNumber = num.substring(0, num.indexOf('.'))
    var result = ''
    while (realNumber.length > 3) {
      result = ',' + realNumber.slice(-3) + result
      realNumber = realNumber.slice(0, realNumber.length - 3)
    }
    if (realNumber) {
      result = realNumber + result
    }
    return result + tail
  },
  format: (date, fmt) => {
    if (date === undefined) return '暂无'
    let t = new Date(date)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (t.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': t.getMonth() + 1,
      'd+': t.getDate(),
      'h+': t.getHours(),
      'm+': t.getMinutes(),
      's+': t.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, StringUtils.leadingZero(str, 2))
      }
    }
    return fmt
  },
  getbtype: (max) => {
    var arr = ['元', '万元', '亿']
    if (max < 10000) {
      return {
        type: arr[0],
        base: 1
      }
    } else if (max >= Math.pow(10000, arr.length - 1)) {
      return {
        type: arr[arr.length - 1],
        base: Math.pow(10000, arr.length - 1)
      }
    } else {
      for (var i = 1; i < arr.length - 1; i++) {
        if (max >= Math.pow(10000, i) && max < Math.pow(10000, i + 1)) {
          return {
            type: arr[i],
            base: Math.pow(10000, i)
          }
        }
      }
    }
  },
  getTimetype: (max) => {
    var arr = ['分钟', '小时', '天']
    if (max < 60) {
      return {
        type: arr[0],
        base: 1
      }
    } else if (max >= Math.pow(60, arr.length - 2) * 24) {
      return {
        type: arr[arr.length - 1],
        base: Math.pow(60, arr.length - 2) * 24
      }
    } else {
      for (var i = 1; i < arr.length - 1; i++) {
        if (max >= Math.pow(60, i) && max < Math.pow(60, i + 1)) {
          return {
            type: arr[i],
            base: Math.pow(60, i)
          }
        }
      }
    }
  },
  retunZero: (num) => {
    if (num === 0) {
      return 0
    } else {
      return num.toFixed(2)
    }
  },
  vagueIdcard: (value) => {
    if (!value) {
      return false
    }
    return value.replace(/^(\d{6})\d+(\w{4})$/, '$1********$2')
  },
  vagueMobile: (value) => {
    if (!value) {
      return false
    }
    return value.replace(/^(\d{3})\d+(\d{4})$/, '$1********$2')
  }
}
export default StringUtils
