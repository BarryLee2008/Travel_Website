import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface initialStateUserType {
    loading: boolean,
    error: any,
    itemsInShoppingCart: any[]
}
const initialStateShoppingCart: initialStateUserType = {
    loading: true,
    error: null,
    itemsInShoppingCart: []
}
// 获取购物车信息的thunk
export const getshoppingCartAsyncThunk = createAsyncThunk('shoppingCart/getshoppingCartAsyncThunk', async (jwt: string, thunkAPI) => {
    try {
        const response = await axios.get('http://123.56.149.216:8080/api/shoppingCart', {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        })
        console.log(response)
        return response.data.shoppingCartItems
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

})
// 添加商品信息的thunk
export const addshoppingCartAsyncThunk = createAsyncThunk('shoppingCart/addshoppingCartAsyncThunk', async (params: { touristRouteId: string, jwt: string }, thunkAPI) => {
    try {
        const response = await axios.post('http://123.56.149.216:8080/api/shoppingCart/items', {
            touristRouteId: params.touristRouteId
        }, {
            headers: {
                Authorization: `bearer ${params.jwt}`
            }
        })
        return response.data.shoppingCartItems
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
// 清空购物车的thunk
export const clearshoppingCartAsyncThunk = createAsyncThunk('shoppingCart/clearshoppingCartAsyncThunk', async (params: { jwt: string, itemIds: number[] }, thunkAPI) => {
    try {
       const response = await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${params.itemIds.join(',')})`, {
            headers: {
                Authorization: `bearer ${params.jwt}`
            }
        })
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
// 结算的thunk
export const checkOutshoppingCartAsyncThunk = createAsyncThunk('shoppingCart/checkOutshoppingCartAsyncThunk', async (jwt: string, thunkAPI) => {
    try {
        const response = await axios.post('http://123.56.149.216:8080/api/shoppingCart/checkout', null, {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        })
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }


})
export const ShoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: initialStateShoppingCart,
    reducers: {},
    extraReducers: (builder) => {
        // 获得购物车的信息
        builder.addCase(getshoppingCartAsyncThunk.pending, (state) => { state.loading = true })
        builder.addCase(getshoppingCartAsyncThunk.fulfilled, (state, action) => { state.loading = false; state.itemsInShoppingCart = action.payload; state.error = null })
        builder.addCase(getshoppingCartAsyncThunk.rejected, (state, action) => { state.error = action.payload })
        // 添加商品进入购物车
        builder.addCase(addshoppingCartAsyncThunk.pending, (state) => { state.loading = true })
        builder.addCase(addshoppingCartAsyncThunk.fulfilled, (state, action) => { state.loading = false; state.itemsInShoppingCart = action.payload })
        builder.addCase(addshoppingCartAsyncThunk.rejected, (state, action) => { state.error = action.payload })
        // 清空购物车
        builder.addCase(clearshoppingCartAsyncThunk.pending, (state) => { state.loading = true })
        builder.addCase(clearshoppingCartAsyncThunk.fulfilled, (state) => { state.loading = false; state.itemsInShoppingCart = [] })
        builder.addCase(clearshoppingCartAsyncThunk.rejected, (state, action) => { state.error = action.payload; state.loading = false })
        // 结算购物车
        builder.addCase(checkOutshoppingCartAsyncThunk.pending, (state) => { state.loading = true })
        builder.addCase(checkOutshoppingCartAsyncThunk.fulfilled, (state, action) => { state.error = null; state.loading = false; state.itemsInShoppingCart = [] })
        builder.addCase(checkOutshoppingCartAsyncThunk.rejected,(state,action)=>{state.error = action.payload; state.loading = false; state.itemsInShoppingCart = []})

    }
})