// 定义全局函数
exports.install = function (Vue, options) {
  // 验证登录名
  Vue.prototype.isLoginName = function (str) {
    var pattern =  /^[a-zA-Z0-9_]{6,20}$/
    return pattern.test(str)
  }
  // 验证手机号
  Vue.prototype.isCellphone = function (str) {
    var pattern =  /^(?:(?:(?:13[0-9])|(?:14[57])|(?:15[0-35-9])|(?:17[36-8])|(?:18[0-9]))\d{8})|(?:170[057-9]\d{7})$/
    return pattern.test(str)
  }
  // 验证固话
  Vue.prototype.isFixedTelephone = function (str) {
    var pattern =  /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/
    return pattern.test(str)
  }
  // 验证固话 + 手机号
  Vue.prototype.isTelephone = function (str) {
    var pattern =  /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
    return pattern.test(str)
  }
  // 验证密码长度
  Vue.prototype.isPassword = function (str) {
    var pattern = /^[a-zA-Z0-9_]{6,20}$/
    return pattern.test(str)
  }
  // 验证邮箱
  Vue.prototype.isEmail = function (str) {
    var pattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    return pattern.test(str)
  }
  //  验证邮编
  Vue.prototype.isPostCode = function (str) {
    var pattern = /^[0-9][0-9]{5}$/
    return pattern.test(str)
  }
  //  验证正整数
  Vue.prototype.isPositiveInt = function (str) {
    var pattern = /^[1-9]\d*$/
    return pattern.test(str)
  }
  //  验证整数
  Vue.prototype.isParseInt = function (str) {
    var pattern = /^[0-9]\d*$/
    return pattern.test(str)
  }
  //  非负浮点数
  Vue.prototype.notMinusFloat = function (str) {
    var pattern = /^\d+(\.\d+)?$/
    return pattern.test(str)
  }
  //  非负浮点数(带空格)
  Vue.prototype.notMinusFloatN = function (str) {
    if (str === '') {
      return true
    } else {
      var pattern = /^\d+(\.\d+)?$/
      return pattern.test(str)
    }
  }
  //  百分比2位小数
  Vue.prototype.isPercentage2 = function (str) {
    var pattern = /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/
    return pattern.test(str)
  }
  // 15位和18位身份证号码的正则表达式
  Vue.prototype.isIDCard = function (idCard) {
    var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    // 如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)){
      if(idCard.length==18){
        var idCardWi = new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
        var idCardY = new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
        for(var i=0;i<17;i++){
          idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
        }
        var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
        var idCardLast=idCard.substring(17);//得到最后一位身份证号码
        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if(idCardMod==2){
          if(idCardLast=="X"||idCardLast=="x"){
            return true;
          }else{
            return false;
          }
        }else{
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if(idCardLast==idCardY[idCardMod]){
            return true;
          }else{
            return false;
          }
        }
      }
    }else{
      return false;
    }
  }
  //验证字符
  Vue.prototype.illegalChar = function (str) {
    var pattern=/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im
    if(pattern.test(str)){
      return false
    }
    return true
  }
  //  选择排序
  Vue.prototype.selectionSort = function (arr) {
    var len = arr.length
    var minIndex, temp
    for (var i = 0; i < len - 1; i++) {
      minIndex = i
      for (var j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {     //寻找最小的数
          minIndex = j                  //将最小数的索引保存
        }
      }
      temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
    }
    return arr
  }
  // 数组去重
  Vue.prototype.unique = function (arr) {
    const seen = new Map()
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
  }
  // 对象转url
  Vue.prototype.urlencode = function (data) {
    var _result = []
    for (var key in data){
      var value = data[key]
      if (value.constructor == Array){
        value.forEach(function(_value){
          _result.push(key + "=" + _value)
        })
      }else{
        _result.push(key + '=' + value)
      }
    }
    return _result.join('&')
  }
  // 服务器报错
  Vue.prototype.errorResponse = function (error) {
    if (error.status === 401) {
      this.$message.error('服务器超时, 请重新登录')
      setTimeout(() => {
        this.$router.push({path: '/'})
      },2000)
    } else if (error.status === 500) {
      this.$message.error('服务器出错,请稍后重试')
    } else if (error.status === 504) {
      this.$message.error('客户端请求超时,请稍后重试')
    }
  }
  // localStorage取数据 后改为sessionStorage
  Vue.prototype.localGet = function (item) {
    return JSON.parse(sessionStorage.getItem(item))
  }
  // localStorage存数据 后改为sessionStorage
  Vue.prototype.localSet = function (item, obj) {
    sessionStorage.setItem(item, JSON.stringify(obj))
  }
  // localStorage删数据 后改为sessionStorage
  Vue.prototype.localRemove = function (item) {
    sessionStorage.removeItem(item)
  }
  // localStorage清除所有数据 后改为sessionStorage
  Vue.prototype.localClear = function () {
    sessionStorage.clear()
  }
  Vue.prototype.setCookie = function (name, value, days) {
    var d = new Date
    d.setTime(d.getTime() + 24*60*60*1000*days)
    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString()
  }
  Vue.prototype.getCookie = function (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  }
  Vue.prototype.deleteCookie = function (name) {
    this.setCookie(name, '', -1)
  }
  // 判断参数不存在使用占位符替代
  Vue.prototype.notNV = function (obj, deli, path) {
    var bean = obj
    var args = path.split('.')
    for(var i=0;i<args.length;i++){
      var prop = args[i]
      var val = bean[prop]
      if(!val || val === 0 || val === '0'){
        return deli
      }
      bean = val
    }
    return bean
  }
  // 判断是专用发票还是普通发票
  Vue.prototype.parseCode = function (code) {
    var acat = { Amount: "合计金额", SummaryAmount: "价税合计金额" }
    var alxd = function (a) {
      var b
      var c = "99"
      var b1, b2
      var codes = new Array(
        '144031539110',
        '131001570151',
        '133011501118',
        '111001571071',
        '111001471071',
        '111001471072',
        '111001571072',
        '111001671071',
        '111001671072')
      if (a.length == 12) {
        b1 = a.substring(0, 1)
        b2 = a.substring(10, 12)
        b = a.substring(7, 8)
        if (a.substring(1, 5) == "3100") {
          if (a.substring(7, 10) == "701") {
            c = "10"
            return c
          }
        } else if (a.substring(1, 3) == "33") {
          if (b2 == "18") {
            c = "10"
            return c
          }
        } else if (a.substring(1, 5) == "4403") {
          if ((a.substring(5, 7) == "15" && a.substring(7, 9) == "39")
            || (a.substring(5, 7) == "16" && a.substring(10, 12) == "11")) {
            c = "10"
            return c
          }
        }
        for (var i = 0; i < codes.length; i++) {
          if (a == codes[i]) {
            c = "10"
            return c
          }
        }
        if (c == "99" && b1 == "0" && b2 == "11") {
          c = "10"
          return c
        }
        if (c == "99") {
          if (b == "2") {
            c = "03"
            return c
          } else {
            c = "11"
            return c
          }
        }
      } else if (a.length == 10) {
        b = a.substring(7, 8)
        if (b == 1 || b == 5) {
          c = "01"
        } else if (b == 6 || b == 3) {
          c = "04"
        } else if (b == 7 || b == 2) {
          c = "02"
        }
      }
      return c
    }
    var flag = alxd(code)
    var suc = true
    //查验必填参数
    var isSetAmount = false
    var isSetVCode = false
    var amountCat = acat.Amount
    if (flag == '01' || flag == '02' || flag == '03') {
      isSetAmount = true
      amountCat = acat.Amount
    } else if (flag == '04' || flag == '10' || flag == '11') {
      isSetVCode = true
    } else {
      //99
      suc = false
    }
    return { Success: suc, MustSet: { IsSetAmount: isSetAmount, AmountCat: amountCat, IsSetVCode: isSetVCode } }
  }
  // 金额格式化
  Vue.prototype.fmoney = function (s, n) {
    n = n > 0 && n <= 20 ? n : 2
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]
    var t = ""
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "")
    }
    return t.split("").reverse().join("") + "." + r
  }
  //金额转汉字
  Vue.prototype.changeMoneyToChinese = function (money) {
    var cnNums = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖") //汉字的数字
    var cnIntRadice = new Array("","拾","佰","仟") //基本单位
    var cnIntUnits = new Array("","万","亿","兆") //对应整数部分扩展单位
    var cnDecUnits = new Array("角","分","毫","厘") //对应小数部分单位
    //var cnInteger = "整" //整数金额时后面跟的字符
    var cnIntLast = "元" //整型完以后的单位
    var maxNum = 999999999999999.9999 //最大处理的数字
    var IntegerNum //金额整数部分
    var DecimalNum //金额小数部分
    var ChineseStr = "" //输出的中文金额字符串
    var parts //分离金额后用的数组，预定义
    if ( money === "" ) {
      return ""
    }
    money = parseFloat(money)
    if ( money >= maxNum ) {
      $.alert('超出最大处理数字')
      return ""
    }
    if ( money === 0 ) {
      //ChineseStr = cnNums[0]+cnIntLast+cnInteger
      ChineseStr = cnNums[0]+cnIntLast
      //document.getElementById("show").value=ChineseStr
      return ChineseStr
    }
    money = money.toString() //转换为字符串
    if (money.indexOf(".") === -1) {
      IntegerNum = money
      DecimalNum = ''
    } else {
      parts = money.split(".")
      IntegerNum = parts[0]
      DecimalNum = parts[1].substr(0,4)
    }
    if ( parseInt(IntegerNum,10) > 0 ) {//获取整型部分转换
      var zeroCount = 0
      var IntLen = IntegerNum.length
      for (var i = 0; i < IntLen; i++) {
        var n = IntegerNum.substr(i,1)
        var p = IntLen - i - 1
        var q = p / 4
        var m = p % 4
        if( n === "0" ) {
          zeroCount++
        } else {
          if ( zeroCount > 0 ) {
            ChineseStr += cnNums[0]
          }
          zeroCount = 0 //归零
          ChineseStr += cnNums[parseInt(n)]+cnIntRadice[m]
        }
        if ( m === 0 && zeroCount < 4 ) {
          ChineseStr += cnIntUnits[q]
        }
      }
      ChineseStr += cnIntLast
      //整型部分处理完毕
    }
    if (DecimalNum !== '') {//小数部分
      var decLen = DecimalNum.length
      for (i = 0; i < decLen; i++) {
        n = DecimalNum.substr(i,1)
        if (n !=='0') {
          ChineseStr += cnNums[Number(n)] + cnDecUnits[i]
        }
      }
    }
    if( ChineseStr === '' ){
      //ChineseStr += cnNums[0]+cnIntLast+cnInteger
      ChineseStr += cnNums[0]+cnIntLast
    }/* else if( DecimalNum === '' ){
     ChineseStr += cnInteger
     ChineseStr += cnInteger
     } */
    return ChineseStr
  }
}
