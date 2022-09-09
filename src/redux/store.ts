import { createStore, combineReducers, applyMiddleware } from 'redux'
import { recommendReducer } from './reducerRecommend/recommendReducer'
import LanguageReducer from './reducerLanguage/LanguageReducer'
import thunk from 'redux-thunk' // 引入thunk
import { addLogInfo } from './middlewares/addLogInfo'
// 引入createStore方法用来创建一个store。一个store中有多个数据（state）。
// 一个reducer用来初始化这个store中的state数据，并且可以用来接收action指令来修改这个state中的数据
// 一个store要有一个root reducer
// rootReducer用combineReducers函数来合并不同的reducer
const rootReducer = combineReducers({
    language: LanguageReducer,
    recommend: recommendReducer
})
// 导出当前store中state的类型
// ReturnType<>的意思是获得<>中函数返回值的类型，也就是store.getState函数返回值。而<>中的值必须是函数类型所以说是typeof
export type RootState = ReturnType<typeof store.getState>
const store = createStore(rootReducer, applyMiddleware(thunk,addLogInfo)) //在这里一定要传入reducer,用applyMiddleware来创建中间件thunk
// thunk是redux中的一种中间件专门用来处理异步操作，从而把异步操作从组件中剥离出来，写入redux中。
export default store 