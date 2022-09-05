import { actionType, fetch_productList_start, fetch_data_succeeded, fetch_data_failed } from './recommendActions'
// 创建该reducer掌管数据的接口
interface recommendState {
    productList: any[],
    error: string | null,
    loading: boolean
}
const defaultState: recommendState = {
    productList: [],
    error: null,
    loading: true
}
export const recommendReducer = (state = defaultState, action: actionType) => {
    switch (action.type) {
        // 如果分发start action则直接修改loading的值为true表示开始加载
        case fetch_productList_start: return { ...state, loading: true }
        // 如果分发succeed action则直接修改productList的值，然后返回渲染api返回的数据
        case fetch_data_succeeded: return { ...state, productList: action.payload, loading:false }
        // 如果分发failed则修改error，然后返回state
        case fetch_data_failed: return { ...state, error: action.payload }
        // 如果没有分发action返回默认值
        default: return state
    }


}