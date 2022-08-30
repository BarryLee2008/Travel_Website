import {createStore} from 'redux'
import LanguageReducer from './LanguageReducer'
// 引入createStore方法用来创建一个store。一个store中有多个数据（state）。
// 一个reducer用来初始化这个store中的某一个state数据，并且可以用来接收action指令来修改这个state中的数据
const store = createStore(LanguageReducer) //在这里一定要传入reducer
export default store 