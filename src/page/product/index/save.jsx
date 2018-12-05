/** 
 * 商品添加页面
 */
import React from 'react';
import MUtil from '../../../utils/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from 'page/product/index/category-selector.jsx';
import FileUploader from 'utils/FileUploader/index.jsx';
import RichEditor from 'utils/rich-editor/index.jsx';

import './save.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',         
      categoryId: 0,        // 商品二级分类
      parentCategoryId: 0,  // 商品一级分类
      subImages: [],         // 商品图片
      price: '',
      stock: '',
      detail: '',
      status: 1           // 商品状态 1=在售
    }
  }

  componentDidMount() {
    this.loadProduct();
  }

  // 加载商品详情
  loadProduct() {
    // 有id，说明是编辑
    if(this.state.id) {
      _product.getProduct(this.state.id)
        .then(res => {
          let images = res.subImages.split(',');
          res.subImages = images.map((imgUri) => {
            return {
              uri: imgUri,
              url: res.imageHost + imgUri
            }
          });
          res.defaultDetail = res.detail;
          this.setState(res);
        }, err => {
          _mm.errorTips(err);
        })
    }
  }

  // 商品分类选择后，逻辑处理
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId
    })
  }

  // 商品普通字段变化回调
  onValueChange(e) {
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  }

  // 上传图片成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages: subImages
    })
  }
  // 上传图片失败
  onUploadError(err) {
    _mm.errorTips(err.message || '上传图片失败');
  }

  // 删除图片
  onImageDelete(e) {
    let index = parseInt(e.target.getAttribute('index')),
        subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages
    })
  }

  getSubImagesString() {
    return this.state.subImages.map((image) => image.uri).join(',');
  }

  // 富文本编辑器 值改变回调
  onRichEditorChange(value) {
    this.setState({
      detail: value
    });
  }

  // 提交表单
  onSubmit(e) {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.categoryId),
      subImages: this.getSubImagesString(),
      detail: this.state.detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status: this.state.status,
    };
    let productCheckResult = _product.checkProduct(product);
    if(this.state.id !== '') {
      product.id = this.state.id;
    }
    // 先检查商品信息输入是否正确
    if(productCheckResult.status) {
      _product.saveProduct(product)
        .then(res => {
          _mm.successTips(res);
          this.props.history.push('/product/index');
        }, err => {
          _mm.errorTips(err);
        });
    } else {
      _mm.errorTips(productCheckResult.msg);
    }

  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title='添加商品' />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input 
                type="text" 
                className="form-control" 
                placeholder="请输入商品名称" 
                name='name'
                value={this.state.name}
                onChange={e => this.onValueChange(e)}/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" 
                className="form-control" 
                placeholder="请输入商品描述" 
                name='subtitle' 
                value={this.state.subtitle}
                onChange={e => this.onValueChange(e)} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品分类</label>
            <CategorySelector 
              onCategoryChange={(categoryId, parentCategoryId)=>this.onCategoryChange(categoryId, parentCategoryId) }
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}/>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" 
                  className="form-control" 
                  placeholder="价格" 
                  name='price' 
                  value={this.state.price}
                  onChange={e => this.onValueChange(e)}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="库存" 
                  name='stock'
                  value={this.state.stock}
                  onChange={ (e) => this.onValueChange(e)}/>
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10"> 
              {
                this.state.subImages.length ? this.state.subImages.map( 
                  (image, index) => (
                    <div key={index} className='img-con'>
                      <img className='img' src={image.url} />
                      <i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)}></i>
                    </div>
                  ) 
                )  : (<div>请上传图片</div>)
              }
            </div>
            <div className="col-md-10 col-md-offset-2 file-upload-con">
              <FileUploader onSuccess={(res)=>{this.onUploadSuccess(res)}} onError={(e)=>{this.onUploadError(e)}} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor 
                onValueChanged={value => {this.onRichEditorChange(value)}}
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}>
              </RichEditor>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button 
                type="submit" 
                className="btn btn-primary" 
                onClick={(e) => {this.onSubmit(e)}}>
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSave;