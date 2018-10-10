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
      pageNum: 0
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
        _mm.errorTips(err);
      })
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title='用户列表' />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination 
          current={5} 
          total={200}
          onChange={(pagenum => console.log(pagenum))}>
        </Pagination>
      </div>
    );
  }
}

export default UserList;