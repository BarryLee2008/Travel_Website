//import { type } from "@testing-library/user-event/dist/type";
import React from "react";
// 这是一个interface,用来规范Router标签给component传递的参数
// route6中通过usePara来获取param参数
import { useParams } from 'react-router-dom'
// 如果有多个参数的时候，定义一个interface规范useParams的泛型，以进一步来规范params对象的属性名，以及属性值类型
// 这里要特别注意，只能用type来规范matchParams.因为useParams的泛型指定的是string类型。而interface只能是规范对象。如果一定要用interface.得加上keyof来转换
// 引入 axios
import axios from "axios"
// 引入钩子函数 useState,useEffect
import { useState, useEffect } from 'react'
// 引入ant design插件
import { Row, Spin, Col, DatePicker, Divider, Typography, Anchor, Menu } from "antd";
// 引入header和footer组件
import { Header, Footer, ProductIntro, Comments } from '../../components'
// 引入css模块
import styles from './Detail.module.css'
// 引入假数据
import { commentMockData } from './mockData'
// 引入slice
import { productDetailSlice, getDataByFetching } from '../../redux/productDetail/productDetailSlice'
// 引入自定义useSelector和useDispatch
import { useSelector,useDispatch } from '../../redux/hooks'
// 引入dispatch
// import { useDispatch as AppDispatch } from 'react-redux'
// type规范传入的字符串，传入多个参数的话（localhost:3000/detail/param1/param2）就在下面写其他的变量名
type matchParams = {
    touristRouteId: string,
    /*  others:string */
}
export const Detail: React.FC = () => {
    // params是一个对象，以键值对形式包含url中的参数值。但是这里的useParas()泛型没有定义，所以说params中的键值对可以是任意形式，不安全
    const { touristRouteId } = useParams<matchParams>()
    // 所有redux来管理数据，不再在组件内部声明属性
    /*  // 声明loading状态值
    const [loading, setLoading] = useState<boolean>(true)
    // 声明错误状态
    const [error, setError] = useState<string | null>(null)
    // 声明产品
    const [product, setProduct] = useState<any>(null) */
    // 用useSelector来获得state
    const loading = useSelector((state) => { return state.productDetail.loading })
    const product = useSelector((state) => { return state.productDetail.productDetail })
    const error = useSelector((state) => { return state.productDetail.error })
    // 获得dispatch函数
    const dispatch = useDispatch()
    // 获得日期选择组件
    const { RangePicker } = DatePicker;
    const { Link } = Anchor
    // 设置useEffect来处理异步调用API
    // useEffect第一个参数是回调函数，第二个参数是[数据]，表示监控的数据。只要数据变化就会第一个回调函数就会被调用。下面[]表示空表示只会mount的是执行一次
    useEffect(() => {

       /*  const fetchindividualProductData = async () => {
            // 开始获取数据，分发获取数据的action
            dispatch(productDetailSlice.actions.fetchStart())
            try {
                // setLoading(true)
                const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
                // 获取数据成功后分发修改数据action
                dispatch(productDetailSlice.actions.fetchSucceeded(data))
               // dispatch(productDetailSlice.actions.fetchTest(false,data))
                // setLoading(false)
               // console.log(data) 
            }
            catch (error) {
                if (error instanceof Error) {
                    // 如果失败分发失败的action
                    dispatch(productDetailSlice.actions.fetchFailed(error.message))
                    // setError(error.message)
                }
            }
        } */
        //fetchindividualProductData()
        if(touristRouteId) {
            dispatch(getDataByFetching(touristRouteId))
        }
       
    }, [touristRouteId])//这里一定要设置监听对象。因为useEffect在每次组件渲染（render）后都要执行，如果是useEffect内部有setXXX（）的话每次执行完setXXX的话就要重新渲染组件。从而再次触发useEffect
    // 在加载的时候
    if (loading) {
        return (
            <Spin
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%"
                }}
            />
        )

    }
    // 后台出错的时候
    if (error) {
        return (<div>
            后台出错了：{error}
        </div>)
    }
    return (
        // props一定要写道具体的值位置
        // 把鼠标放在params上可以看到match<{}>.params = {}。这句话的意思是params是空对象，没有定义任何的属性。所以说要用interface自定义
        // <h1>旅游路线详情,该页面的ID是:{touristRouteId}</h1>
        <>
            <Header />
            {/* 详情页面类容 */}
            <div className={styles["page-content"]}>
                {/* 产品选择与日期 */}
                <div className={styles["product-intro-container"]}>
                    <Row>
                        {/* 左侧详情 */}
                        <Col span={13}>
                            <ProductIntro
                                title={product.title}
                                shortDescription={product.description}
                                price={product.originalPrice}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.price}
                                rating={product.rating}
                                pictures={product.touristRoutePictures.map((p) => p.url)}
                            />
                        </Col>
                        {/* 右侧日期选择 */}
                        <Col span={11}>
                            {/* open 表示日日历打开 */}
                            <RangePicker style={{ marginTop: 20 }} />
                        </Col>
                    </Row>
                </div>
                {/* 锚点 */}
                <Anchor className={styles["product-detail-anchor"]}>
                    <Link href="#features" title="产品特色" />
                    <Link href="#fees" title="费用" />
                    <Link href="#notice" title="游客须知" />
                    <Link href="#comments" title="评价" />
                </Anchor>
                {/* 产品特色 */}
                <div id="features" className={styles["product-detail-container"]}>
                    <Divider orientation="center">
                        <Typography.Title level={3}>产品特色</Typography.Title>
                        {/* 后端直接返回的HTML代码，但是为了防止XML攻击，不能直接渲染
                            要通过React中的API的方式来渲染。
                        */}

                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}>

                    </div>
                </div>
                {/* 产品费用 */}
                <div id="fees" className={styles["product-detail-container"]}>
                    <Divider orientation="center">
                        <Typography.Title level={3}>费用</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}>

                    </div>
                </div>
                {/* 产品须知 */}
                <div id="notice" className={styles["product-detail-container"]}>
                    <Divider orientation="center">
                        <Typography.Title level={3}>游客须知</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}>

                    </div>
                </div>
                {/* 评价 */}
                <div id="comments" className={styles["product-detail-container"]}>
                    <Divider orientation="center">
                        <Typography.Title level={3}>评论</Typography.Title>
                    </Divider>
                    <div style={{ margin: 40 }}>
                        {/* 自定义组件，定义了props就不能在组件上写props为定义的参数，比如style。要加style就要在外包裹一层 */}
                        <Comments data={commentMockData} />
                    </div>

                </div>
            </div>
            <Footer />

        </>
    )
}