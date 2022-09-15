import React from 'react';
import styles from './App.module.css';
import { Home, Login, Signup, Detail, SearchProduct } from './pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        {/* Route现在必须依附在Routes之下。Routes的功能也比Switch更加强大 */}
        <Routes>
          <Route path='/' element={<Home />} />
          {/* element中也可以直接使用jsx代码 */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/detail/:touristRouteId' element={<Detail />} />
          {/* 如果参数为空时候得情况 */}
          <Route path='/search/' element={<SearchProduct />} />
          <Route path='/search/:keyword' element={<SearchProduct />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
