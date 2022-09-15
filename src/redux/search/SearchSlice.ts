import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
// 规范初始值
interface searchPropsType {
    loading: boolean,
    productList: any,
    error: string | null,
    pagination: any
}
// 初始化值
const initialState: searchPropsType = {
    loading: true,
    productList: null,
    error: null,
    pagination: null

}
// 初始化thunk
export const searchProductThunk = createAsyncThunk('searchProduct/searchProductThunk', async (paramaters: { // 传入多个参数的时候是对象形式
    currentPage: number | string,
    pageSize: number | string,
    keyword: string | null
}, thunkAPI) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pagenumber=${paramaters.currentPage}&pagesize=${paramaters.pageSize}`
    if (paramaters.keyword) {
        url = url + `&keyword=${paramaters.keyword}`
    }
    // 获得返回值
    try {
        const response = await axios.get(url)
        // 这里是返回成功后promise对象中的data,或者data中的某个属性。
        // 但是如果出错的话，有可能错误信息会被当作rejected action的payload,或者payload为undefined。错误信息在action.error中。这个时候要小心判断
        // 当要返回多个值的时候用对象,payload就会变成一个对象
        return {
            data:response.data,
            // header中的数据是字符串，所有用JSON.parse转换下
            // 获取当前页面是第几页，每页多少条数据，再传入组件ProductList中形成分页
            pagination:JSON.parse(response.headers['x-pagination'])
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
   
})
// 创建searchSlice
export const searchSlice = createSlice({
    name: 'searchProduct',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchProductThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(searchProductThunk.fulfilled,(state,action)=>{
            
            state.loading = false
            state.pagination = action.payload?.pagination
            state.productList = action.payload?.data
            state.error = null
        })
        builder.addCase(searchProductThunk.rejected,(state,action)=>{
            // 当分发rejected action的时候，要先判断错误信息是否在payload中
            if(action.payload instanceof Error) {
                state.error = action.payload.message
                state.loading = false
                console.log('是我执行了')
            } else if(typeof action.error.message === 'string') { // 如果不在证明错误信息在action.error中
                state.loading = false
                state.error = action.error.message
            }
        })

     }
})