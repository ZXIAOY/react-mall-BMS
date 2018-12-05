/** 
 * 表格组件封装
 */
import React from 'react';

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading: true
    }
  }

  componentWillReceiveProps() {
    // 列表第一次挂载 isFirstLoading为true，其他情况为false
    this.setState({
      isFirstLoading: false
    })
  }

  render() {
    // 表头信息
    let tableHeader = this.props.tableHeads.map((head, index)=> {
        if(typeof head === 'object') {
          return <th key={index} width={head.width}>{ head.name }</th>
        } else {
          return <th key={index}>{ head }</th>
        }
      }
    );
    // 列表内容
    let listBody = this.props.children;
    // 列表信息
    let listInfo = (
      <tr><td colSpan={this.props.tableHeads.length} className='text-center'>{this.state.firstLoading ? '正在加载...' : '没有找到相应结果'}</td></tr>
    );
    return (
    <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {tableHeader}
              </tr>
            </thead>
            <tbody>
              {listBody.length > 0 ? listBody : listInfo}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableList;