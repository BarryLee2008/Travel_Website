import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css'; // 引入antd UI 模块
import './i18n/congigs' // 引入创建的i18n对象。所有的组件都可以通过context获得i18n对象，
// 引入react-redux的provider组件。它的作用是给全部组件注入store
import { Provider } from 'react-redux'
// 引入store
import store from './redux/store'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
