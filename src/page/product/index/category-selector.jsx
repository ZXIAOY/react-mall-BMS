/** 
 * 商品品类选择组件
 */
import React from 'react';
import MUtil from '../../../utils/mm.jsx';
import Product from 'service/product-service.jsx';

import './category-selector.scss';

const _mm = new MUtil();
const _product = new Product();


class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0,
    }
  }

  componentDidMount() {
    this.loadFirstCategory();
  }

  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
        parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    // 品类数据没发生变化，不做处理
    if(!categoryIdChange && !parentCategoryIdChange) {
      return false;
    }
    // 只有一级品类被选中
    if(nextProps.categoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: 0
      })
    } // 有两级品类被选择 
    else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId,
      }, function() {
        this.loadSecondCategory();
      })
    }
  }

  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(res=>{
      this.setState({
        firstCategoryList: res
      });
    }, err=> {
      _mm.errorTips(err);
    })
  }

  // 加载二级分类
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(res=>{
      this.setState({
        secondCategoryList: res
      });
    }, err=> {
      _mm.errorTips(err);
    })
  }

  // 一级分类选择回调
  onFirstCategoryChange(e) {
    if(this.props.readOnly) return;

    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, function() {
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    });
  }

  // 二级分类选择回调
  onSecondCategoryChange(e) {
    if(this.props.readOnly) return;
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue
    })
  }

  // 传给父组件选择的结果
  onPropsCategoryChange() {
    // 判断方法是否传入
    let categoryChangable = typeof this.props.onCategoryChange === 'function';
    
    // 如果有二级分类
    if(this.state.secondCategoryId) {
      categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    } else {
      categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }

  render() {
    return (
      <div className="col-md-10">
        <select 
          className='form-control cate-select'
          value={this.state.firstCategoryId}
          readOnly={this.props.readOnly}
          onChange={(e)=>{this.onFirstCategoryChange(e)}}>

          <option value="">请选择一级分类</option>
          {this.state.firstCategoryList.map((category, index)=>{
            return <option value={category.id} key={index}>{category.name}</option>
          })}
        </select>
        {this.state.secondCategoryList.length > 0 ?
          (<select 
            className='form-control cate-select'
            value={this.state.secondCategoryId}
            readOnly={this.props.readOnly}
            onChange={(e)=>this.onSecondCategoryChange(e)}>
            <option value="">请选择二级分类</option>
            {this.state.secondCategoryList.map((category, index)=>{
              return <option value={category.id} key={index}>{category.name}</option>
            })}
          </select>) : null }
      </div>
    );
  }
}

export default CategorySelector;