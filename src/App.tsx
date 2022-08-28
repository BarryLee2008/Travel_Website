import React from 'react';
import styles from './App.module.css';
import { Row, Col, Typography} from 'antd';
import { productList1, productList2, productList3 } from "./mockup";
// 引入Footer和Header组件.这里{}中的名字要和声明的函数组件名一样
// 这个地方是将components变成一个模块
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners } from "./components"
import sideImage from './assets/images/sider_2019_12-09.png';
import sideImage2 from './assets/images/sider_2019_02-04.png';
import sideImage3 from './assets/images/sider_2019_02-04-2.png';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      {/* content 区域 */}
      <div className={styles['content-container']}>
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
          title={<Typography.Title level={3} type={'danger'}>爆款推荐</Typography.Title>}
          sideImage={sideImage}
          product={productList1}
        />
        {/* 新品上市 */}
        <ProductCollection
          title={<Typography.Title level={3} type={'warning'}>新品上市</Typography.Title>}
          sideImage={sideImage2}
          product={productList2}
        />
        {/* 国内旅游 */}
        <ProductCollection
          title={<Typography.Title level={3} type={'success'}>国内游推荐</Typography.Title>}
          sideImage={sideImage3}
          product={productList3}
        />
        <BusinessPartners/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
