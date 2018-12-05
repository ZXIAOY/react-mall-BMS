/** 
 * 商品查询组件 查询框+提交
 */
import React from 'react';

import ProductList from 'page/product/index/index.jsx';

class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'productId',         // productId, productName
      searchKeyword: ''       // 搜索关键词
    }
  }

  // 搜索参数改变  类型|关键词
  onValueChange(e) {
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    })
  }
  // 点击搜索按钮
  onSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword);
  }

  // 搜索按回车键提交时
  onSearchKeywordKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSearch();
    }
  }

  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select 
                className="form-control"
                name='searchType'
                onChange={(e)=>this.onValueChange(e)}
                >
                <option value="productId">按商品ID查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control"
                name='searchKeyword' 
                placeholder="关键词" 
                onKeyUp={(e)=>this.onSearchKeywordKeyUp(e)}
                onChange={(e)=>this.onValueChange(e)}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e)=>this.onSearch(e)}>查询</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListSearch;