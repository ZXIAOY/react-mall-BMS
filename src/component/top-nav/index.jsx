import React from 'react';
import {Link} from 'react-router-dom';
import MUtils from 'utils/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtils();
const _user = new User();

class TopNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: _mm.getStorage('userInfo').username || ''
    }
  } 

  // 退出登录
  onLogout() {
    console.log('退出');
    _user.logout().then(res => {
      _mm.removeStorage('userInfo');
      window.location.href = '/login';
    }, errMsg => {
      _mm.errorTips(errMsg);
    })
  }

  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>happp</b>Mmall</Link>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw"></i>
              <span>欢迎,{this.state.username}</span>
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={()=>this.onLogout()}>
                  <i className="fa fa-sign-out fa-fw" ></i>
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default TopNav;