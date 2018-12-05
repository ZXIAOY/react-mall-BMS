/**
 * 
 * 工具类
 */

class MUtil {

  /**
   * 网络请求方法
   * 
   */ 
  request(param) {
    // primise形式
    return new Promise((resolve, reject)=> {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: res => {
          // 请求成功
          if(res.status === 0){
            typeof resolve === 'function' && resolve(res.data, res.msg);
          } 
          // 没有登录状态,强制登录
          else if(res.status === 10) {
            this.doLogin();
          } 
          // 请求
          else {
            typeof reject === 'function' && reject(res.msg || res.data);
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText);
        }
      });
    });
  }
  /**
   *
   * 跳转到登录页面
   */ 
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }

  /** 
   * 获取url参数
   * 
   */
  getUrlParam(name) {
    // www.baidu.com?param=zxy&param1=yxj
    // search就是从?开始的，参数的一串
    let queryString = window.location.search.split('?')[1] || '',
        reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
        result = queryString.match(reg);
    return result? decodeURIComponent(result[2]) : null;  
  }
  /** 
   * 成功提示
   */
  successTips(successMsg) {
    alert(successMsg || '成功就完事了');
  }

  /** 
   * 错误提示
   */
  errorTips(errMsg) {
    alert(errMsg || '反正就是任性出错了');
  }

  /** 
   * 存储localStorage 
   */
  setStorage(name, data) {
    let dataType = typeof data;
    if(dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
    else if(['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    }
    else {
      alert('该类型不能用于本地存储');
    }
  }
  /** 
   * 读取localStorage 
   */
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if(data) {
      return JSON.parse(data);
    }
    else {
      return '';
    }
  }
  /** 
   * 删除localStorage 
   */
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default MUtil;