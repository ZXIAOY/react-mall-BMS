/**
 * 登录页面
 * 
 */
import React from 'react';
import MUtil from '../../utils/mm.jsx';
import User from 'service/user-service.jsx';
import './index.scss';

// MUtil是一个class,new出来使用
const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    };
  }

  componentWillMount() {
    document.title = '登录-BMS-Admin';
  }

  // 表单输入内容改变，根据input的name，来设置对应的state
  onInputChange(e) {
    let inputName = e.target.name,
        inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue,
    });
  }

  // 点击回车时，自动调用提交
  onInputKeyUp(e) {
    if(e.keyCode === 13)
      this.onSubmit();
  }

  // 点击登录按钮提交信息
  onSubmit(e) {
    //console.log(this.state);
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    let checkResult = _user.checkLoginInfo(loginInfo);
    if(checkResult.status) {
      _user.login(loginInfo).then((res)=>{
        // 路由中有参数，就跳到指定参数，没有就跳到'/'根目录
        _mm.setStorage('userInfo', res);
        this.props.history.push(this.state.redirect);
      }, (err)=> {
        _mm.errorTips(err);
      });
    } else {
      _mm.errorTips(checkResult.msg);
    }
   
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录--mMall</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input name="username"
                  type="text" 
                  className="form-control" 
                  placeholder="请输入账户名" 
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)}/>
              </div>
              <div className="form-group">
                <input name="password" 
                  type="password"
                  className="form-control" 
                  placeholder="请输入密码" 
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)}/>
              </div>
              <button className="btn btn-lg btn-primary btn-block"
                onClick={e => {this.onSubmit(e)}}>登录</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;