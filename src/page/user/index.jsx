/*
  user页面
*/
import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from '../../utils/mm.jsx';
import User from 'service/user-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      list: [],
      firstLoading: true
    }
  }

  componentDidMount() {
    this.loadUserList();
  }
  
  loadUserList() {
    _user.getUserList(this.state.pageNum)
      .then(res => {
        this.setState(res, ()=>{
          this.setState({firstLoading: false});
        });
      },err => {
        this.setState({list: []});
        _mm.errorTips(err);
      })
  }

  onPageNumChange(pageNum) {
    this.setState({pageNum: pageNum}, () => {
      this.loadUserList();
    });
  }

  render() {
    console.log('zxy',this.state);
    let listBody =  this.state.list.map((user, index)=> {
      return ( 
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{new Date(user.createTime).toLocaleString()}</td>
      </tr>);
    });
    let listError = (
      <tr><td colSpan='5' className='text-center'>{this.state.firstLoading ? '正在加载...' : '没有找到相应结果'}</td></tr>
    );
    return (
      <div id="page-wrapper">
        <PageTitle title='用户列表' />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>电话</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
                {this.state.list.length > 0 ? listBody : listError}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination 
          current={this.state.pageNum} 
          total={this.state.total}
          onChange={(pagenum) => this.onPageNumChange(pagenum)}>
        </Pagination>
      </div>
    );
  }
}

export default UserList;