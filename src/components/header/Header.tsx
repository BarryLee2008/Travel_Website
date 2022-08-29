import React from "react";
import logo from '../../assets/logo.svg'
import { Layout, Typography, Menu, Dropdown, Button, Input } from 'antd';
// 引入antd-design的标签
// layout 是布局标签用来控制页面的整体布局。其中包括header， sider, content和footer。layout中可以嵌套layout实现多种页面布局
// typography是控制段落（paragraph），标题(title)，字体(text)，链接(link)等
// input 就是输入框

// 引入钩子函数
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { GlobalOutlined } from '@ant-design/icons'; //引入icon模块
import styles from './header.module.css'
export const Header: React.FC = () => {
    const navigate = useNavigate()
    // return 只能返回一个DIV,如果要返回多个需要在最外层包裹一层父级div
    return (
        <div>
            {/* 页面中的topheader，即语言选择的那一个bar */}
            <div className={styles['top-header']}>
                <div className={styles['top-header-container']}>
                    {/* 控制字体的样式，如粗细 */}
                    <Typography.Text style={{ marginRight: 15 }}>旅游让生活更美好</Typography.Text>
                    {/* 下拉按钮菜单 */}
                    {/* Dropdown.Button左边有一个按钮，右边是额外的下拉菜单,并且有一个icon
              属性中overlay对应的是menu组件，表示下拉的类容
              而menu组件中items属性的值是一个数组，数组的元素就是下拉菜单的类容。而具体的元素格式是一个对象，有两个属性key和lable。都是string类型
              属性icon表示图标，通过引入@ant-design/icons的方式来引入图标。所有图标都是组件
          */}
                    <Dropdown.Button overlay={
                        <Menu items={[{ key: '1', label: '中文' }, { key: '2', label: 'English' }]}
                        />
                    }
                        icon={<GlobalOutlined />}
                    >
                        语言
                    </Dropdown.Button >
                    <Button.Group className={styles["button-group"]}>
                        <Button onClick={() => { navigate('/signup') }}>注册</Button>
                        <Button onClick={() => { navigate('/login') }}>登录</Button>
                    </Button.Group>
                </div>
            </div>
            <div className={styles['app-header']}>
                {/* 表示布局layout中的header标签 */}
                <Layout.Header className={styles['main-header']}>
                    <span onClick={()=>{navigate('/')}}>
                        <img src={logo} alt="logo" className={styles['App-logo']} />
                        <Typography.Title className={styles.title}>旅游网</Typography.Title>
                    </span>
                    <Input.Search className={styles['search-input']} placeholder={'请输入目的地、主题或关键字'} />
                </Layout.Header>
                {/* menu标签用来设置垂直或者水平的导航栏，mode用来控制方向。items是导航的类容 */}
                <Menu className={styles['main-menu']} mode='horizontal' items={
                    [{ key: "1", label: "旅游首页" },
                    { key: "2", label: "周末游" },
                    { key: "3", label: "跟团游" },
                    { key: "4", label: "自由行" },
                    { key: "5", label: "私家团" },
                    { key: "6", label: "邮轮" },
                    { key: "7", label: "酒店+景点" },
                    { key: "8", label: "当地玩乐" },
                    { key: "9", label: "主题游" },
                    { key: "10", label: "定制游" },
                    { key: "11", label: "游学" },
                    { key: "12", label: "签证" },
                    { key: "13", label: "企业游" },
                    { key: "14", label: "高端游" },
                    { key: "15", label: "爱玩户外" },
                    { key: "16", label: "保险" }]
                }>
                </Menu>
            </div>
        </div>
    )
}