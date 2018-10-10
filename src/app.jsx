import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Redirect, Switch,} from 'react-router-dom';

import Layout from 'component/layout/index.jsx';

import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import User from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let layoutRouter = (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} /> {/* exact表示严格匹配 */}
          <Route path='/product' component={Home} /> 
          <Route path='/product-category' component={Home} /> 
          <Route path='/user/index' component={User} />
          <Redirect exact from='/user' to='/user/index' />
          <Route component={ErrorPage} /> 
        </Switch>
      </Layout>
    );

    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' render={(props)=> layoutRouter} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);