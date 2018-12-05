/** 
 * 页面框架，包含顶部栏 + 侧边栏 + 路由选择的内容组件
 */
import React from 'react';

import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';

import './theme.css';
import './index.scss';

class Layout extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <TopNav></TopNav>
        <SideNav></SideNav>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;