class MUtil {

  // 网络请求方法
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
  // 跳转到登录页面
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }

}

export default MUtil;