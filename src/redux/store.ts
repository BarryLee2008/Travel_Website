import { createStore, applyMiddleware } from 'redux'
import { recommendReducer } from './reducerRecommend/recommendReducer'
import LanguageReducer from './reducerLanguage/LanguageReducer'
import thunk from 'redux-thunk' // 引入thunk
import { addLogInfo } from './middlewares/addLogInfo'
// 用于redux/toolkit中的combineReducer，它可以合并单独的reducer函数和slice中的reducer属性
import { combineReducers, configureStore } from '@reduxjs/toolkit'
// 引入slice
import { productDetailSlice } from './productDetail/productDetailSlice'
import { searchSlice } from './search/SearchSlice'
import { userSlice } from './user/userSlice'
import { ShoppingCartSlice } from './shoppingCart/ShoppingCartSlice'
import { placeOrderSlice } from './placeOrder/order'
// 引入redux-persist的方法
import { persistStore, persistReducer } from 'redux-persist'
// 引入storage.它表示localStorage
import storage from 'redux-persist/lib/storage'
// 引入createStore方法用来创建一个store。一个store中有多个数据（state）。
// 一个reducer用来初始化这个store中的state数据，并且可以用来接收action指令来修改这个state中的数据
// 一个store要有一个root reducer
// rootReducer用combineReducers函数来合并不同的reducer
const rootReducer = combineReducers({
    language: LanguageReducer,
    recommend: recommendReducer,
    productDetail: productDetailSlice.reducer,
    searchProduct:searchSlice.reducer,
    userLogin: userSlice.reducer,
    ShoppingCart: ShoppingCartSlice.reducer,
    order: placeOrderSlice.reducer
})
// 声明 persist 配置信息
const persistConfig = {
    key:'root',
    // 这里的storage表示用localStorage来实现redux-persist
    storage
    // 这里还可以用Blacklist & Whitelist表示对哪些reducer进行持久化 eg Whitelist['userLogin']. 这里就表示只持续化userLogin这个reducer中的数据
}
// 声明一个persist的reducer
const ReducerForPersist = persistReducer(persistConfig,rootReducer)
// 导出当前store中state的类型
// ReturnType<>的意思是获得<>中函数返回值的类型，也就是store.getState函数返回值。而<>中的值必须是函数类型所以说是typeof
export type RootState = ReturnType<typeof store.getState>
export type dispatchType = typeof store.dispatch
//const store = createStore(rootReducer, applyMiddleware(thunk,addLogInfo)) //在这里一定要传入reducer,用applyMiddleware来创建中间件thunk
// thunk是redux中的一种中间件专门用来处理异步操作，从而把异步操作从组件中剥离出来，写入redux中。
// 使用rtk的configureStore来创建store
const store = configureStore({ //要传入一个对象
    reducer: ReducerForPersist,
    // RTK中会有默认中间件，其通过回调函数的方式获得。但是如果要和自定义中间件结合就要像下面那样写
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(addLogInfo),
    devTools: true
})
// 声明一个persistor,它相当于一个持久化的store。即store在的数据会被转化到persistor中储存，然后通过PersistGate的方式把persistor传递给App组件
const persistor = persistStore(store)
export default {persistor, store}