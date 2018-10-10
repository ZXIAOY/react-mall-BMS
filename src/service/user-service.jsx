/** 
 * user请求service层
 * 
 */
import MUtil from 'utils/mm.jsx';


const _mm = new MUtil();

class User {

  // 登录请求封装
  login(loginInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: loginInfo,
    })
  }

  // 检查登录接口数据合法性
  checkLoginInfo(loginInfo) {
    let username = $.trim(loginInfo.username);
    let password = $.trim(loginInfo.password);
    if(typeof username !== 'string' || username.length === 0) {
      return {
        status: false,
        msg: '用户名不能为空'
      }
    }
    if(typeof password !== 'string' || password.length === 0) {
      return {
        status: false,
        msg: '密码不能为空'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    }
  }

  // 退出登录
  logout() {
    return _mm.request({
      type: 'post',
      url: '/user/logout.do'
    });
  }

  // 获取用户列表
  getUserList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/list.do',
      data: {
        pageNum: pageNum
      }
    });
  }
}

export default User;