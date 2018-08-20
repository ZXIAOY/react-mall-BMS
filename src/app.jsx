import React from 'react';
import ReactDOM from 'react-dom';
//引入字体文件
// import 'font-awesome/css/font-awesome.min.css';
// import './index.css';
// import './index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>App</h1>
    );
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById('app')
);