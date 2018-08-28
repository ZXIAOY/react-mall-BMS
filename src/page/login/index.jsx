/**
 * 登录页面
 * 
 */
import React from 'react';
import MUtil from '../../utils/mm.jsx';
import './index.scss';

// MUtil是一个class,new出来使用
const _mm = new MUtil();

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  // 表单输入内容改变，根据input的name，来设置对应的state
  onInputChange(e) {
    let inputName = e.target.name,
        inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue,
    });
  }
  // 点击登录按钮提交信息
  onSubmit(e) {
    console.log(this.state);
    _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    }).then((res)=>{

    }, (err)=> {

    });
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
                  onChange={e=>this.onInputChange(e)}/>
              </div>
              <div className="form-group">
                <input name="password" 
                  type="password"
                  className="form-control" 
                  placeholder="请输入密码" 
                  onChange={e=>this.onInputChange(e)}/>
              </div>
              <button className="btn btn-lg btn-primary btn-block"
                onClick={e=>{this.onSubmit(e)}}>登录</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;