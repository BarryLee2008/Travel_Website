import React from 'react';
import styles from './App.module.css';

// 引入Footer和Header组件.这里{}中的名字要和声明的函数组件名一样
// 这个地方是将components变成一个模块
import {Header,Footer} from "./components" 

function App() {
  return (
    <div className={styles.App}>
    <Header/>
    <Footer/>
    </div>
  );
}

export default App;
