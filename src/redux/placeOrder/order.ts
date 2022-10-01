import React from "react";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkOutshoppingCartAsyncThunk } from '../shoppingCart/ShoppingCartSlice'
import axios from "axios";
import { access } from "fs";
interface initialStateType {
    loading: boolean,
    error: any,
    currentOrder: any
}
const initialState: initialStateType = {
    loading: false,
    error: null,
    currentOrder: null
}
// 支付的 thunk
export const payOrdersAsyncThunk = createAsyncThunk('placeOrder/payOrdersAsyncThunk', async (params: { jwt: string, orderId }, thunkAPI) => {
    try {
        const response = await axios.post(`http://123.56.149.216:8080/api/orders/${params.orderId}/placeOrder`, null, {
            headers: {
                Authorization: `bearer ${params.jwt}`
            }
        })
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

})
export const placeOrderSlice = createSlice({
    name: 'placeOder',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(payOrdersAsyncThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(payOrdersAsyncThunk.fulfilled, (state, action) => {
            state.currentOrder = action.payload; 
            state.loading = false;
            state.error = null;
        })
        builder.addCase(payOrdersAsyncThunk.rejected,(state,action)=>{
            state.currentOrder = null;
            state.error = action.payload;
            state.loading = false;
        })
        // extraReducer可以处理其他slice中的thunk action。比如在下例中checkOutshoppingCartAsyncThunk产生的pending,fulfiled,rejected action来自另一个slice
        // 但都可以被下面的addCase方法捕获，并处理。所以说当fulfiled action被成功发送后，order slice中的currentOrder就会被修改，这些相当于跨slice传值
        builder.addCase(checkOutshoppingCartAsyncThunk.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(checkOutshoppingCartAsyncThunk.fulfilled,(state,action)=>{
            state.currentOrder = action.payload
            state.error = null
            state.loading = false
        })
        builder.addCase(checkOutshoppingCartAsyncThunk.rejected,(state,action)=>{
            state.currentOrder = null;
            state.error = action.payload
            state.loading = false
        })
    }
})