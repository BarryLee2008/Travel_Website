import React from "react";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

// 规范初始值
interface initialStateUserType {
    loading: boolean,
    error: string | null
    token: string | null
}
// 声明初始值
const initialStateUser: initialStateUserType = {
    loading: false,
    error: null,
    token: null
}
// 声明thunk
export const userSliceAsyncThunk = createAsyncThunk('userSlice/userSliceAsyncThunk', async (paramaters: { email: string, password: string },thunkAPI) => {
    try {
        const response = await axios.post('http://123.56.149.216:8080/auth/login', { email: paramaters.email, password: paramaters.password })
        console.log('我成功了')
        return response.data.token
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

})
// 声明slice
export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialStateUser,
    reducers: {
        logOut: (state) => {
            state.error = null
            state.loading = false
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userSliceAsyncThunk.pending,(state)=>{state.loading = true})
        builder.addCase(userSliceAsyncThunk.fulfilled,(state,action)=>{state.loading =false; state.token = action.payload})
        builder.addCase(userSliceAsyncThunk.rejected, (state,action)=>{ 
            state.loading = false; 
            if(action.payload instanceof Error) {
                state.error = action.payload.message
                state.loading = false
            } else if(typeof action.error.message === 'string') { // 如果不在证明错误信息在action.error中
                state.loading = false
                state.error = action.error.message
            }
        
        })
    }
})