/** 
 * user请求service层
 * 
 */
import MUtil from 'utils/mm.jsx';


const _mm = new MUtil();

class Statistic {

  // 首页统计数据获取
  getHomeCount() {
    return _mm.request({
      url: '/manage/statistic/base_count.do',
    })
  }
}

export default Statistic;