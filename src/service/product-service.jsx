/** 
 * product请求service层
 * 
 */
import MUtil from 'utils/mm.jsx';


const _mm = new MUtil();

class Product {

  // 获取商品列表
  getProductList(listParam) {
    let url = '',
        data = {};
    if(listParam.listType === 'list') {
      url = '/manage/product/list.do';
    } else {
      url = '/manage/product/search.do';
      data.pageNum = listParam.pageNum;
      data[listParam.searchType] = listParam.keyword;
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    });
  }

  // 获取单个商品信息
  getProduct(id) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/detail.do',
      data: {
        productId: id || ''
      }
    });
  }

  // 设置商品上下架状态
  setProductStatus(productInfo) {
    return  _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: productInfo
    });
  }

  // 检查商品信息
  checkProduct(product) {
    let result =  {
      status: true,
      msg: '验证通过'
    };
    if(typeof product.name !== 'string' || product.name === 0) {
      return {
        status: false,
        msg: '商品名称不能为空'
      }
    }
    if(typeof product.subtitle !== 'string' || product.subtitle === 0) {
      return {
        status: false,
        msg: '商品描述不能为空'
      }
    }
    if(typeof product.price !== 'number' || !(product.price >= 0)) {
      return {
        status: false,
        msg: '商品价格不正确'
      }
    }
    if(typeof product.stock !== 'number' || !(product.stock >= 0)) {
      return {
        status: false,
        msg: '商品库存数量不正确'
      }
    }
    if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
      return {
        status: false,
        msg: '请选择商品品类'
      }
    }

    return result;
  }

  // 保存商品
  saveProduct(product) {
    return  _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    });
  }

  /** 
   * 平类相关
   */
  getCategoryList(parentCateogryId) {
    return  _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentCateogryId || 0
      }
    });
  }
}

export default Product;