import axios from "axios"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
// 定义recommend reducer中action的type类型
export const fetch_productList_start = 'start fetching recommend product'
export const fetch_data_succeeded = 'get data successfully'
export const fetch_data_failed = 'failed to get data'

// 定义action的类型

interface startType { //开始action不需要payload
    type: typeof fetch_productList_start
}
interface successType { // 成功后调用的action要修改store中的productlist,所有要传入paylaod，而且不知道类型所以是any
    type: typeof fetch_data_succeeded,
    payload: any
}
interface failedType {
    type: typeof fetch_data_failed,
    payload: any
}
// 导出action类型定义
export type actionType = startType | successType | failedType
// 定义action的构造函数

export const fetchProductListStartActionCreator = (): startType => {
    return {
        type: fetch_productList_start
    }
}

export const fetchDataSucceededActionCreator = (data): successType => {
    return {
        type: fetch_data_succeeded,
        payload: data
    }
}

export const fetchDataFailedActionCreator = (error): failedType => {
    return {
        type: fetch_data_failed,
        payload: error
    }
}
// 创建thunk的构造函数。
// thunk本质上是一种action,只不过它不是对象而是函数。它有两个参数dispatch和getState。它的功能是在函数体内部实行一系列异步的操作，包括分发其他action.从而使得组件中没有复杂的逻辑操作
// thunk action的构造函数的类型是thunk。它有四个泛型returnType:表示返回的thunk函数的类型.
// state表示当前使用的state
// extraThunkArg表示额外的参数
// basicAction表示会使用到的action的类型
// 所以说下面这个thunk构造函数会返回一个thunk函数
export const giveMeDataThunkActionCreator = (): ThunkAction<void, RootState, unknown, actionType> => async (dispatch, getState) => {
    // 首先分发 fetchProductListStartAction
    dispatch(fetchProductListStartActionCreator())
    try {
        const data = await axios.get('http://123.56.149.216:8080/api/productCollections')
        // 如果成功返回了数据则直接分发 fetchDataSucceededAction
        dispatch(fetchDataSucceededActionCreator(data.data))
    }
    catch (error) {
        // 如果失败分发 fetchDataFailedAction
        dispatch(fetchDataFailedActionCreator(error instanceof Error ? error.message : 'failed to fetch data from api'))
    }
}