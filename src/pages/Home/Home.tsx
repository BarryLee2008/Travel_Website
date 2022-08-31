import React from "react";
import styles from './Home.module.css';
import { Row, Col, Typography } from 'antd';
import { productList1, productList2, productList3 } from "./mockup";
// 引入Footer和Header组件.这里{}中的名字要和声明的函数组件名一样
// 这个地方是将components变成一个模块
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from "../../components"
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
// 引入i18n的高阶函数，给home组件注入contex对象
import { withTranslation, WithTranslation } from 'react-i18next'

/* 这里用类组件 */
 class HomeComponent extends React.Component<WithTranslation> { // 高阶函数中会给组件传入新的参数，所以说要保证类型一致
    render() {
        // 声明t函数。它的作用是获得resource中的字符串，传入的参数是字符串对应的json路径
        const t = this.props.t
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
                        product={productList1}
                    />
                    {/* 新品上市 */}
                    <ProductCollection
                        title={<Typography.Title level={3} type={'warning'}>{t('home_page.new_arrival')}</Typography.Title>}
                        sideImage={sideImage2}
                        product={productList2}
                    />
                    {/* 国内旅游 */}
                    <ProductCollection
                        title={<Typography.Title level={3} type={'success'}>{t('home_page.domestic_travel')}</Typography.Title>}
                        sideImage={sideImage3}
                        product={productList3}
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