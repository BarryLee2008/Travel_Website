import {useSelector as reduxUseSelector, TypedUseSelectorHook} from 'react-redux'
import {RootState} from './store'
// 定义一个钩子函数，并且把参数的泛型限定为RootState。这样可以直接使用自定义的钩子函数不用再组件内引入state的类别
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector