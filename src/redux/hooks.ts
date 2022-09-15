import { useSelector as reduxUseSelector, TypedUseSelectorHook, useDispatch as thunkActionDispatch} from 'react-redux'
import { RootState, dispatchType } from './store'
// 定义一个钩子函数，并且把参数的泛型限定为RootState。这样可以直接使用自定义的钩子函数不用再组件内引入state的类别
export const useSelector: TypedUseSelectorHook<RootState>= reduxUseSelector
// useDispatch方法获得的dispatch不能分发RTK中的thunkAction，所以说要把RTK中的dispatch类型赋值给thunkActionDispatch的泛型<>.从而使得useDispatch的返回值变成RTK的类型
export const useDispatch = () => thunkActionDispatch<dispatchType>()
