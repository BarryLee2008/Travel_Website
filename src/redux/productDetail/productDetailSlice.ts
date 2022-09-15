import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// createSlice是一种集成API，它集成了createReducer和createAction
// createSlice参数是一个对象，这个对象包括这个reducer的名字，初始值，以及处理每个action的对应的reducer
// 设立interface规范初始值
interface initialStateType {
    loading: boolean,
    productDetail: any,
    error: string | null
}
// 设定初始值
const initialState: initialStateType = {
    loading: true,
    productDetail: null,
    error: null
}
// thunk是RTK中的一个默认中间件用来处理异步操作，从而把异步操作从组件中剥离出来。同时它也是一种action,要使用它必须用dispatch()派发
// createAsyncThun函数是用来生成thunk的action构造函数（creator）.它拥有两个参数，一个是action type，它一般由slice的名字和thunk的名字构成
// 第二个参数是一个async函数，这个函数返回一个异步操作的返回数据。这个数据可以是resolve即成功后的数据，也可以是reject即失败后的数据。
export const getDataByFetching = createAsyncThunk('ProductDetail/FetchData', async (id: string, thunkAPI) => {
    const response = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${id}`)
    return response.data
})
export const productDetailSlice = createSlice({
    name: 'ProductDetail',
    initialState: initialState,
    // 这里的reducer是个对象，它每个key-value对对应一个处理某个action的reducer
    // 这里的key不仅是对应reducer的名字，而且还是对应的action creator函数的函数名。key会被传入createAction(name/key)函数生action creator函数
    // 换句话说key对应的reducer就是处理以key命名的action creator函数所生成的action。进一步来说就省略了switch语句来匹配action.type的过程
    reducers: {
        fetchStart: (state) => { state.loading = true }, // 这里通过immer来使得用户表面上可以直接改变state. 但实际上immer是在底层生成了新的state,并没有违反immutable的原则。
        fetchSucceeded: (state, action) => {
            // 这里的action 是以fetchSucceeded为名的action creactor函数创造的
            state.loading = false
            state.productDetail = action.payload
        },
        // payloadAction可以规范action中的payload的类型
        fetchFailed: (state, action: PayloadAction<string | null>) => { state.error = action.payload },
        // 如果是要对某个action传入的payload有要求，或者需要传入多个payload的时候写法如下
        fetchTest: {
            // prepare中传入的payload要和reducer中的action的payload的类型一致。
            reducer: (state, action: PayloadAction<boolean & any>) => { console.log(action.payload) },
            prepare: (loading: boolean, productDetail: any) => {
                return { payload: { loading, productDetail } }
            }
        }
    },
    // createAsyncThunk构造thunk action的构造函数并不是reducer中的action中的构造函数，换句话说thunk action并不是由reducer中的构造函数生成的，所以说由extraReducers中的reducer来处理
    extraReducers: (builder) => {
        // builder是createRuder中的方法，每个builder.addcase（）方法就是处理一种action.所以说它由两个参数一个是action 构造函数，另一个是用来处理这个构造函数生成的action的reducer
        // pending,fulfilled,rejected都是getDataByFetching这个thunk action构造函数的子构造函数。它们分别可以构造三种action: pending,fulfilled,rejected
        // 具体来说，当一个thunk action在组件中被dispacth的时候，比如dispatch(getDataByFetching)。thunk 构造函数createAsyncThunk()中的async函数就会被执行
        // 在async函数被执行的时候pending action也会被派发(dispatch),这个action的type是ProductDetail/FetchData/pending.这个action会在extraReducer中被处理
        // 在async函数执行完成后,获得了一个已经处理的promise对象的返回值resolve(data)，或者是reject(data)。如果成功了，就会派发fulfilled action，这个action的payload就是resolve(data)中的data
        // 如果失败了派发rejected action其中error信息或在payload中或在action.error中。
        builder.addCase(getDataByFetching.pending,(state)=>{state.loading = true})
        builder.addCase(getDataByFetching.fulfilled,(state,action)=>{state.loading = false; state.productDetail = action.payload; state.error = null})
        builder.addCase(getDataByFetching.rejected,(state,action)=>{state.loading = false; if(action.payload instanceof Error){state.error = action.payload.message}})
    }
})
// 每个createSlice函数的返回值是一个对象。这个对象中有两个属性最为重要。一个是reducer，它表示的是掌管这些数据的reducer函数，相当于普通的reducer函数。可用于被combineRecuder()函数合并
// 第二个重要的属性是action.它表示每个reducer对象中处理action函数所对应的action构造函数。比如上例中action中有三个action构造函数。分别是fetchStart()用来生成的action会被fetchStart对应的函数所处理。其余两个以此类推
