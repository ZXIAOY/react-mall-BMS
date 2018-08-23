import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom';

import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} /> {/* exact表示严格匹配 */}
            <Route path='/product' component={Home} /> 
            <Route path='/product-category' component={Home} /> 
          </Switch>
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);