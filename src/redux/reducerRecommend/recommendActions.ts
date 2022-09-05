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