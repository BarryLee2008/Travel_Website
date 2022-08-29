//import { type } from "@testing-library/user-event/dist/type";
import React from "react";
// 这是一个interface,用来规范Router标签给component传递的参数
//import {RouteComponentProps} from 'react-router-dom'

// route6中通过usePara来获取param参数
import { useParams } from 'react-router-dom'
// 如果有多个参数的时候，定义一个interface规范useParams的泛型，以进一步来规范params对象的属性名，以及属性值类型
// 这里要特别注意，只能用type来规范matchParams.因为useParams的泛型指定的是string类型。而interface只能是规范对象。如果一定要用interface.得加上keyof来转换
type matchParams = {
    touristRouteId:string,
   /*  others:string */
}
export const Detail:React.FC = () =>{
    // params是一个对象，以键值对形式包含url中的参数值。但是这里的useParas()泛型没有定义，所以说params中的键值对可以是任意形式，不安全
    const params = useParams<matchParams>()
    return (
        // props一定要写道具体的值位置
        // 把鼠标放在params上可以看到match<{}>.params = {}。这句话的意思是params是空对象，没有定义任何的属性。所以说要用interface自定义
        <h1>旅游路线详情,该页面的ID是:{params.touristRouteId}</h1>
    )
}