// 声明自定义中间件
// 中间件的作用是在dispatch action到达reducer前，所有action能够被依次处理,从而实现某些功能

import { Middleware } from "redux";

// 中间件的固定写法如下：
export const addLogInfo: Middleware = (store) => (next) => (action) => {
    console.log('state before dispatching action:', store.getState())
    console.log('current action:', action)
    next(action)
    console.log('state after dispatching:' , store.getState())

}
// 每个中间件实际上是被连续调用了三次，
