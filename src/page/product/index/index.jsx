/**
 * 商品管理页面 
 */
import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from '../../../utils/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'component/table-list/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      list: [],
      listType: 'list'   // 列表类型，默认list | 搜索产生的search
    }
  }

  componentDidMount() {
    this.loadProductList();
  }
  
  // 加载商品列表
  loadProductList() {
    let listParam = {
      pageNum: this.state.pageNum,
      listType: this.state.listType,
    }
    // 如果是搜索，传入类型和关键字
    if(this.state.listType === 'search') {
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;
    }
    _product.getProductList(listParam)
      .then(res => {
        this.setState(res);
      },err => {
        this.setState({list: []});
        _mm.errorTips(err);
      })
  }

  // 页码改变回调，重新请求对应页的列表
  onPageNumChange(pageNum) {
    this.setState({pageNum: pageNum}, () => {
      this.loadProductList();
    });
  }

  // 上架/下架商品
  onSetProductStatus(productId, currentStatus) {
    let newStatus = currentStatus === 1 ? 2 : 1,
        tips = currentStatus === 1 ? "确定下架该商品?" : "确定上架该商品?";
    if(window.confirm(tips)) {
      _product.setProductStatus({
        productId: productId,
        status: newStatus
      }).then((res)=>{
        _mm.successTips(res);
        this.loadProductList();
      }, (err)=> {
        _mm.errorTips(err);
      });
    }
  }

  // 搜索商品
  onSearch(searchType, searchKeyword) {
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
      listType,
      pageNum: 1,
      searchType,
      searchKeyword
    }, function() {
      // 搜索时，改变搜索状态，并重新加载列表
      this.loadProductList();
    }) 
  }

  render() {
    let tableHeads = [
      {name: '商品ID', width:'10%'},
      {name: '商品信息', width:'50%'},
      {name: '价格', width:'10%'},
      {name: '状态', width:'15%'},
      {name: '操作', width:'15%'},
    ];
    return (
      <div id="page-wrapper">
        <PageTitle title='商品列表'> 
          <div className="page-header-right">
            <Link to='/product/save' className='btn btn-primary'>
              <i className="fa fa-plus"></i>
              <span>添加商品</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={(searchType, searchKeyword)=> {
          this.onSearch(searchType, searchKeyword);
        }}/>
        <TableList tableHeads={ tableHeads }>
          {
            this.state.list.map((product, index)=> {
              return ( 
              <tr key={index}>
                <td>{product.id}</td>
                <td>
                  <p>{product.name}</p>
                  <p>{product.subtitle}</p>
                </td>
                <td>￥{product.price}</td>
                <td>
                  <p>{product.status === 1 ? "在售" : "已下架"}</p>
                  <button
                    className='btn btn-xs btn-warning' 
                    onClick={(e)=>{this.onSetProductStatus(e, product.id, product.status)}}>
                    {product.status === 1 ? "下架" : "上架"}
                  </button>
                </td>
                <td>
                  <Link className='operate' to={`/product/detail/${product.id}`}>详情</Link>
                  <Link className='operate' to={`/product/save/${product.id}`}>编辑</Link>
                </td>
              </tr>);
            })
          }
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

export default ProductList;