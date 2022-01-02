const validate = {
  number: (rule, value, callback) => {
    let reg = /^[1-9]*[1-9][0-9]*$/
    if (String(value).trim() !== '' && !reg.test(value)) {
      callback(new Error('只能为正整数'))
    } else {
      callback()
    }
  },
  integer: (rule, value, callback) => {
    let reg = /^[0-9]*[0-9][0-9]*$/
    if (String(value).trim() !== '' && !reg.test(value)) {
      callback(new Error('只能为正数'))
    } else {
      callback()
    }
  },
  numLetter: (rule, value, callback) => {
    let reg = /^[0-9a-zA-Z]+$/
    if (!reg.test(value)) {
      callback(new Error('只能为数字或字母'))
    } else {
      callback()
    }
  },
  tel: (rule, value, callback) => {
    let reg = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    if (String(value).trim() !== '' && !reg.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  },
  email: (rule, value, callback) => {
    let reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      callback()
    }
  },
  phone: (rule, value, callback) => {
    let reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/
    // let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
    if (String(value).trim() !== '' && !reg.test(value)) {
      callback(new Error('请输入正确的电话号码'))
    } else {
      callback()
    }
  },
  idCard: (rule, value, callback) => {
    let reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
    if (String(value).trim() !== '' && !reg.test(value)) {
      callback(new Error('请输入正确的身份证号'))
    } else {
      callback()
    }
  },
  societyCode: (rule, value, callback) => {
    let reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
    if (String(value).trim() !== '' && !reg.test(value)) {
      callback(new Error('请输入正确的统一社会信用代码'))
    } else {
      callback()
    }
  },
  // 验证密码
  validPassword: (rule, value, callback) => {
    // let reg = /^[0-9a-zA-Z_@]{6,20}$/
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@]{8,20}$/
    if (value && !reg.test(value)) {
      callback(new Error('需同时含有大小写字母和数字，长度在8-20之间'))
    } else {
      callback()
    }
  }
}
export default validate
