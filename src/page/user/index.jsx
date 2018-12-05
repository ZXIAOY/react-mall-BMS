/** 
 * 用户列表
 */
import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from '../../utils/mm.jsx';
import User from 'service/user-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import TableList from 'component/table-list/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      list: []
    }
  }

  componentDidMount() {
    this.loadUserList();
  }
  
  loadUserList() {
    _user.getUserList(this.state.pageNum)
      .then(res => {
        this.setState(res);
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
    return (
      <div id="page-wrapper">
        <PageTitle title='用户列表' />
        <TableList tableHeads={ ['ID', '用户名', '邮箱', '电话', '注册时间'] }>
            {listBody}
        </TableList>
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