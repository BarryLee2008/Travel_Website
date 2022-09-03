import React from "react";
import styles from './Home.module.css';
import { Row, Col, Typography,Spin } from 'antd';
// import { productList1, productList2, productList3 } from "./mockup";
// 引入Footer和Header组件.这里{}中的名字要和声明的函数组件名一样
// 这个地方是将components变成一个模块
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from "../../components"
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
// 引入i18n的高阶函数，给home组件注入contex对象
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from "axios";
interface stateType {
    productList: any[];
    error: string | null;
    loading: boolean
}
/* 这里用类组件 */
class HomeComponent extends React.Component<WithTranslation, stateType> { // 高阶函数中会给组件传入新的参数，所以说要保证类型一致
    // 构造函数初始化state
    constructor(props: WithTranslation) {
        super(props);
        this.state = {
            productList: [],
            error: null,
            loading:true
        };
    }
    // 
    componentDidMount() {
        const p1 = axios.get('http://123.56.149.216:8080/api/productCollections', { headers: { 'x-icode': 'EEA0422B23AE75CA' } })
        p1.then((data) => { this.setState({ productList: data.data,loading:false })  })
        .catch((error)=>{
            this.setState({error:error.message})
        })
    }

    render() {
        // 声明t函数。它的作用是获得resource中的字符串，传入的参数是字符串对应的json路径
        const t = this.props.t
        // componentDidMount是在组件加载后才调用，一开始state并没有数据，所以说需要处理悬空数据
        // 展开运算符直接获得对象的值
        const {productList,error,loading} = this.state
        if(loading === true) {
            return (
                <Spin
                size="large"
                style={{ marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",}}
                />
            )
         
        }
        if(error) {
            return (
                <div>
                    网站出错：{error}
                </div>
            )
        }

        return (
            <>
                <Header />
                {/* content 区域 */}
                <div className={styles["content-container"]}>
                    {/* 使用antd 栅格化布局 */}
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6} >
                            {/* 垂直导航栏 */}
                            <SideMenu />
                        </Col>
                        <Col span={18} >
                            {/* 广告轮播 */}
                            <Carousel />
                        </Col>
                    </Row>
                    {/* 爆款推荐 */}
                    <ProductCollection
                        title={<Typography.Title level={3} type={'danger'}>{t('home_page.hot_recommended')}</Typography.Title>}
                        sideImage={sideImage}
                        product={ productList[0].touristRoutes}
                    />
                    {/* 新品上市 */}
                    <ProductCollection
                        title={<Typography.Title level={3} type={'warning'}>{t('home_page.new_arrival')}</Typography.Title>}
                        sideImage={sideImage2}
                        product={productList[1].touristRoutes}
                    />
                    {/* 国内旅游 */}
                    <ProductCollection
                        title={<Typography.Title level={3} type={'success'}>{t('home_page.domestic_travel')}</Typography.Title>}
                        sideImage={sideImage3}
                        product={productList[2].touristRoutes}
                    />
                    {/* 合作伙伴 */}
                    <BusinessPartners />
                </div>
                <Footer />
            </>
        )
    }
}
export const Home = withTranslation()(HomeComponent)