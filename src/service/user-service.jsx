/** 
 * user请求service层
 * 
 */
import MUtil from 'utils/mm.jsx';


const _mm = new MUtil();

class User {

  //登录请求封装
  login(loginInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: loginInfo,
    })
  }

}

export default User;