import React, { PropsWithChildren, useEffect } from 'react';
import styles from './App.module.css';
import { Home, Login, Signup, Detail, SearchProduct, ShoppingCart, Payemnt } from './pages'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from './redux/hooks'
import { getshoppingCartAsyncThunk } from './redux/shoppingCart/ShoppingCartSlice'
// 下面这种写法是私有路由，即将要访问的路由定向到一个父级组件。在组件中判断是否能访问子组件。成功就访问子组件，失败就定向到别处
const PrivateRoute: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const jwt = useSelector((state) => (state.userLogin.token))
  // children 外层一定要包裹一层div.因为万一父组件没有包裹任何子组件的话就会造成没有return的情况
  return jwt ? <div>{children}</div> : <Navigate to='/login' />
}

function App() {
  // 在初始话整个页面的时候就获得token的数据
  const jwt = useSelector((state) => (state.userLogin.token))
  // 然后向store中发送获取购物车数据的thunk action
  const dispatch = useDispatch()
  useEffect(() => {
    // 只要JWT存在的时候，或者说登录的情况下，才发送thunk action
    if (jwt) {
      dispatch(getshoppingCartAsyncThunk(jwt))
    }
  }, [jwt])
  // 上面代码的意思是在最外层的App组件中就改变了redux中购物车的数据，在子组件中获得购物车数据的时候就是调用后台后的数据
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
          {/* 私有路由，满足一定条件才能访问 */}
          <Route path='/shoppingCart' element={
            <PrivateRoute>
              <ShoppingCart />
            </PrivateRoute>
          } />
          <Route path='/payment' element={<PrivateRoute>
            <Payemnt />
          </PrivateRoute>} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
